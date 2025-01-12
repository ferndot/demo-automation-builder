// Utilities
import { defineStore } from 'pinia'

export interface Flow {
  id: string;
  name: string;
  description: string;
  steps?: Step[];
}

export interface Step {
  id: string;
  type: string;
  description: string;
  config: object;
}

export const useAppStore = defineStore('flow', {
  state: () => ({
    currentFLow: {} as Flow,
  }),
})
