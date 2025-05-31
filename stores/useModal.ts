import { ModalType } from "@/types/modal";
import { create } from "zustand";


export interface ModalStore {
  isOpen: boolean;
  type: ModalType | null;

  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  type: null,

  openModal: (type: ModalType) => set({ isOpen: true, type }),
  closeModal: () => set({ isOpen: false, type: null })
}));