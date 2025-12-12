import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { CollectionGroups } from '../shared/collection-groups'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    group: CollectionGroups.System,
    listSearchableFields: ['email', 'name'],
    useAsTitle: 'name',
  },
  auth: true,
  defaultPopulate: {
    name: true,
    email: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  timestamps: true,
}
