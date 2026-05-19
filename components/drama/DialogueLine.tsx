import type { Character, Dialogue } from '@/lib/schemas';

interface DialogueLineProps {
  dialogue: Dialogue;
  character?: Character;
}

export function DialogueLine({ dialogue, character }: DialogueLineProps) {
  const color = character?.avatar_color ?? '#D4AF37';

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color }}
        >
          {character?.name ?? dialogue.character_id}
        </span>
      </div>
      <p className="font-serif text-text-primary/90 italic leading-relaxed pl-2 border-l-2"
         style={{ borderColor: color }}>
        &ldquo;{dialogue.line}&rdquo;
      </p>
      {dialogue.delivery && (
        <p className="text-xs text-text-primary/50 pl-2 font-mono">
          ({dialogue.delivery})
        </p>
      )}
    </div>
  );
}
