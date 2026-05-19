import { type NextRequest } from 'next/server';
import { GenerateRequestSchema } from '@/lib/schemas/api';
import { orchestrate } from '@/lib/agents/orchestrator';
import { getGenerateLimiter, getClientIp } from '@/lib/storage/ratelimit';
import type { GenerationEvent } from '@/lib/schemas';

export const runtime = 'nodejs';
export const maxDuration = 300;

function encodeEvent(event: GenerationEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

export async function POST(request: NextRequest) {
  // Input validation
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const parsed = GenerateRequestSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Invalid request', details: parsed.error.flatten() }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Rate limiting
  const ip = getClientIp(request);
  try {
    const limiter = getGenerateLimiter();
    const { success, reset } = await limiter.limit(ip);
    if (!success) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded', resetAt: new Date(reset).toISOString() }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch {
    // Redis unavailable — allow request through
  }

  const { situation, mood } = parsed.data;

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const enqueue = (event: GenerationEvent) => {
        try {
          controller.enqueue(encoder.encode(encodeEvent(event)));
        } catch {
          // Client disconnected
        }
      };

      try {
        for await (const event of orchestrate({ situation, mood }, request.signal)) {
          if (request.signal.aborted) break;
          enqueue(event);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unexpected error';
        enqueue({ type: 'error', message });
      } finally {
        try { controller.close(); } catch { /* already closed */ }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
