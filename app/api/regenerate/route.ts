import { type NextRequest } from 'next/server';
import { RegenerateRequestSchema } from '@/lib/schemas/api';
import { DramaSchema } from '@/lib/schemas/drama';
import { regenerateTitleTagline, regenerateCharacter, regenerateScene } from '@/lib/agents/regenerator';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = RegenerateRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 });
  }

  const dramaResult = DramaSchema.safeParse(parsed.data.drama);
  if (!dramaResult.success) {
    return Response.json({ error: 'Invalid drama data' }, { status: 400 });
  }

  const drama = dramaResult.data;
  const { target, direction } = parsed.data;

  try {
    if (target.type === 'title_tagline') {
      const result = await regenerateTitleTagline(drama, direction);
      return Response.json({ type: 'title_tagline', ...result });
    }

    if (target.type === 'character') {
      const character = drama.characters.find(c => c.id === target.characterId);
      if (!character) {
        return Response.json({ error: 'Character not found' }, { status: 404 });
      }
      const result = await regenerateCharacter(drama, character, direction);
      return Response.json({ type: 'character', character: result });
    }

    if (target.type === 'scene') {
      const scene = drama.scenes.find(s => s.index === target.sceneIndex);
      if (!scene) {
        return Response.json({ error: 'Scene not found' }, { status: 404 });
      }
      const result = await regenerateScene(drama, scene, direction);
      return Response.json({ type: 'scene', scene: result });
    }

    return Response.json({ error: 'Unknown target type' }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Regeneration failed';
    return Response.json({ error: message }, { status: 500 });
  }
}
