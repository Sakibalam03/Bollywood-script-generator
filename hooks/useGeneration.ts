'use client';

import { useCallback, useRef } from 'react';
import { useGenerationStore } from '@/lib/store/generation.store';
import { saveDrama } from '@/lib/storage/local';
import type { GenerationEvent, GenerateRequest } from '@/lib/schemas';
import { toast } from 'sonner';

export function useGeneration() {
  const store = useGenerationStore();
  const abortRef = useRef<AbortController | null>(null);

  const generate = useCallback(async (request: GenerateRequest) => {
    // Abort any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    store.reset();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        signal: controller.signal,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Request failed' }));
        store.applyEvent({ type: 'error', message: err.error ?? 'Generation failed' });
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        store.applyEvent({ type: 'error', message: 'No response stream' });
        return;
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data: ')) continue;

          try {
            const event = JSON.parse(trimmed.slice(6)) as GenerationEvent;
            store.applyEvent(event);

            if (event.type === 'drama_complete') {
              try {
                await saveDrama(event.drama);
              } catch {
                toast.error('Could not save to history');
              }
            }
          } catch {
            // Ignore malformed events
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      store.applyEvent({
        type: 'error',
        message: err instanceof Error ? err.message : 'Network error',
      });
    }
  }, [store]);

  const abort = useCallback(() => {
    abortRef.current?.abort();
    store.reset();
  }, [store]);

  return { generate, abort, ...store };
}
