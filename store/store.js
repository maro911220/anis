import { create } from "zustand";

const useStore = create((set) => ({
  counts: 0,
  increase: () => set((state) => ({ counts: state.counts + 1 })),
}));

export default useStore;
