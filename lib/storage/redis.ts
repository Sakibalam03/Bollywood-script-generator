import { Redis } from '@upstash/redis';
import { CONFIG } from '@/lib/config';
import type { Drama } from '@/lib/schemas';

let _redis: Redis | null = null;

function getRedis(): Redis {
  if (!_redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
      throw new Error('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set');
    }

    _redis = new Redis({ url, token });
  }
  return _redis;
}

function dramaKey(shortId: string): string {
  return `drama:${shortId}`;
}

export async function storeDrama(shortId: string, drama: Drama): Promise<void> {
  const redis = getRedis();
  const payload = JSON.stringify(drama);

  if (Buffer.byteLength(payload, 'utf8') > CONFIG.share.maxPayloadBytes) {
    throw new Error('Drama payload exceeds maximum size');
  }

  await redis.set(dramaKey(shortId), payload, { ex: CONFIG.share.ttlSeconds });
}

export async function fetchDrama(shortId: string): Promise<Drama | null> {
  const redis = getRedis();
  const raw = await redis.get<string>(dramaKey(shortId));
  if (!raw) return null;

  try {
    const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return data as Drama;
  } catch {
    return null;
  }
}
