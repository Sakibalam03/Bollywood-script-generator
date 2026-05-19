import { ImageResponse } from 'next/og';
import { fetchDrama } from '@/lib/storage/redis';

export const runtime = 'nodejs';
export const alt = 'Bollywood Drama Poster';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;

  let title = 'MASALA MAGIC';
  let tagline = 'Your Bollywood Story Awaits';
  let genre = 'Bollywood Drama';
  let colors: string[] = ['#1a0a00', '#3d1a00', '#D4AF37', '#87CEEB'];

  try {
    const drama = await fetchDrama(shortId);
    if (drama) {
      title = drama.title.toUpperCase();
      tagline = drama.tagline;
      genre = drama.genre;
      colors = drama.poster_concept.color_palette;
    }
  } catch {
    // Use fallback values
  }

  const c1 = colors[0] ?? '#1a0a00';
  const c2 = colors[1] ?? '#3d1a00';
  const c3 = colors[2] ?? '#D4AF37';
  const c4 = colors[3] ?? '#87CEEB';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: `linear-gradient(135deg, ${c1} 0%, ${c2} 40%, ${c3} 70%, ${c4} 100%)`,
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
          }}
        />
        {/* Decorative top strip */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: '#D4AF37' }} />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            padding: '0 80px 60px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: 6,
              textTransform: 'uppercase',
            }}
          >
            {genre}
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: 6,
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#D4AF37',
              fontStyle: 'italic',
            }}
          >
            &ldquo;{tagline}&rdquo;
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: 4,
              marginTop: 8,
            }}
          >
            🎬 MASALA MAGIC
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
