import { getTropeByLabel } from '@/lib/constants/tropes';
import { cn } from '@/lib/utils';

interface TropeTagProps {
  label: string;
  className?: string;
}

export function TropeTag({ label, className }: TropeTagProps) {
  const trope = getTropeByLabel(label);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        'bg-gold/10 text-gold border border-gold/20',
        className
      )}
    >
      {trope ? `${trope.emoji} ${trope.label}` : label}
    </span>
  );
}
