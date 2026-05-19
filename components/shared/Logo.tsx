import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn('font-display text-2xl tracking-widest text-gold', className)}>
      🎬 MASALA MAGIC
    </span>
  );
}
