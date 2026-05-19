import { generateStructured } from '@/lib/llm/structured';
import { DirectorPlanSchema } from '@/lib/schemas/drama';
import type { DirectorPlan } from '@/lib/schemas';
import { buildDirectorSystem, buildDirectorUser } from './prompts/director.prompt';
import { getMoodById } from '@/lib/constants/moods';

export interface DirectorInput {
  situation: string;
  mood: string;
}

export async function runDirectorAgent(input: DirectorInput): Promise<DirectorPlan> {
  const moodDef = getMoodById(input.mood);
  const moodAnchor = moodDef ? `${moodDef.emoji} ${moodDef.label} — ${moodDef.prompt_anchor}` : input.mood;

  return generateStructured({
    schema: DirectorPlanSchema,
    schemaName: 'DirectorPlan',
    system: buildDirectorSystem(),
    user: buildDirectorUser(input.situation, moodAnchor),
    temperature: 0.9,
    maxTokens: 900,
  });
}
