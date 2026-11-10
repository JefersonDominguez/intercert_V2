// UI Store - Zustand
// Manages global UI state (modals, sidebars, toasts, etc.)

import { create } from 'zustand';
import type { ModalState, ToastMessage } from '@/types';

interface UIState {
    // Sidebar
    isSidebarOpen: boolean;
    isSidebarCollapsed: boolean;

    // Modals
    ticketModal: ModalState;

    // Toasts
    toasts: ToastMessage[];

    // Loading states
    globalLoading: boolean;

    // Actions
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;
    toggleSidebarCollapse: () => void;

    openTicketModal: (ticketId?: string | number, mode?: 'view' | 'edit' | 'create') => void;
    closeTicketModal: () => void;

    addToast: (toast: Omit<ToastMessage, 'id'>) => void;
    removeToast: (id: string) => void;

    setGlobalLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    // Initial state
    isSidebarOpen: false,
    isSidebarCollapsed: false,
    ticketModal: { isOpen: false },
    toasts: [],
    globalLoading: false,

    // Sidebar actions
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    toggleSidebarCollapse: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

    // Modal actions
    openTicketModal: (ticketId, mode = 'view') =>
        set({ ticketModal: { isOpen: true, ticketId, mode } }),
    closeTicketModal: () =>
        set({ ticketModal: { isOpen: false } }),

    // Toast actions
    addToast: (toast) => {
        const id = Math.random().toString(36).substring(7);
        const newToast: ToastMessage = { ...toast, id };

        set((state) => ({ toasts: [...state.toasts, newToast] }));

        // Auto-remove after duration
        const duration = toast.duration || 5000;
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id),
            }));
        }, duration);
    },

    removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

    // Loading actions
    setGlobalLoading: (loading) => set({ globalLoading: loading }),
}));

// Selectors
export const useSidebarState = () => useUIStore((state) => ({
    isOpen: state.isSidebarOpen,
    isCollapsed: state.isSidebarCollapsed,
}));

export const useTicketModal = () => useUIStore((state) => state.ticketModal);
export const useToasts = () => useUIStore((state) => state.toasts);
export const useGlobalLoading = () => useUIStore((state) => state.globalLoading);
