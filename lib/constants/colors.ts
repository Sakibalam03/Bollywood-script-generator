export const AVATAR_COLORS = [
  '#C0392B', // crimson red
  '#8E44AD', // purple
  '#2980B9', // blue
  '#27AE60', // green
  '#D35400', // orange
  '#16A085', // teal
  '#2C3E50', // dark blue
  '#F39C12', // amber
  '#1ABC9C', // turquoise
  '#E74C3C', // light red
] as const;

export const ROLE_COLORS: Record<string, string> = {
  protagonist: '#D4AF37',
  antagonist: '#B22234',
  supporting: '#4A90A4',
  comic_relief: '#50C878',
  narrator: '#9B59B6',
};
