'use client';

import { useState, useCallback } from 'react';
import { useUIStore } from '@/lib/store/ui.store';
import type { Drama } from '@/lib/schemas';
import { toast } from 'sonner';
import { saveDrama } from '@/lib/storage/local';

export function useShareDrama() {
  const [sharing, setSharing] = useState(false);
  const openShareModal = useUIStore(s => s.openShareModal);

  const share = useCallback(async (drama: Drama) => {
    setSharing(true);
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drama }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error ?? 'Share failed');
      }

      const { shortId, url } = await response.json();

      // Update local drama with shortId
      try {
        await saveDrama({ ...drama, shortId });
      } catch { /* non-fatal */ }

      openShareModal(url);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not create share link');
    } finally {
      setSharing(false);
    }
  }, [openShareModal]);

  return { share, sharing };
}
