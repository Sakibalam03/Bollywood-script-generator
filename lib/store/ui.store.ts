import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  shareModalOpen: boolean;
  shareUrl: string | null;
}

interface UIActions {
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  openShareModal: (url: string) => void;
  closeShareModal: () => void;
}

export const useUIStore = create<UIState & UIActions>((set) => ({
  sidebarOpen: false,
  shareModalOpen: false,
  shareUrl: null,

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
  openShareModal: (url) => set({ shareModalOpen: true, shareUrl: url }),
  closeShareModal: () => set({ shareModalOpen: false, shareUrl: null }),
}));
