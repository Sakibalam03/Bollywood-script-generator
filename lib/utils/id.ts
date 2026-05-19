import { nanoid } from 'nanoid';

export function generateId(): string {
  return nanoid();
}

export function generateShortId(length = 10): string {
  return nanoid(length);
}
