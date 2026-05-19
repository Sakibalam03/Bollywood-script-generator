'use client';

import { useState } from 'react';
import type { Drama, Character, Scene } from '@/lib/schemas';
import { PosterCard } from './PosterCard';
import { CharacterGrid } from './CharacterGrid';
import { ScenePanel } from './ScenePanel';
import { Button } from '@/components/ui/button';
import { Share2, Clock } from 'lucide-react';
import { formatDuration, formatDate } from '@/lib/utils/format';
import { toast } from 'sonner';

interface DramaViewerProps {
  drama: Drama;
  mode?: 'local' | 'shared' | 'live';
  onShare?: () => Promise<void>;
}

export function DramaViewer({ drama, mode = 'local', onShare }: DramaViewerProps) {
  const [currentDrama, setCurrentDrama] = useState<Drama>(drama);
  const readOnly = mode === 'shared';

  const regenerateTitleTagline = async (direction?: string) => {
    try {
      const res = await fetch('/api/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dramaId: currentDrama.id, drama: currentDrama, target: { type: 'title_tagline' }, direction }),
      });
      if (!res.ok) throw new Error('Regeneration failed');
      const data = await res.json();
      setCurrentDrama(d => ({ ...d, title: data.title, tagline: data.tagline }));
      toast.success('New title generated!');
    } catch {
      toast.error('Could not regenerate title');
    }
  };

  const regenerateCharacter = async (characterId: string, direction?: string) => {
    try {
      const res = await fetch('/api/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dramaId: currentDrama.id, drama: currentDrama, target: { type: 'character', characterId }, direction }),
      });
      if (!res.ok) throw new Error('Regeneration failed');
      const { character } = await res.json() as { character: Character };
      setCurrentDrama(d => ({
        ...d,
        characters: d.characters.map(c => c.id === characterId ? { ...character, id: characterId } : c),
      }));
      toast.success('Character rewritten!');
    } catch {
      toast.error('Could not regenerate character');
    }
  };

  const regenerateScene = async (sceneIndex: number, direction?: string) => {
    try {
      const res = await fetch('/api/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dramaId: currentDrama.id, drama: currentDrama, target: { type: 'scene', sceneIndex }, direction }),
      });
      if (!res.ok) throw new Error('Regeneration failed');
      const { scene } = await res.json() as { scene: Scene };
      setCurrentDrama(d => ({
        ...d,
        scenes: d.scenes.map(s => s.index === sceneIndex ? scene : s),
      }));
      toast.success('Scene rewritten!');
    } catch {
      toast.error('Could not regenerate scene');
    }
  };

  return (
    <div className="space-y-8">
      {/* Poster */}
      <PosterCard
        drama={currentDrama}
        onRegenerate={readOnly ? undefined : regenerateTitleTagline}
        readOnly={readOnly}
      />

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-text-primary/30 font-mono">
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDuration(currentDrama.generation_time_ms)}</span>
        <span>{formatDate(currentDrama.created_at)}</span>
        <span className="ml-auto">{currentDrama.model_used}</span>
        {!readOnly && onShare && (
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            className="text-xs border-white/10 text-text-primary/60 hover:text-gold hover:border-gold/30 gap-1"
          >
            <Share2 className="w-3 h-3" /> Share
          </Button>
        )}
      </div>

      {/* Characters */}
      <section className="space-y-3">
        <h2 className="font-display text-lg text-text-primary/60 tracking-widest uppercase">The Cast</h2>
        <CharacterGrid
          characters={currentDrama.characters}
          drama={currentDrama}
          onRegenerateCharacter={readOnly ? undefined : regenerateCharacter}
          readOnly={readOnly}
        />
      </section>

      {/* Scenes */}
      <section className="space-y-4">
        <h2 className="font-display text-lg text-text-primary/60 tracking-widest uppercase">The Script</h2>
        {currentDrama.scenes.map((scene, i) => (
          <ScenePanel
            key={scene.index}
            scene={scene}
            characters={currentDrama.characters}
            drama={currentDrama}
            onRegenerate={readOnly ? undefined : regenerateScene}
            readOnly={readOnly}
            index={i}
          />
        ))}
      </section>
    </div>
  );
}
