const AVATAR_COLORS = [
  '#C0392B', '#8E44AD', '#2980B9', '#27AE60',
  '#D35400', '#16A085', '#2C3E50', '#F39C12',
  '#1ABC9C', '#E74C3C',
];

export function colorFromString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
