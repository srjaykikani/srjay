import type { CollectionConfig } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { CollectionGroups } from '../shared/collection-groups'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['company', 'isCurrentEmployer', 'order', 'updatedAt'],
    group: CollectionGroups.Content,
    useAsTitle: 'company',
  },
  fields: [
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Company logo',
      },
    },
    {
      name: 'website',
      type: 'text',
      admin: {
        description: 'Company website URL',
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'Location (e.g., "GJ — India", "Remote")',
      },
    },
    {
      name: 'isCurrentEmployer',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as current employer',
        position: 'sidebar',
      },
    },
    {
      name: 'positions',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Positions held at this company',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Job title',
          },
        },
        {
          name: 'employmentType',
          type: 'select',
          options: [
            { label: 'Full-time', value: 'full-time' },
            { label: 'Part-time', value: 'part-time' },
            { label: 'Contract', value: 'contract' },
            { label: 'Freelance', value: 'freelance' },
            { label: 'Internship', value: 'internship' },
          ],
          admin: {
            description: 'Type of employment',
          },
        },
        {
          name: 'startDate',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'MMM yyyy',
            },
          },
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            description: 'Leave empty for current position',
            date: {
              pickerAppearance: 'monthOnly',
              displayFormat: 'MMM yyyy',
            },
          },
        },
        {
          name: 'description',
          type: 'richText',
          admin: {
            description: 'Role description and achievements',
          },
        },
        {
          name: 'skills',
          type: 'relationship',
          relationTo: 'skills',
          hasMany: true,
          admin: {
            description: 'Skills/technologies used in this role',
          },
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Sort order (higher = first)',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          payload.logger.info('Revalidating experiences')
          revalidatePath('/')
          revalidateTag('experiences')
        }
      },
    ],
  },
  timestamps: true,
}
