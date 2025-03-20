import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FilterOptions } from "@/lib/types";

interface FiltersState {
  filters: FilterOptions;
  updateFilters: (newFilters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
}

// Filtre durumunu saklayan ve yöneten store
const useFiltersStore = create<FiltersState>()(
  persist(
    (set) => ({
      // Varsayılan filtre durumu
      filters: {
        period: undefined,
        sentiment: undefined,
        source: undefined,
        search: undefined,
      },
      
      // Filtreleri güncelleme fonksiyonu
      updateFilters: (newFilters: Partial<FilterOptions>) => 
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      
      // Filtreleri sıfırlama fonksiyonu
      resetFilters: () => 
        set({
          filters: {
            period: undefined,
            sentiment: undefined,
            source: undefined,
            search: undefined,
          },
        }),
    }),
    {
      name: "crypto-vibe-filters", // Local Storage anahtarı
    }
  )
);

// Hook olarak dışa aktarma
export const useFilters = () => useFiltersStore(); 