import { notFound } from 'next/navigation';
import { fetchDrama } from '@/lib/storage/redis';
import { DramaViewer } from '@/components/drama/DramaViewer';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;
  try {
    const drama = await fetchDrama(shortId);
    if (!drama) return {};
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    return {
      title: `${drama.title} — Masala Magic`,
      description: drama.tagline,
      openGraph: {
        title: drama.title,
        description: drama.tagline,
        images: [`${appUrl}/d/${shortId}/opengraph-image`],
      },
    };
  } catch {
    return {};
  }
}

export default async function SharedDramaPage({ params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;

  let drama;
  try {
    drama = await fetchDrama(shortId);
  } catch {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center gap-4">
        <p className="text-text-primary/60">Storage temporarily unavailable.</p>
        <Link href="/" className="text-gold text-sm underline">Return home</Link>
      </div>
    );
  }

  if (!drama) notFound();

  return (
    <div className="min-h-screen bg-bg-base">
      <header className="sticky top-0 z-40 bg-bg-base/90 backdrop-blur border-b border-white/5 px-4 py-3 flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-text-primary/40 hover:text-text-primary gap-1">
            <ArrowLeft className="w-4 h-4" /> Create your own
          </Button>
        </Link>
        <Logo />
        <span className="ml-auto text-xs text-text-primary/30 bg-bg-elevated px-2 py-0.5 rounded-full">Read-only</span>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8">
        <DramaViewer drama={drama} mode="shared" />
      </main>
    </div>
  );
}
