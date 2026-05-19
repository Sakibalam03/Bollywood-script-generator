'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { getDramaTable } from '@/lib/storage/local';
import type { Drama } from '@/lib/schemas';

export function useDramaHistory(): Drama[] {
  const dramas = useLiveQuery(
    () =>
      getDramaTable()
        .orderBy('created_at')
        .reverse()
        .toArray(),
    []
  );
  return dramas ?? [];
}
