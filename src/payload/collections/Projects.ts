import type { CollectionConfig } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { CollectionGroups } from '../shared/collection-groups'

// NOTE: Removed slug field because portfolio uses ID / title-based routing, not /projects/:slug.
// NOTE: Removed githubUrl because most projects are client/private.
// NOTE: Removed featured because homepage selection is handled by `order` or other UI logic.

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', '_status', 'order', 'updatedAt'],
    group: CollectionGroups.Content,
    useAsTitle: 'title',
  },
  defaultPopulate: {
    title: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Short description for project cards',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Cover image for project card',
      },
    },
    {
      name: 'technologies',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
      label: 'Technologies',
      admin: {
        description: 'Technologies/skills used in this project',
      },
    },
    {
      name: 'liveUrl',
      type: 'text',
      admin: {
        description: 'Live demo URL',
      },
    },
    {
      name: 'githubUrl',
      type: 'text',
      admin: {
        description: 'Source code repository URL (optional)',
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
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Full project case study content',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            {
              name: 'title',
              type: 'text',
              admin: {
                description: 'SEO title (defaults to project title if empty)',
              },
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          if (doc._status === 'published') {
            payload.logger.info(`Revalidating project: ${doc.title}`)
            revalidatePath('/')
            revalidateTag('projects')
          }

          if (previousDoc?._status === 'published' && doc._status !== 'published') {
            payload.logger.info(`Revalidating unpublished project: ${previousDoc.title}`)
            revalidatePath('/')
            revalidateTag('projects')
          }
        }
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req: { context } }) => {
        if (!context.disableRevalidate) {
          revalidatePath('/')
          revalidateTag('projects')
        }
        return doc
      },
    ],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  timestamps: true,
}
