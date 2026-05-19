export interface Trope {
  id: string;
  emoji: string;
  label: string;
}

export const TROPES: Trope[] = [
  { id: 'rain_confrontation', emoji: '🌧️', label: 'Rain confrontation' },
  { id: 'slowmo_reveal', emoji: '🎬', label: 'Slow-motion reveal' },
  { id: 'thunder_punchline', emoji: '⚡', label: 'Thunder strikes on punchline' },
  { id: 'maa_ka_pyaar', emoji: '💞', label: "Maa ka pyaar" },
  { id: 'childhood_flashback', emoji: '🧒', label: 'Childhood flashback' },
  { id: 'item_song', emoji: '💃', label: 'Item song interlude' },
  { id: 'interval_cliffhanger', emoji: '🎞️', label: 'Interval cliffhanger' },
  { id: 'mandir_scene', emoji: '🕉️', label: 'Mandir / temple scene' },
  { id: 'hospital_sprint', emoji: '🏥', label: 'Hospital corridor sprint' },
  { id: 'courtroom_outburst', emoji: '⚖️', label: 'Courtroom outburst' },
  { id: 'mustard_field', emoji: '🌾', label: 'Mustard field sequence' },
  { id: 'dialogue_baazi', emoji: '🎤', label: 'Dialogue-baazi exchange' },
  { id: 'silent_tear', emoji: '😢', label: 'Single silent tear' },
  { id: 'shoulder_glare', emoji: '👀', label: 'Over-shoulder glare' },
  { id: 'family_dinner_silence', emoji: '🍽️', label: 'Family dinner silence' },
  { id: 'corridor_walk', emoji: '🚶', label: 'Long corridor walk' },
  { id: 'monsoon_fistfight', emoji: '🥊', label: 'Fistfight in monsoon' },
  { id: 'phone_drops', emoji: '📱', label: 'Phone drops in slow-motion' },
  { id: 'door_burst', emoji: '🚪', label: 'Dramatic door burst' },
  { id: 'voiceover_letter', emoji: '✉️', label: 'Voiceover letter reading' },
];

export function getTropeById(id: string): Trope | undefined {
  return TROPES.find(t => t.id === id);
}

export function getTropeByLabel(label: string): Trope | undefined {
  return TROPES.find(t => t.label.toLowerCase() === label.toLowerCase());
}

export const TROPES_LIST_FOR_PROMPT = TROPES
  .map(t => `${t.emoji} ${t.label}`)
  .join(', ');
