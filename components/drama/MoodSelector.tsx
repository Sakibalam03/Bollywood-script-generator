'use client';

import { MOODS } from '@/lib/constants/moods';
import { cn } from '@/lib/utils';

interface MoodSelectorProps {
  value: string;
  onChange: (id: string) => void;
  disabled?: boolean;
}

export function MoodSelector({ value, onChange, disabled }: MoodSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-widest text-text-primary/60">
        Cinematic Mood
      </label>
      <div className="grid grid-cols-2 gap-1.5">
        {MOODS.map(mood => (
          <button
            key={mood.id}
            onClick={() => !disabled && onChange(mood.id)}
            disabled={disabled}
            title={mood.description}
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200',
              'border hover:scale-[1.02] hover:border-gold/40',
              value === mood.id
                ? 'bg-gold/15 border-gold/60 text-text-primary'
                : 'bg-bg-elevated border-white/5 text-text-primary/60 hover:text-text-primary/80',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <span className="text-base shrink-0">{mood.emoji}</span>
            <span className="text-xs font-medium truncate">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
