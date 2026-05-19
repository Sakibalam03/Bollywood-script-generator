import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="text-6xl">🎬</div>
      <h1 className="font-display text-4xl text-text-primary tracking-widest">SCENE NOT FOUND</h1>
      <p className="text-text-primary/50 max-w-xs text-sm">The page you were looking for doesn&apos;t exist.</p>
      <Link href="/" className="text-gold text-sm underline">Return to the studio</Link>
    </div>
  );
}
