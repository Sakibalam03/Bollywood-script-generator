'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGenerationStore } from '@/lib/store/generation.store';
import { Loader2 } from 'lucide-react';

interface GenerationOverlayProps {
  visible: boolean;
}

const PHASE_LABELS: Record<string, string> = {
  director: '🎬 The Director is crafting your story…',
  screenwriters: '✍️ Screenwriters are writing your scenes in parallel…',
  composing: '🎞️ Assembling the final masterpiece…',
};

export function GenerationOverlay({ visible }: GenerationOverlayProps) {
  const { phase, phaseMessage, partialScenes, totalScenes, failedSceneIndices } = useGenerationStore();
  const label = PHASE_LABELS[phase] ?? phaseMessage ?? 'Working…';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
          <div className="max-w-sm w-full mx-4 space-y-6 text-center">
            <Loader2 className="w-10 h-10 text-gold animate-spin mx-auto" />
            <p className="font-display text-2xl text-text-primary tracking-widest">{label}</p>

            {phase === 'screenwriters' && totalScenes > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-text-primary/50">
                  {partialScenes.length} / {totalScenes} scenes written
                </p>
                <div className="flex gap-1.5 justify-center">
                  {Array.from({ length: totalScenes }).map((_, i) => {
                    const done = partialScenes.some(s => s.index === i);
                    const failed = failedSceneIndices.includes(i);
                    return (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{
                          scale: done || failed ? 1 : 0.8,
                          opacity: done || failed ? 1 : 0.3,
                        }}
                        className={`h-2 w-8 rounded-full ${
                          failed ? 'bg-danger' : done ? 'bg-gold' : 'bg-white/20'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            <p className="text-xs text-text-primary/30 font-mono">
              ✦ The Director always suffers for their art ✦
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
