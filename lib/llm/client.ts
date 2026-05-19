import { createOpenAI } from '@ai-sdk/openai';

let _client: ReturnType<typeof createOpenAI> | null = null;

export function getOpenRouterClient() {
  if (!_client) {
    _client = createOpenAI({
      baseURL: process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY ?? '',
      headers: {
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
        'X-Title': 'Masala Magic - Bollywood Drama Generator',
      },
    });
  }
  return _client;
}
