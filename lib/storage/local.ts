'use client';

import Dexie, { type EntityTable } from 'dexie';
import type { Drama } from '@/lib/schemas';
import { CONFIG } from '@/lib/config';

interface DramaRecord extends Drama {
  _localId?: number;
}

class BollywoodDB extends Dexie {
  dramas!: EntityTable<DramaRecord, 'id'>;

  constructor() {
    super('bollywood-drama-db');
    this.version(1).stores({
      dramas: 'id, created_at, shortId',
    });
  }
}

let _db: BollywoodDB | null = null;

function getDB(): BollywoodDB {
  if (!_db) {
    _db = new BollywoodDB();
  }
  return _db;
}

export async function saveDrama(drama: Drama): Promise<void> {
  const db = getDB();
  await db.dramas.put(drama);

  // Trim to max history
  const count = await db.dramas.count();
  if (count > CONFIG.storage.maxLocalHistory) {
    const oldest = await db.dramas
      .orderBy('created_at')
      .limit(count - CONFIG.storage.maxLocalHistory)
      .toArray();
    await db.dramas.bulkDelete(oldest.map(d => d.id));
  }
}

export async function getDrama(id: string): Promise<Drama | undefined> {
  return getDB().dramas.get(id);
}

export async function getDramaByShortId(shortId: string): Promise<Drama | undefined> {
  return getDB().dramas.where('shortId').equals(shortId).first();
}

export async function listDramas(): Promise<Drama[]> {
  return getDB().dramas
    .orderBy('created_at')
    .reverse()
    .toArray();
}

export async function deleteDrama(id: string): Promise<void> {
  await getDB().dramas.delete(id);
}

export function getDramaTable() {
  return getDB().dramas;
}
