export const CONFIG = {
  generation: {
    maxSituationLength: 500,
    minSituationLength: 5,
    sceneCount: { min: 3, max: 3, default: 3 },
    characterCount: { min: 2, max: 4, default: 3 },
    llmTimeoutMs: 18_000,
    maxRetries: 0,
  },
  rateLimit: {
    generationsPerHour: 20,
    sharesPerHour: 30,
  },
  share: {
    ttlSeconds: 60 * 60 * 24 * 90,
    idLength: 10,
    maxPayloadBytes: 100_000,
  },
  storage: {
    maxLocalHistory: 50,
  },
} as const;
