import type { Character, Drama } from '@/lib/schemas';
import { CharacterCard } from './CharacterCard';

interface CharacterGridProps {
  characters: Character[];
  drama?: Drama;
  onRegenerateCharacter?: (characterId: string, direction?: string) => Promise<void>;
  readOnly?: boolean;
}

export function CharacterGrid({ characters, drama, onRegenerateCharacter, readOnly }: CharacterGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          character={character}
          drama={drama}
          onRegenerate={onRegenerateCharacter}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
}
