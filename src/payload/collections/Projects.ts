import type { CollectionConfig } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { CollectionGroups } from '../shared/collection-groups'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'featured', '_status', 'updatedAt'],
    group: CollectionGroups.Content,
    useAsTitle: 'title',
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
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
      name: 'tags',
      type: 'array',
      label: 'Technology Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
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
        description: 'Source code repository URL',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show on homepage featured projects section',
        position: 'sidebar',
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
            payload.logger.info(`Revalidating project: ${doc.slug}`)
            revalidatePath(`/projects/${doc.slug}`)
            revalidatePath('/')
            revalidateTag('projects')
          }

          if (previousDoc?._status === 'published' && doc._status !== 'published') {
            payload.logger.info(`Revalidating unpublished project: ${previousDoc.slug}`)
            revalidatePath(`/projects/${previousDoc.slug}`)
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
          revalidatePath(`/projects/${doc?.slug}`)
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
