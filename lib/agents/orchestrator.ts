import type { GenerationEvent, Drama, DirectorPlan, Scene } from '@/lib/schemas';
import { runDirectorAgent } from './director';
import { runScreenwriterAgent } from './screenwriter';
import { generateId, generateShortId } from '@/lib/utils/id';
import { AGENT_VERSIONS } from '@/lib/llm/models';
import { colorFromString } from '@/lib/utils/color';

export interface OrchestrationInput {
  situation: string;
  mood: string;
}

export async function* orchestrate(
  input: OrchestrationInput,
  signal?: AbortSignal
): AsyncGenerator<GenerationEvent> {
  const startTime = Date.now();

  // Phase: Director
  yield { type: 'phase', phase: 'director', message: 'The Director is crafting your story…' };

  let plan: DirectorPlan;
  try {
    plan = await runDirectorAgent(input);

    // Assign avatar colors to characters
    plan = {
      ...plan,
      characters: plan.characters.map(c => ({
        ...c,
        avatar_color: c.avatar_color ?? colorFromString(c.name),
      })),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Director agent failed';
    yield { type: 'error', message: `Could not create your film concept: ${message}` };
    return;
  }

  if (signal?.aborted) return;
  yield { type: 'director_complete', plan };

  // Phase: Screenwriters
  yield { type: 'phase', phase: 'screenwriters', message: `Screenwriters writing ${plan.scene_outlines.length} scenes in parallel…` };

  const sceneResults = await Promise.allSettled(
    plan.scene_outlines.map(outline => runScreenwriterAgent(plan, outline))
  );

  if (signal?.aborted) return;

  const scenes: Scene[] = [];
  for (let i = 0; i < sceneResults.length; i++) {
    const result = sceneResults[i];
    if (result.status === 'fulfilled') {
      yield { type: 'scene_complete', scene: result.value };
      scenes.push(result.value);
    } else {
      const reason = result.reason instanceof Error ? result.reason.message : 'Unknown error';
      yield { type: 'scene_failed', index: i, reason };
    }
  }

  if (scenes.length === 0) {
    yield { type: 'error', message: 'All screenwriters failed. Please try again.' };
    return;
  }

  // Phase: Composing
  yield { type: 'phase', phase: 'composing', message: 'Assembling the final masterpiece…' };

  const sortedScenes = [...scenes].sort((a, b) => a.index - b.index);

  const modelUsed = process.env.LLM_MODEL_PRIMARY ?? 'unknown';
  const drama: Drama = {
    id: generateId(),
    title: plan.title,
    tagline: plan.tagline,
    genre: plan.genre,
    characters: plan.characters,
    scenes: sortedScenes,
    poster_concept: plan.poster_concept,
    situation: input.situation,
    mood: input.mood,
    created_at: new Date().toISOString(),
    generation_time_ms: Date.now() - startTime,
    model_used: modelUsed,
    agent_versions: AGENT_VERSIONS,
  };

  yield { type: 'drama_complete', drama };
}
