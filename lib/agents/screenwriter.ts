import { generateStructured } from '@/lib/llm/structured';
import { SceneSchema } from '@/lib/schemas/drama';
import type { DirectorPlan, Scene, SceneOutline } from '@/lib/schemas';
import { buildScreenwriterSystem, buildScreenwriterUser } from './prompts/screenwriter.prompt';

export async function runScreenwriterAgent(
  plan: DirectorPlan,
  outline: SceneOutline
): Promise<Scene> {
  return generateStructured({
    schema: SceneSchema,
    schemaName: 'Scene',
    system: buildScreenwriterSystem(plan),
    user: buildScreenwriterUser(outline),
    temperature: 0.85,
  });
}
