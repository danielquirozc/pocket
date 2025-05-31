import { Goal } from '@/types/goal';
import { create } from 'zustand';
import data from '@/mocks/database.json'

export interface GoalsStore {
  goals: Goal[];
  error: string | null;
  loading: boolean;
  showArchived: boolean;

  toggleCurrentView: (view: boolean) => void;
}

export const useGoalsStore = create<GoalsStore>((set, get) => ({
  goals: data,
  error: null,
  loading: false,
  showArchived: false,

  toggleCurrentView: (view) => set(() => ({ showArchived: view })),
}));