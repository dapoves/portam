import { defineStore } from 'pinia'

export const useEstablecimientoStore = defineStore('stablish', {
    state: () => ({
        selectedCategory: '',
    }),
    actions: {
      setSelectedCategory(category: string) {
        this.selectedCategory = category
      }
    }
});
