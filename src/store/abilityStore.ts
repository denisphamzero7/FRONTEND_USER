// src/stores/abilityStore.ts
import { defineStore } from 'pinia'
import { defineAbilityFor, type AppAbility } from '../ability/defineAbility'
import type { AuthUser } from '../types/auth'

export const useAbilityStore = defineStore('ability', {
  state: () => ({
    ability: defineAbilityFor(null) as AppAbility
  }),
  actions: {
    updateAbility(user: AuthUser | null) {
      this.ability = defineAbilityFor(user)
    }
  }
})
