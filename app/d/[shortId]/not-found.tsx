import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="text-6xl">🎬</div>
      <h1 className="font-display text-4xl text-text-primary tracking-widest">FILM NOT FOUND</h1>
      <p className="text-text-primary/50 max-w-xs text-sm leading-relaxed">
        This shared drama may have expired (90 days) or the link is invalid.
      </p>
      <Link
        href="/"
        className="bg-crimson text-white font-display tracking-widest px-6 py-3 rounded-lg hover:bg-crimson/90 transition-colors"
      >
        CREATE YOUR OWN MASTERPIECE
      </Link>
    </div>
  );
}
