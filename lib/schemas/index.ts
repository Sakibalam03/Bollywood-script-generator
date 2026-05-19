export * from './drama';
export * from './api';

export type { z } from 'zod';
import type { z } from 'zod';
import type {
  CharacterRoleSchema,
  CharacterSchema,
  DialogueSchema,
  SceneSchema,
  PosterConceptSchema,
  SceneOutlineSchema,
  DirectorPlanSchema,
  DramaSchema,
  GenerationEventSchema,
} from './drama';
import type {
  GenerateRequestSchema,
  RegenerateTargetSchema,
  RegenerateRequestSchema,
  ShareRequestSchema,
  ShareResponseSchema,
} from './api';

export type CharacterRole = z.infer<typeof CharacterRoleSchema>;
export type Character = z.infer<typeof CharacterSchema>;
export type Dialogue = z.infer<typeof DialogueSchema>;
export type Scene = z.infer<typeof SceneSchema>;
export type PosterConcept = z.infer<typeof PosterConceptSchema>;
export type SceneOutline = z.infer<typeof SceneOutlineSchema>;
export type DirectorPlan = z.infer<typeof DirectorPlanSchema>;
export type Drama = z.infer<typeof DramaSchema>;
export type GenerationEvent = z.infer<typeof GenerationEventSchema>;
export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;
export type RegenerateTarget = z.infer<typeof RegenerateTargetSchema>;
export type RegenerateRequest = z.infer<typeof RegenerateRequestSchema>;
export type ShareRequest = z.infer<typeof ShareRequestSchema>;
export type ShareResponse = z.infer<typeof ShareResponseSchema>;
