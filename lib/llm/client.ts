import { createOpenAI } from '@ai-sdk/openai';

let _client: ReturnType<typeof createOpenAI> | null = null;

export function getOpenRouterClient() {
  if (!_client) {
    _client = createOpenAI({
      baseURL: process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY ?? '',
    });
  }
  return _client;
}
