# 🎬 Masala Magic — Bollywood Drama Generator

> Transform any ordinary real-world situation into an absurd, multi-scene Bollywood blockbuster using a visible multi-agent LLM system.

[![Demo Video](https://img.shields.io/badge/Demo-Video-red)](https://youtu.be/REPLACE_ME)
[![Live Demo](https://img.shields.io/badge/Live-Demo-gold)](https://masala-magic.vercel.app)

---

## What It Does

Enter any mundane situation ("my landlord came to collect rent and I spent all the money on samosas") → pick a cinematic mood → watch a **Director AI agent** craft the film concept, then **parallel Screenwriter agents** write each scene simultaneously → get a full movie script with title, tagline, character cards, scenes with dialogue, and a shareable movie-poster link.

---

## Creative Angle

The multi-agent architecture isn't just an engineering choice — it's the *spectacle*. You watch the Director deliberate while the Screenwriters race to write their scenes in parallel, each slot lighting up as it completes. The 10 cinematic mood presets (from Sanjay Leela Bhansali grand opera to Anurag Kashyap gritty noir) fundamentally alter the tone of every output: the same parking dispute becomes Greek tragedy under one mood and slapstick action comedy under another. The project proves that structured AI outputs + visible orchestration can themselves be a form of entertainment.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 App Router | SSR for shared drama pages, SSE for generation streaming, OG image API |
| Language | TypeScript (strict) | AI output validation requires strict types |
| Styling | Tailwind CSS v4 + shadcn | Fast, dark-themed, no runtime CSS-in-JS |
| Animation | Framer Motion | Cinematic overlay transitions |
| LLM | Vercel AI SDK v6 + OpenRouter | Provider-agnostic, model fallback chain, structured outputs |
| State | Zustand v5 | Simple generation flow state without Redux overhead |
| Validation | Zod v4 | Runtime schema validation for all LLM outputs |
| Local history | Dexie v4 (IndexedDB) | Persistent history without a database |
| Share storage | Upstash Redis (REST) | Serverless-friendly, TTL support, no cold starts |
| Rate limiting | @upstash/ratelimit | Sliding window, IP-based |

---

## Architecture

```
User Input (situation + mood)
        │
        ▼
POST /api/generate (SSE stream)
        │
        ▼
  Director Agent ──────────────── 1 LLM call
  (builds title, characters,     (gpt-4o-mini via OpenRouter)
   scene outlines, poster)
        │
        ▼ director_complete event →→→ UI shows plan
        │
  ┌─────┴────────────────────────┐
  │ Parallel Screenwriter Agents │  N simultaneous LLM calls
  │ (1 per scene outline)        │  Promise.allSettled for resilience
  └─────┬────────────────────────┘
        │
        ▼ scene_complete events (as each finishes) →→→ UI slots fill
        │
  Compose Drama (sort + validate + save to IndexedDB)
        │
        ▼ drama_complete event →→→ Full drama rendered
```

**Model fallback chain:** `primary → fallback → light` with 2 retries per model, 30s timeout. If all fail, a graceful error event is emitted.

---

## AI Engineering Details

### Structured Outputs
All LLM calls use `generateObject` (Vercel AI SDK v6) with Zod schemas. This means:
- Zero string parsing — outputs are directly typed
- Schema validation failures trigger retry + model fallback
- The Director plan schema includes scene outlines that the Screenwriters receive as structured context

### Prompt Strategy
- **Director**: Sanjay Leela Bhansali + Salim-Javed persona, given a hand-crafted few-shot example in the system prompt. Emphasises archetypes, specific scene beats, and poster visual language.
- **Screenwriters**: Receive the full Director plan (all characters + signature dialogue styles) as context. The canonical 20-trope list is injected so outputs stay on-brand.
- **Mood anchors**: Each of 10 presets injects a `prompt_anchor` string that precisely describes the visual and tonal language of that filmmaker's style.

### Few-Shot Example (Director)
A hand-crafted example converts "my landlord came for rent but I spent it on samosas" into a full `DirectorPlan` JSON. This example is inlined in every Director system prompt — it's the single biggest quality lever.

---

## Local Setup (5 minutes)

### Prerequisites
- Node.js 20+
- pnpm (`npm install -g pnpm`)
- OpenRouter API key (free at openrouter.ai)
- Upstash Redis (free tier at upstash.com) — *optional for share feature*

### Steps

```bash
git clone <repo>
cd bollywood-drama
pnpm install

# Copy env template
cp .env.example .env.local
# Edit .env.local with your API keys

pnpm dev
# Open http://localhost:3000
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | **Yes** | Get free key at openrouter.ai |
| `OPENROUTER_BASE_URL` | No | Default: `https://openrouter.ai/api/v1` |
| `LLM_MODEL_PRIMARY` | No | Default: `openai/gpt-4o-mini` |
| `LLM_MODEL_FALLBACK` | No | Default: `google/gemma-2-9b-it:free` |
| `LLM_MODEL_LIGHT` | No | Default: `google/gemma-2-9b-it:free` |
| `UPSTASH_REDIS_REST_URL` | For sharing | Upstash dashboard |
| `UPSTASH_REDIS_REST_TOKEN` | For sharing | Upstash dashboard |
| `NEXT_PUBLIC_APP_URL` | No | Default: `http://localhost:3000` |

---

## Project Structure

```
bollywood-drama/
├── app/
│   ├── api/
│   │   ├── generate/route.ts    ← SSE generation stream
│   │   ├── regenerate/route.ts  ← Regenerate title/character/scene
│   │   ├── share/route.ts       ← Create shareable link
│   │   └── share/[shortId]/     ← Fetch shared drama
│   ├── d/[shortId]/             ← Public read-only drama viewer
│   │   └── opengraph-image.tsx  ← Dynamic movie poster OG image (1200x630)
│   └── drama/[id]/              ← Local drama viewer (IndexedDB)
├── components/drama/            ← All drama UI components
├── lib/
│   ├── agents/                  ← Director, Screenwriter, Regenerator, Orchestrator
│   ├── llm/                     ← Client, structured generation, retry chain
│   ├── schemas/                 ← Zod schemas for all domain objects
│   ├── storage/                 ← Dexie (local) + Redis (share)
│   └── store/                   ← Zustand generation + UI state
└── hooks/                       ← useGeneration, useShareDrama, useDramaHistory
```

---

## Key Design Decisions

- **No backend service**: Everything runs in Next.js API routes. The SSE stream and Redis calls are both serverless-friendly.
- **Promise.allSettled for scenes**: A single failing screenwriter doesn't kill the film — failed scenes emit `scene_failed` events with a regenerate button.
- **IndexedDB as primary history**: No auth, no database schema migrations, works offline, 50-item cap via automatic trim.
- **Zod v4 on all LLM outputs**: Every model response is parsed through the schema before being used. If validation fails, we retry with the same model (up to 2× before falling back).
- **`params` as Promise**: This project targets Next.js 16 where route params are async — all page/route handlers `await params`.

---

## Known Limitations

- Free-tier OpenRouter models can be slow (5–15s per LLM call)
- Share feature requires Upstash Redis; graceful degradation if Redis is unavailable
- Regenerate character produces a new character but doesn't retroactively update scene dialogue `character_id` references
- OG images use system sans-serif (no custom Bebas Neue) due to font loading constraints in ImageResponse

---

## What's Next

- WebSocket-based live "watch mode" (watch someone else's film generate)
- Web Speech API to "perform" scene dialogues aloud
- Discover gallery for shared dramas
- More moods (Tamil Rajinikanth mass, Marathi rural drama, Pakistani romance)
- PDF export of the complete screenplay
- Automatic continuity validation between scenes
- Vercel deployment with Edge Middleware rate limiting

---
 