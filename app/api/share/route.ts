import { type NextRequest } from 'next/server';
import { ShareRequestSchema } from '@/lib/schemas/api';
import { DramaSchema } from '@/lib/schemas/drama';
import { storeDrama } from '@/lib/storage/redis';
import { getShareLimiter, getClientIp } from '@/lib/storage/ratelimit';
import { generateShortId } from '@/lib/utils/id';

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = ShareRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const dramaResult = DramaSchema.safeParse(parsed.data.drama);
  if (!dramaResult.success) {
    return Response.json({ error: 'Invalid drama data' }, { status: 400 });
  }

  // Rate limiting
  const ip = getClientIp(request);
  try {
    const limiter = getShareLimiter();
    const { success, reset } = await limiter.limit(ip);
    if (!success) {
      return Response.json(
        { error: 'Rate limit exceeded', resetAt: new Date(reset).toISOString() },
        { status: 429 }
      );
    }
  } catch {
    // Redis unavailable — proceed
  }

  const drama = dramaResult.data;
  const shortId = generateShortId(10);

  try {
    await storeDrama(shortId, { ...drama, shortId });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Storage failed';
    return Response.json({ error: message }, { status: 503 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const url = `${appUrl}/d/${shortId}`;

  return Response.json({ shortId, url });
}
