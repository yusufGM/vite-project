// src/components/store/filterStore.js
import { create } from "zustand";

export const useFilterStore = create((set) => ({
  filters: {
    sale: false,
    gender: "all", // "all" | "male" | "female" | "unisex"
    ageGroup: "all", // "all" | "adult" | "child"
    price: "none", // "none" | "low-high" | "high-low"
  },
  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),
  toggleFilter: (key) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: !state.filters[key],
      },
    })),
}));
