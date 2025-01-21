// Utilities
import { defineStore } from 'pinia'

export interface FlowThumbnail {
  id: string;
  name: string;
  description?: string;
}

export interface Flow {
  id: string;
  name: string;
  description?: string;
  steps: Step[];
}

export interface Step {
  id: string;
  type: string;
  description: string;
  config: unknown;
}

export interface StepType {
  title: string;
  type: string;
  description: string;
  icon: string;
  baseConfig: unknown;
}

export interface ApiStepConfig {
  url: string;
  method: string;
  headers: object;
  body: string;
}

export interface EmailStepConfig {
  recipient: string;
  subject: string;
  body: string;
}

export const useAppStore = defineStore('flow', {
  state: () => ({
    currentFLow: {} as Flow,
  }),
})
