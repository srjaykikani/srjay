import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { CollectionGroups } from '../shared/collection-groups'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['filename', 'alt', 'createdAt', 'updatedAt'],
    group: CollectionGroups.Media,
  },
  defaultPopulate: {
    alt: true,
    url: true,
    filename: true,
    mimeType: true,
    width: true,
    height: true,
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'xs', width: 480 },
      { name: 'sm', width: 768 },
      { name: 'md', width: 1024 },
      { name: 'lg', width: 1920 },
      { name: 'xl', width: 2560 },
      { name: 'og', width: 1200, height: 630 },
    ],
    adminThumbnail: 'sm',
  },
}
