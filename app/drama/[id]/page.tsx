'use client';

import { use, useEffect, useState } from 'react';
import { getDrama } from '@/lib/storage/local';
import { DramaViewer } from '@/components/drama/DramaViewer';
import { ShareModal } from '@/components/drama/ShareModal';
import { Logo } from '@/components/shared/Logo';
import { useShareDrama } from '@/hooks/useShareDrama';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Drama } from '@/lib/schemas';

export default function LocalDramaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [drama, setDrama] = useState<Drama | null>(null);
  const [loading, setLoading] = useState(true);
  const { share } = useShareDrama();

  useEffect(() => {
    getDrama(id).then(d => {
      setDrama(d ?? null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="text-text-primary/40 font-display text-xl tracking-widest animate-pulse">LOADING…</div>
      </div>
    );
  }

  if (!drama) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center gap-4">
        <div className="text-text-primary/40 text-4xl">🎬</div>
        <p className="text-text-primary/60">Film not found in your history.</p>
        <Link href="/" className="text-gold text-sm underline">Return home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-base">
      <header className="sticky top-0 z-40 bg-bg-base/90 backdrop-blur border-b border-white/5 px-4 py-3 flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-text-primary/40 hover:text-text-primary gap-1">
            <ArrowLeft className="w-4 h-4" /> Home
          </Button>
        </Link>
        <Logo />
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8">
        <DramaViewer drama={drama} mode="local" onShare={() => share(drama)} />
      </main>
      <ShareModal />
    </div>
  );
}
