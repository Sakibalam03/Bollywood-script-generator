'use client';

import { useState } from 'react';
import { SituationInput } from '@/components/drama/SituationInput';
import { MoodSelector } from '@/components/drama/MoodSelector';
import { GenerationOverlay } from '@/components/drama/GenerationOverlay';
import { DramaViewer } from '@/components/drama/DramaViewer';
import { HistorySidebar } from '@/components/drama/HistorySidebar';
import { ShareModal } from '@/components/drama/ShareModal';
import { EmptyState } from '@/components/drama/EmptyState';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { useGeneration } from '@/hooks/useGeneration';
import { useShareDrama } from '@/hooks/useShareDrama';
import { useUIStore } from '@/lib/store/ui.store';
import { MOODS } from '@/lib/constants/moods';

export default function HomePage() {
  const [situation, setSituation] = useState('');
  const [mood, setMood] = useState(MOODS[0].id);
  const { toggleSidebar } = useUIStore();
  const { generate, phase, drama, error, reset } = useGeneration();
  const { share, sharing } = useShareDrama();

  const isGenerating = ['director', 'screenwriters', 'composing'].includes(phase);
  const isDone = phase === 'done';

  const handleGenerate = () => {
    if (situation.trim()) {
      generate({ situation: situation.trim(), mood });
    }
  };

  const handleShare = async () => {
    if (drama) await share(drama);
  };

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg-base/90 backdrop-blur border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <Logo />
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="text-text-primary/50 hover:text-gold gap-1.5"
        >
          <History className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">History</span>
        </Button>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Input Section */}
        <section className="space-y-4">
          <SituationInput
            value={situation}
            onChange={setSituation}
            onSubmit={handleGenerate}
            disabled={isGenerating || sharing}
          />
          <MoodSelector value={mood} onChange={setMood} disabled={isGenerating} />
        </section>

        {/* Error */}
        {phase === 'error' && error && (
          <div className="bg-danger/10 border border-danger/30 rounded-xl p-4 space-y-2">
            <p className="text-sm text-danger">{error}</p>
            <button onClick={reset} className="text-xs text-text-primary/50 hover:text-text-primary underline">
              Try again
            </button>
          </div>
        )}

        {/* Result */}
        {isDone && drama ? (
          <DramaViewer drama={drama} mode="local" onShare={handleShare} />
        ) : (
          !isGenerating && phase === 'idle' && <EmptyState />
        )}

        {/* Live preview during generation */}
        {isGenerating && phase !== 'director' && (
          <div className="text-center py-8 text-text-primary/30 text-sm">
            Building your film…
          </div>
        )}
      </main>

      <GenerationOverlay visible={isGenerating} />
      <HistorySidebar />
      <ShareModal />
    </div>
  );
}
