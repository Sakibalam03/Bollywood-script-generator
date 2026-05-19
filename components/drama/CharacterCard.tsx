import type { Character, Drama } from '@/lib/schemas';
import { Badge } from '@/components/ui/badge';
import { RegenerateButton } from './RegenerateButton';
import { ROLE_COLORS } from '@/lib/constants/colors';

interface CharacterCardProps {
  character: Character;
  drama?: Drama;
  onRegenerate?: (characterId: string, direction?: string) => Promise<void>;
  readOnly?: boolean;
}

const ROLE_LABELS: Record<string, string> = {
  protagonist: 'Hero',
  antagonist: 'Villain',
  supporting: 'Supporting',
  comic_relief: 'Comic Relief',
  narrator: 'Narrator',
};

export function CharacterCard({ character, drama, onRegenerate, readOnly }: CharacterCardProps) {
  const color = character.avatar_color ?? ROLE_COLORS[character.role] ?? '#D4AF37';
  const roleLabel = ROLE_LABELS[character.role] ?? character.role;

  return (
    <div className="bg-bg-elevated rounded-xl p-4 border border-white/5 space-y-2 flex flex-col">
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ backgroundColor: color }}
        >
          {character.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display text-sm tracking-wide text-text-primary">{character.name}</span>
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0"
              style={{ borderColor: color, color }}
            >
              {roleLabel}
            </Badge>
          </div>
          <p className="text-xs text-text-primary/50 italic mt-0.5">{character.archetype}</p>
        </div>
      </div>

      <p className="text-sm text-text-primary/80 leading-relaxed">{character.description}</p>
      <p className="text-xs text-text-primary/50 font-mono leading-relaxed">
        Speaks in: {character.signature_dialogue_style}
      </p>

      {!readOnly && onRegenerate && (
        <div className="pt-1 border-t border-white/5">
          <RegenerateButton
            onRegenerate={(dir) => onRegenerate(character.id, dir)}
            label="New character"
          />
        </div>
      )}
    </div>
  );
}
