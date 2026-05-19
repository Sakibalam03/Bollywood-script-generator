export class LLMUnavailableError extends Error {
  constructor(message = 'All LLM models failed') {
    super(message);
    this.name = 'LLMUnavailableError';
  }
}

export class LLMTimeoutError extends Error {
  constructor(model: string, timeoutMs: number) {
    super(`Model ${model} timed out after ${timeoutMs}ms`);
    this.name = 'LLMTimeoutError';
  }
}

export class LLMValidationError extends Error {
  constructor(model: string, cause: unknown) {
    super(`Model ${model} returned invalid schema`);
    this.name = 'LLMValidationError';
    this.cause = cause;
  }
}
