import { z } from 'zod';
import { CONFIG } from '@/lib/config';

export const GenerateRequestSchema = z.object({
  situation: z
    .string()
    .min(CONFIG.generation.minSituationLength, 'Too short')
    .max(CONFIG.generation.maxSituationLength, 'Too long'),
  mood: z.string().min(1),
});

export const RegenerateTargetSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('title_tagline') }),
  z.object({ type: z.literal('character'), characterId: z.string() }),
  z.object({ type: z.literal('scene'), sceneIndex: z.number().int().min(0) }),
]);

export const RegenerateRequestSchema = z.object({
  dramaId: z.string(),
  drama: z.any(),
  target: RegenerateTargetSchema,
  direction: z.string().optional(),
});

export const ShareRequestSchema = z.object({
  drama: z.any(),
});

export const ShareResponseSchema = z.object({
  shortId: z.string(),
  url: z.string(),
});
