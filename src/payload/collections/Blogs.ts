import type { CollectionConfig } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { CollectionGroups } from '../shared/collection-groups'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'publishedAt', '_status', 'updatedAt'],
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
      name: 'summary',
      type: 'textarea',
      admin: {
        description: 'Short summary for blog cards and SEO',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Cover image for blog post',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MMM d, yyyy',
        },
        description: 'Publication date',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Full blog post content',
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
                description: 'SEO title (defaults to blog title if empty)',
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
            payload.logger.info(`Revalidating blog: ${doc.slug}`)
            revalidatePath(`/blog/${doc.slug}`)
            revalidatePath('/blog')
            revalidateTag('blogs')
          }

          if (previousDoc?._status === 'published' && doc._status !== 'published') {
            payload.logger.info(`Revalidating unpublished blog: ${previousDoc.slug}`)
            revalidatePath(`/blog/${previousDoc.slug}`)
            revalidatePath('/blog')
            revalidateTag('blogs')
          }
        }
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req: { context } }) => {
        if (!context.disableRevalidate) {
          revalidatePath(`/blog/${doc?.slug}`)
          revalidatePath('/blog')
          revalidateTag('blogs')
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
