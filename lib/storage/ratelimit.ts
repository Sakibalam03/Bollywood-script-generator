import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { CONFIG } from '@/lib/config';

let _generateLimiter: Ratelimit | null = null;
let _shareLimiter: Ratelimit | null = null;

function getRedis(): Redis {
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL ?? '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN ?? '',
  });
}

export function getGenerateLimiter(): Ratelimit {
  if (!_generateLimiter) {
    _generateLimiter = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(CONFIG.rateLimit.generationsPerHour, '1 h'),
      prefix: 'rl:generate',
    });
  }
  return _generateLimiter;
}

export function getShareLimiter(): Ratelimit {
  if (!_shareLimiter) {
    _shareLimiter = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(CONFIG.rateLimit.sharesPerHour, '1 h'),
      prefix: 'rl:share',
    });
  }
  return _shareLimiter;
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}
