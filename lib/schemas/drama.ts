import { z } from 'zod';

// Lenient role parsing — models sometimes say "hero" or "villain"
const ROLE_ALIASES: Record<string, string> = {
  hero: 'protagonist', lead: 'protagonist', main: 'protagonist',
  villain: 'antagonist', bad: 'antagonist',
  sidekick: 'supporting', secondary: 'supporting', side: 'supporting',
  comic: 'comic_relief', comedy: 'comic_relief', funny: 'comic_relief',
};

export const CharacterRoleSchema = z.preprocess(
  (v) => (typeof v === 'string' ? (ROLE_ALIASES[v.toLowerCase()] ?? v) : v),
  z.enum(['protagonist', 'antagonist', 'supporting', 'comic_relief', 'narrator'])
    .catch('supporting' as 'supporting')
);

export const CharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: CharacterRoleSchema,
  description: z.string(),
  archetype: z.string(),
  signature_dialogue_style: z.string(),
  avatar_color: z.string().optional(),
});

export const DialogueSchema = z.object({
  character_id: z.string(),
  line: z.string(),
  delivery: z.string().catch(''),
});

export const SceneSchema = z.object({
  // coerce handles models that return index as a string e.g. "0"
  index: z.coerce.number().int().min(0).catch(0),
  title: z.string(),
  location: z.string(),
  time_of_day: z.string().catch('Daytime'),
  mood: z.string().catch('Dramatic'),
  description: z.string(),
  dialogues: z.array(DialogueSchema).catch([]),
  tropes: z.array(z.string()).catch([]),
  music_cue: z.string().optional(),
});

export const PosterConceptSchema = z.object({
  visual_description: z.string(),
  // Accept any length array; we'll read up to 4 colours defensively in the UI
  color_palette: z.array(z.string()).min(1).catch(['#1a0a00', '#3d1a00', '#D4AF37', '#87CEEB']),
  main_subjects: z.array(z.string()).catch([]),
});

export const SceneOutlineSchema = z.object({
  index: z.coerce.number().int().min(0).catch(0),
  title: z.string(),
  location: z.string(),
  key_beats: z.array(z.string()).catch([]),
  assigned_characters: z.array(z.string()).catch([]),
});

export const DirectorPlanSchema = z.object({
  title: z.string(),
  tagline: z.string(),
  genre: z.string(),
  characters: z.array(CharacterSchema),
  scene_outlines: z.array(SceneOutlineSchema),
  poster_concept: PosterConceptSchema,
});

export const DramaSchema = z.object({
  id: z.string(),
  shortId: z.string().optional(),
  title: z.string(),
  tagline: z.string(),
  genre: z.string(),
  characters: z.array(CharacterSchema),
  scenes: z.array(SceneSchema),
  poster_concept: PosterConceptSchema,
  situation: z.string(),
  mood: z.string(),
  created_at: z.string(),
  generation_time_ms: z.number(),
  model_used: z.string(),
  agent_versions: z.object({
    director: z.string(),
    screenwriter: z.string(),
  }),
});

export const GenerationEventSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('phase'), phase: z.string(), message: z.string().optional() }),
  z.object({ type: z.literal('director_complete'), plan: DirectorPlanSchema }),
  z.object({ type: z.literal('scene_complete'), scene: SceneSchema }),
  z.object({ type: z.literal('scene_failed'), index: z.number(), reason: z.string() }),
  z.object({ type: z.literal('drama_complete'), drama: DramaSchema }),
  z.object({ type: z.literal('error'), message: z.string() }),
]);
