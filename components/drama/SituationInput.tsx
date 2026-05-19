'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clapperboard } from 'lucide-react';
import { CONFIG } from '@/lib/config';
import { cn } from '@/lib/utils';

interface SituationInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const PLACEHOLDERS = [
  "My neighbour's dog ate my wedding invitations…",
  'I accidentally sent a voice note to my boss instead of my crush…',
  'My internet went out 10 minutes before a big presentation…',
  'I ordered biryani and they delivered pizza to my own birthday party…',
];

// Fixed on server; randomised after hydration to avoid mismatch
const DEFAULT_PLACEHOLDER = PLACEHOLDERS[0];

export function SituationInput({ value, onChange, onSubmit, disabled }: SituationInputProps) {
  const [placeholder, setPlaceholder] = useState(DEFAULT_PLACEHOLDER);

  useEffect(() => {
    setPlaceholder(PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]);
  }, []);

  const charCount = value.length;
  const isValid = charCount >= CONFIG.generation.minSituationLength && charCount <= CONFIG.generation.maxSituationLength;

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-widest text-text-primary/60">
        Your Situation
      </label>
      <div className="relative">
        <Textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={CONFIG.generation.maxSituationLength}
          rows={3}
          className="bg-bg-elevated border-white/10 text-text-primary placeholder:text-text-primary/30 resize-none pr-4 focus-visible:ring-gold/50"
        />
        <span
          className={cn(
            'absolute bottom-2 right-3 text-[10px] tabular-nums',
            charCount > CONFIG.generation.maxSituationLength * 0.9 ? 'text-warning' : 'text-text-primary/30'
          )}
        >
          {charCount}/{CONFIG.generation.maxSituationLength}
        </span>
      </div>
      <Button
        onClick={onSubmit}
        disabled={disabled || !isValid}
        className="w-full bg-crimson hover:bg-crimson/90 text-white font-display tracking-widest gap-2"
        size="lg"
      >
        <Clapperboard className="w-4 h-4" />
        {disabled ? 'LIGHTS, CAMERA…' : 'ACTION! GENERATE'}
      </Button>
    </div>
  );
}
