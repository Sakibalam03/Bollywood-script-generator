import type { Drama, Character, Scene } from '@/lib/schemas';
import { TROPES_LIST_FOR_PROMPT } from '@/lib/constants/tropes';

export function buildRegenTitleSystem(): string {
  return `You are a Bollywood title writer. Given a drama's existing content, produce a new, more evocative title (2–6 words) and tagline (≤15 words).
Match the genre and mood. Be dramatic and poetic. Return JSON with "title" and "tagline" fields only.`;
}

export function buildRegenTitleUser(drama: Drama, direction?: string): string {
  return `Drama: "${drama.title}" — ${drama.genre}
Situation: ${drama.situation}
${direction ? `User wants: ${direction}` : 'Produce a fresh, more dramatic title and tagline.'}`;
}

export function buildRegenCharacterSystem(): string {
  return `You are a Bollywood character creator. Given a drama, produce a replacement character with a fresh archetype and more vivid personality. Preserve the character's role in the story but reinvent everything else.
Return a Character JSON object.`;
}

export function buildRegenCharacterUser(drama: Drama, character: Character, direction?: string): string {
  const otherCharacters = drama.characters
    .filter(c => c.id !== character.id)
    .map(c => c.name)
    .join(', ');

  return `Film: "${drama.title}" | Genre: ${drama.genre}
Current character to replace: ${character.name} (${character.role}) — ${character.description}
Other characters in the film: ${otherCharacters}
${direction ? `User wants: ${direction}` : 'Create a fresh, more interesting character for this role.'}`;
}

export function buildRegenSceneSystem(): string {
  return `You are a Bollywood screenwriter. Rewrite the given scene with more dramatic intensity, better dialogue, and stronger use of Bollywood tropes.

AVAILABLE TROPES:
${TROPES_LIST_FOR_PROMPT}

Return a Scene JSON object with the same index but entirely fresh content.`;
}

export function buildRegenSceneUser(drama: Drama, scene: Scene, direction?: string): string {
  const characterSummary = drama.characters
    .map(c => `${c.id}: ${c.name} (${c.signature_dialogue_style})`)
    .join('\n');

  return `Film: "${drama.title}" | Genre: ${drama.genre}
Scene to rewrite: Scene ${scene.index} — "${scene.title}" at ${scene.location}
Characters:
${characterSummary}
${direction ? `User wants: ${direction}` : 'Rewrite with maximum Bollywood drama and better dialogue.'}`;
}
