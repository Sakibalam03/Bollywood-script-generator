import { generateText } from 'ai';
import type { z } from 'zod';
import { getOpenRouterClient } from './client';
import { MODEL_CHAIN } from './models';
import { CONFIG } from '@/lib/config';
import { LLMUnavailableError, LLMTimeoutError } from './errors';

interface GenerateStructuredArgs<T extends z.ZodTypeAny> {
  schema: T;
  schemaName: string;
  system: string;
  user: string;
  temperature?: number;
  maxRetries?: number;
}

function extractJSON(text: string): string {
  // 1. Strip ```json ... ``` or ``` ... ``` code fences
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) return fence[1].trim();

  // 2. Find the outermost { ... } block
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    return text.slice(start, end + 1).trim();
  }

  // 3. Find the outermost [ ... ] block
  const aStart = text.indexOf('[');
  const aEnd = text.lastIndexOf(']');
  if (aStart !== -1 && aEnd !== -1 && aEnd > aStart) {
    return text.slice(aStart, aEnd + 1).trim();
  }

  return text.trim();
}

export async function generateStructured<T extends z.ZodTypeAny>(
  args: GenerateStructuredArgs<T>
): Promise<z.infer<T>> {
  const {
    schema,
    system,
    user,
    temperature = 0.8,
    maxRetries = CONFIG.generation.maxRetries,
  } = args;

  const client = getOpenRouterClient();

  // Keep the system prompt clean — the few-shot examples in each agent prompt
  // already define the exact JSON structure. Just enforce output format.
  const fullSystem = `${system}

IMPORTANT: Respond with ONLY a valid JSON object. No explanation, no markdown, no code fences — raw JSON only.`;

  const errors: string[] = [];

  for (const modelId of MODEL_CHAIN) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new LLMTimeoutError(modelId, CONFIG.generation.llmTimeoutMs)),
            CONFIG.generation.llmTimeoutMs
          )
        );

        const generatePromise = generateText({
          model: client(modelId),
          system: fullSystem,
          prompt: user,
          temperature,
        });

        const result = await Promise.race([generatePromise, timeoutPromise]);
        const jsonText = extractJSON(result.text);
        const parsed = JSON.parse(jsonText);
        return schema.parse(parsed) as z.infer<T>;
      } catch (err) {
        if (err instanceof LLMTimeoutError) {
          errors.push(`Model ${modelId} timed out`);
          break; // move to next model
        }
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`Model ${modelId} attempt ${attempt + 1}: ${msg}`);
        if (attempt === maxRetries) break;
      }
    }
  }

  throw new LLMUnavailableError(`All models failed:\n${errors.join('\n')}`);
}
