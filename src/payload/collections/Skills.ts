import type { CollectionConfig } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { CollectionGroups } from '../shared/collection-groups'

export const Skills: CollectionConfig = {
  slug: 'skills',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'category', 'order', 'updatedAt'],
    group: CollectionGroups.Content,
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      admin: {
        description: 'Short description (e.g., "Frontend Framework", "Database")',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Skill icon/logo (40x40px recommended)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Tools', value: 'tools' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        description: 'Official website URL',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Sort order within category (higher = first)',
        position: 'sidebar',
      },
    },
    {
      name: 'showOnStack',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Show this skill in the "Tech Stack" section on the portfolio. Keep ON only for your core 6–10 skills.',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info('Revalidating skills')
          revalidatePath('/')
          revalidateTag('skills')
        }
      },
    ],
  },
  timestamps: true,
}
