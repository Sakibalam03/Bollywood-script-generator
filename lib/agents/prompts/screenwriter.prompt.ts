import { SCREENWRITER_EXAMPLE } from './examples';
import { TROPES_LIST_FOR_PROMPT } from '@/lib/constants/tropes';
import type { DirectorPlan, SceneOutline } from '@/lib/schemas';

export function buildScreenwriterSystem(plan: DirectorPlan): string {
  const characterSummary = plan.characters
    .map(c => `- ${c.name} (${c.role}): ${c.description}. Dialogue style: ${c.signature_dialogue_style}`)
    .join('\n');

  return `You are a Screenwriter working under the Director's vision. Your job is to write one fully realized Scene from the provided outline.

FILM: "${plan.title}"
TAGLINE: "${plan.tagline}"
GENRE: ${plan.genre}

CHARACTERS:
${characterSummary}

AVAILABLE BOLLYWOOD TROPES (use these exact labels when listing tropes in the scene):
${TROPES_LIST_FOR_PROMPT}

RULES FOR THIS SCENE:
- Write at least 4–6 dialogue exchanges with specific delivery notes in parentheses
- The scene description should be cinematic stage direction prose (50–150 words)
- Include 2–4 trope labels from the available list
- Music cue should be specific and evocative
- Dialogue must match each character's signature_dialogue_style exactly
- Heighten the drama: every scene should feel like it's building toward or releasing a climax
- The mood and genre must permeate every line

Here is a hand-crafted example of perfect output:
${SCREENWRITER_EXAMPLE}

Return ONLY valid JSON matching the Scene schema.`;
}

export function buildScreenwriterUser(outline: SceneOutline): string {
  return `Write Scene ${outline.index}: "${outline.title}"
Location: ${outline.location}
Key beats to hit: ${outline.key_beats.join(' → ')}
Characters in this scene: ${outline.assigned_characters.join(', ')}

Produce the Scene JSON now.`;
}
