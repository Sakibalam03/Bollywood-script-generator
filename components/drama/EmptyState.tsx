export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <div className="text-6xl animate-pulse">🎬</div>
      <h2 className="font-display text-3xl text-gold tracking-widest">YOUR STORY AWAITS</h2>
      <p className="text-text-primary/60 max-w-sm text-sm leading-relaxed">
        Enter any ordinary situation above — a parking dispute, a missed deadline,
        a forgotten anniversary — and watch it become a Bollywood blockbuster.
      </p>
    </div>
  );
}
