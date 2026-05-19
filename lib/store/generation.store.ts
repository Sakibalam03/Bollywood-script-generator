import { create } from 'zustand';
import type { DirectorPlan, Scene, Drama, GenerationEvent } from '@/lib/schemas';

export type GenerationPhase = 'idle' | 'director' | 'screenwriters' | 'composing' | 'done' | 'error';

interface GenerationState {
  phase: GenerationPhase;
  phaseMessage: string;
  plan: DirectorPlan | null;
  partialScenes: Scene[];
  failedSceneIndices: number[];
  drama: Drama | null;
  error: string | null;
  totalScenes: number;
}

interface GenerationActions {
  applyEvent: (event: GenerationEvent) => void;
  reset: () => void;
  setTotalScenes: (n: number) => void;
}

const INITIAL_STATE: GenerationState = {
  phase: 'idle',
  phaseMessage: '',
  plan: null,
  partialScenes: [],
  failedSceneIndices: [],
  drama: null,
  error: null,
  totalScenes: 0,
};

export const useGenerationStore = create<GenerationState & GenerationActions>((set) => ({
  ...INITIAL_STATE,

  applyEvent: (event: GenerationEvent) => {
    switch (event.type) {
      case 'phase':
        set({ phase: event.phase as GenerationPhase, phaseMessage: event.message ?? '' });
        break;
      case 'director_complete':
        set({
          plan: event.plan,
          totalScenes: event.plan.scene_outlines.length,
        });
        break;
      case 'scene_complete':
        set(s => ({ partialScenes: [...s.partialScenes, event.scene] }));
        break;
      case 'scene_failed':
        set(s => ({ failedSceneIndices: [...s.failedSceneIndices, event.index] }));
        break;
      case 'drama_complete':
        set({ drama: event.drama, phase: 'done' });
        break;
      case 'error':
        set({ phase: 'error', error: event.message });
        break;
    }
  },

  reset: () => set(INITIAL_STATE),
  setTotalScenes: (n: number) => set({ totalScenes: n }),
}));
