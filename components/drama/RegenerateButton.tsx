'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RegenerateButtonProps {
  onRegenerate: (direction?: string) => Promise<void>;
  className?: string;
  label?: string;
}

export function RegenerateButton({ onRegenerate, className, label = 'Regenerate' }: RegenerateButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [direction, setDirection] = useState('');

  const handleClick = async () => {
    if (!showInput) {
      setShowInput(true);
      return;
    }
    setLoading(true);
    try {
      await onRegenerate(direction.trim() || undefined);
      setShowInput(false);
      setDirection('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {showInput && (
        <input
          type="text"
          value={direction}
          onChange={e => setDirection(e.target.value)}
          placeholder="Optional: steer the rewrite…"
          className="text-xs bg-bg-elevated border border-white/10 rounded px-2 py-1 text-text-primary placeholder:text-text-primary/30 w-full"
          onKeyDown={e => e.key === 'Enter' && handleClick()}
          autoFocus
        />
      )}
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClick}
          disabled={loading}
          className="text-xs text-text-primary/50 hover:text-gold gap-1"
        >
          <RefreshCw className={cn('w-3 h-3', loading && 'animate-spin')} />
          {loading ? 'Writing…' : label}
        </Button>
        {showInput && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setShowInput(false); setDirection(''); }}
            className="text-xs text-text-primary/30"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
