'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="text-6xl">💥</div>
      <h1 className="font-display text-4xl text-crimson tracking-widest">THE DIRECTOR QUIT</h1>
      <p className="text-text-primary/50 max-w-xs text-sm">{error.message}</p>
      <button
        onClick={reset}
        className="bg-crimson text-white font-display tracking-widest px-6 py-3 rounded-lg hover:bg-crimson/90 transition-colors"
      >
        RESHOOT THE SCENE
      </button>
    </div>
  );
}
