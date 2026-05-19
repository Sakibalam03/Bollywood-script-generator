'use client';

import type { Scene, Character, Drama } from '@/lib/schemas';
import { TropeTag } from './TropeTag';
import { DialogueLine } from './DialogueLine';
import { RegenerateButton } from './RegenerateButton';
import { Badge } from '@/components/ui/badge';
import { Music } from 'lucide-react';

interface ScenePanelProps {
  scene: Scene;
  characters: Character[];
  drama?: Drama;
  onRegenerate?: (sceneIndex: number, direction?: string) => Promise<void>;
  readOnly?: boolean;
  index?: number;
}

function getCharacter(characters: Character[], id: string): Character | undefined {
  return characters.find(c => c.id === id);
}

export function ScenePanel({ scene, characters, onRegenerate, readOnly, index }: ScenePanelProps) {
  const sceneNum = (index ?? scene.index) + 1;

  return (
    <div className="bg-bg-elevated rounded-2xl border border-white/5 overflow-hidden">
      {/* Scene Header */}
      <div className="px-5 py-4 border-b border-white/5 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-gold/60 font-display text-sm tracking-widest">SCENE {sceneNum}</span>
            <Badge variant="outline" className="text-[10px] text-text-primary/40 border-white/10">
              {scene.time_of_day}
            </Badge>
          </div>
          <h3 className="font-display text-xl text-text-primary tracking-wide">{scene.title}</h3>
          <p className="text-xs text-text-primary/50">📍 {scene.location}</p>
        </div>
        {!readOnly && onRegenerate && (
          <RegenerateButton
            onRegenerate={(dir) => onRegenerate(scene.index, dir)}
            label="Rewrite scene"
          />
        )}
      </div>

      {/* Scene Description */}
      <div className="px-5 py-4 border-b border-white/5">
        <p className="font-serif text-text-primary/80 italic leading-relaxed text-sm">{scene.description}</p>
      </div>

      {/* Dialogues */}
      <div className="px-5 py-4 space-y-4 border-b border-white/5">
        {scene.dialogues.map((dialogue, i) => (
          <DialogueLine
            key={i}
            dialogue={dialogue}
            character={getCharacter(characters, dialogue.character_id)}
          />
        ))}
      </div>

      {/* Footer: tropes + music */}
      <div className="px-5 py-3 flex flex-wrap items-center gap-2">
        {scene.tropes.map(trope => (
          <TropeTag key={trope} label={trope} />
        ))}
        {scene.music_cue && (
          <span className="text-xs text-text-primary/40 flex items-center gap-1 ml-auto">
            <Music className="w-3 h-3" />
            {scene.music_cue}
          </span>
        )}
      </div>
    </div>
  );
}
