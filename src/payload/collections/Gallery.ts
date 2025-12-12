import type { CollectionConfig } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { CollectionGroups } from '../shared/collection-groups'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'order', 'updatedAt'],
    group: CollectionGroups.Media,
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Caption for the photo',
      },
    },
    {
      name: 'exifData',
      type: 'json',
      admin: {
        description: 'EXIF metadata (auto-extracted)',
        readOnly: true,
      },
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
          payload.logger.info('Revalidating gallery')
          revalidatePath('/')
          revalidateTag('gallery')
        }
      },
    ],
  },
  timestamps: true,
}
