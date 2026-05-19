export const MODELS = {
  primary: process.env.LLM_MODEL_PRIMARY ?? 'google/gemma-4-31b-it:free',
  fallback: process.env.LLM_MODEL_FALLBACK ?? 'openai/gpt-oss-20b:free',
  light: process.env.LLM_MODEL_LIGHT ?? 'google/gemma-2-9b-it:free',
} as const;

export const MODEL_CHAIN = [MODELS.primary, MODELS.fallback, MODELS.light] as const;

export const AGENT_VERSIONS = {
  director: '1.0',
  screenwriter: '1.0',
} as const;
