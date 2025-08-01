// src/ability/defineAbility.ts

import { AbilityBuilder, createMongoAbility, type MongoAbility } from '@casl/ability'
import type { AuthUser } from '../types/auth'        

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'
export type Subjects = 'User' | 'Role' | 'Permission' | 'Dashboard' | 'all'
export type AppAbility = MongoAbility<[Actions, Subjects]>

export function defineAbilityFor(user: AuthUser | null): AppAbility {
  const { can, cannot, build } =
    new AbilityBuilder<AppAbility>(createMongoAbility)

  if (user?.roles?.includes('admin')) {
    can('manage', 'all')
  } else {
    can('read', 'User')
    can('read', 'Dashboard')
    cannot('delete', 'Role')
  }

  return build({
    detectSubjectType: subject => subject as Subjects
  })
}
