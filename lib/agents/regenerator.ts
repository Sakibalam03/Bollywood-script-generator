import { z } from 'zod';
import { generateStructured } from '@/lib/llm/structured';
import { CharacterSchema, SceneSchema } from '@/lib/schemas/drama';
import type { Drama, Character, Scene } from '@/lib/schemas';
import {
  buildRegenTitleSystem, buildRegenTitleUser,
  buildRegenCharacterSystem, buildRegenCharacterUser,
  buildRegenSceneSystem, buildRegenSceneUser,
} from './prompts/regenerate.prompt';

const TitleTaglineSchema = z.object({
  title: z.string(),
  tagline: z.string(),
});

export async function regenerateTitleTagline(
  drama: Drama,
  direction?: string
): Promise<{ title: string; tagline: string }> {
  return generateStructured({
    schema: TitleTaglineSchema,
    schemaName: 'TitleTagline',
    system: buildRegenTitleSystem(),
    user: buildRegenTitleUser(drama, direction),
    temperature: 0.9,
  });
}

export async function regenerateCharacter(
  drama: Drama,
  character: Character,
  direction?: string
): Promise<Character> {
  return generateStructured({
    schema: CharacterSchema,
    schemaName: 'Character',
    system: buildRegenCharacterSystem(),
    user: buildRegenCharacterUser(drama, character, direction),
    temperature: 0.9,
  });
}

export async function regenerateScene(
  drama: Drama,
  scene: Scene,
  direction?: string
): Promise<Scene> {
  return generateStructured({
    schema: SceneSchema,
    schemaName: 'Scene',
    system: buildRegenSceneSystem(),
    user: buildRegenSceneUser(drama, scene, direction),
    temperature: 0.85,
  });
}
