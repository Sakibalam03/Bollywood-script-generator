import type { Drama } from '@/lib/schemas';
import { Badge } from '@/components/ui/badge';
import { getMoodById } from '@/lib/constants/moods';

interface PosterCardProps {
  drama: Drama;
  onRegenerate?: (direction?: string) => Promise<void>;
  readOnly?: boolean;
}

export function PosterCard({ drama, onRegenerate, readOnly }: PosterCardProps) {
  const palette = drama.poster_concept.color_palette;
  const c1 = palette[0] ?? '#1a0a00';
  const c2 = palette[1] ?? '#3d1a00';
  const c3 = palette[2] ?? '#D4AF37';
  const c4 = palette[3] ?? '#87CEEB';
  const mood = getMoodById(drama.mood);

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[320px] flex flex-col justify-end"
      style={{ background: `linear-gradient(135deg, ${c1} 0%, ${c2} 40%, ${c3} 70%, ${c4} 100%)` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-6 space-y-3">
        {mood && (
          <Badge variant="outline" className="text-[10px] bg-black/30 backdrop-blur border-white/20 text-white/70">
            {mood.emoji} {mood.label}
          </Badge>
        )}
        <div>
          <h1 className="font-display text-4xl sm:text-5xl text-white tracking-widest leading-none">
            {drama.title.toUpperCase()}
          </h1>
          <p className="font-serif text-white/80 italic text-sm mt-2 leading-relaxed">&ldquo;{drama.tagline}&rdquo;</p>
        </div>
        <p className="text-xs text-white/50 uppercase tracking-widest">{drama.genre}</p>
        <p className="text-xs text-white/30 font-mono italic">{drama.poster_concept.visual_description}</p>
        {!readOnly && onRegenerate && (
          <button
            onClick={() => onRegenerate()}
            className="text-xs text-white/40 hover:text-gold transition-colors mt-1"
          >
            ↻ New title
          </button>
        )}
      </div>
    </div>
  );
}
