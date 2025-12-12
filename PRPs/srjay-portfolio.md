# PRP: srjay.com Portfolio Implementation

**Status**: Ready for Implementation
**Priority**: Critical
**Confidence Score**: 9/10
**Feature Reference**: [INITIAL.md](../INITIAL.md)
**Target**: Pixel-perfect portfolio worthy of $500k/year senior engineering position

---

## 1. Executive Summary

Transform the Payload + tRPC template into a world-class portfolio for srjay.com. Build a single-page scroll design with 10 distinct sections, CMS-managed content via Payload globals/collections, and a sticky navigation header. The portfolio must be clean, minimal, performant with zero animations.

**Key Deliverables**:
- Profile global for personal info
- 4 new collections (Projects, Experiences, Skills, Gallery)
- 10 homepage sections
- Project detail pages
- Sticky header with section navigation
- GitHub contribution calendar integration

---

## 2. Prerequisites

### 2.1 Required Dependencies (Already Installed)
- Payload CMS 3.68.2
- @payloadcms/richtext-lexical
- @payloadcms/db-mongodb
- Next.js 15.4.8
- React 19.2.1
- tRPC 11.7.2
- TanStack Query 5
- Tailwind CSS 4.1.17
- COSS UI (50+ components in src/components/ui/)
- Lucide React icons

### 2.2 Dependencies to Install
```bash
pnpm add react-github-calendar date-fns
```

### 2.3 External Documentation
- **react-github-calendar**: https://grubersjoe.github.io/react-github-calendar/
- **Payload CMS Globals**: https://payloadcms.com/docs/configuration/globals
- **Payload CMS Collections**: https://payloadcms.com/docs/configuration/collections
- **Payload CMS Hooks**: https://payloadcms.com/docs/hooks/overview
- **tRPC Server Components**: https://trpc.io/docs/client/tanstack-react-query/server-components

---

## 3. Reference Projects (COPY FROM THESE)

**CRITICAL**: Always copy from reference projects first, then adapt minimally per INITIAL.md Principle #4.

| Reference | Path | What to Copy |
|-----------|------|--------------|
| **website** (Payload Official) | `example/website/src/` | Access control, revalidation hooks, collection patterns, live preview |
| **doctor-raj** | `example/doctor-raj/src/` | tRPC routers, Services collection, RenderBlocks pattern |
| **portfolio-site-master** | `example/portfolio-site-master/src/` | FeaturedProjects component, card styling, EXIF gallery |

### 3.1 Key Files to Copy From

**Access Control** (from website):
- `example/website/src/access/authenticatedOrPublished.ts` → Copy for Projects collection
- `example/website/src/access/authenticated.ts` → Already exists in project

**Revalidation Hooks** (from website):
- `example/website/src/collections/Pages/hooks/revalidatePage.ts` → Pattern for revalidateProfile, revalidateProject

**Collection Configuration** (from website):
- `example/website/src/collections/Pages/index.ts` → Pattern for Projects collection with versions, hooks

**tRPC Routers** (from doctor-raj):
- `example/doctor-raj/src/trpc/routers/services.ts` → Pattern for projects, experiences, skills routers

---

## 4. Owner Details (Hardcode in seed data)

| Item | Value |
|------|-------|
| Name | srjay |
| Website | srjay.com |
| GitHub | srjaykikani |
| Twitter/X | @_srjay |
| Instagram | @_srjay |
| LinkedIn | srjaykikani |

---

## 5. Implementation Tasks (Sequential Order)

### Phase 1: Dependencies & Infrastructure

#### Task 1.1: Install Dependencies
```bash
pnpm add react-github-calendar date-fns
```

#### Task 1.2: Create authenticatedOrPublished Access Control
**File**: `src/payload/access/authenticatedOrPublished.ts`
**Copy From**: `example/website/src/access/authenticatedOrPublished.ts`

```typescript
import type { Access } from 'payload'

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
```

---

### Phase 2: Payload CMS - Globals & Collections

#### Task 2.1: Create Profile Global
**File**: `src/payload/globals/Profile/config.ts`

```typescript
import type { GlobalConfig } from 'payload'

export const Profile: GlobalConfig = {
  slug: 'profile',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: 'srjay',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title or tagline',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      admin: {
        description: 'About section content',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main profile photo',
      },
    },
    {
      name: 'photos',
      type: 'array',
      label: 'Gallery Photos',
      maxRows: 5,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      admin: {
        description: 'Photos for hero gallery (3-5 images)',
        initCollapsed: true,
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'City, Country',
      },
    },
    {
      name: 'timezone',
      type: 'text',
      admin: {
        description: 'e.g., Asia/Kolkata',
      },
    },
    {
      name: 'github',
      type: 'text',
      defaultValue: 'srjaykikani',
      admin: {
        description: 'GitHub username (for contribution calendar)',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'GitHub', value: 'github' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Email', value: 'email' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          admin: {
            description: 'Display label (optional)',
          },
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'resumeUrl',
      type: 'text',
      admin: {
        description: 'Link to resume/CV PDF',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          const { revalidatePath, revalidateTag } = await import('next/cache')
          payload.logger.info('Revalidating profile global')
          revalidatePath('/')
          revalidateTag('global_profile')
        }
      },
    ],
  },
}
```

#### Task 2.2: Create Projects Collection
**File**: `src/payload/collections/Projects.ts`
**Copy Pattern From**: `example/website/src/collections/Pages/index.ts`

```typescript
import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { CollectionGroups } from '../shared/collection-groups'
import { revalidatePath, revalidateTag } from 'next/cache'

const revalidateProject = async ({ doc, previousDoc, req: { payload, context } }: any) => {
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
}

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
    afterChange: [revalidateProject],
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
```

#### Task 2.3: Create Experiences Collection
**File**: `src/payload/collections/Experiences.ts`

```typescript
import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { CollectionGroups } from '../shared/collection-groups'
import { revalidatePath, revalidateTag } from 'next/cache'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['company', 'title', 'startDate', 'order', 'updatedAt'],
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
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title',
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
      name: 'website',
      type: 'text',
      admin: {
        description: 'Company website URL',
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
          payload.logger.info('Revalidating experiences')
          revalidatePath('/')
          revalidateTag('experiences')
        }
      },
    ],
  },
  timestamps: true,
}
```

#### Task 2.4: Create Skills Collection
**File**: `src/payload/collections/Skills.ts`

```typescript
import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { CollectionGroups } from '../shared/collection-groups'
import { revalidatePath, revalidateTag } from 'next/cache'

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
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Icon identifier (lucide icon name or devicon class)',
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
```

#### Task 2.5: Create Gallery Collection (Optional)
**File**: `src/payload/collections/Gallery.ts`

```typescript
import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { CollectionGroups } from '../shared/collection-groups'
import { revalidatePath, revalidateTag } from 'next/cache'

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
```

#### Task 2.6: Update Payload Config
**File**: `src/payload.config.ts`

Add imports and register new globals/collections:
```typescript
// Add to imports
import { Profile } from './payload/globals/Profile/config'
import { Projects } from './payload/collections/Projects'
import { Experiences } from './payload/collections/Experiences'
import { Skills } from './payload/collections/Skills'
import { Gallery } from './payload/collections/Gallery'

// Update collections array
collections: [Users, Media, Projects, Experiences, Skills, Gallery],

// Update globals array
globals: [Header, Footer, Profile],
```

#### Task 2.7: Regenerate Types
```bash
pnpm generate:types
```

---

### Phase 3: tRPC Routers

#### Task 3.1: Create Projects Router
**File**: `src/trpc/routers/projects.ts`
**Copy Pattern From**: `example/doctor-raj/src/trpc/routers/services.ts`

```typescript
import { z } from 'zod'
import { baseProcedure, createTRPCRouter } from '../init'
import { getPayload } from 'payload'
import config from '@payload-config'
import { TRPCError } from '@trpc/server'

export const projectsRouter = createTRPCRouter({
  getBySlug: baseProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayload({ config })
      const { docs } = await payload.find({
        collection: 'projects',
        where: { slug: { equals: input.slug } },
        depth: 2,
        limit: 1,
      })

      if (!docs[0]) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Project with slug "${input.slug}" not found`,
        })
      }

      return docs[0]
    }),

  getFeatured: baseProcedure.query(async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'projects',
      where: { featured: { equals: true } },
      sort: '-order',
      depth: 1,
      limit: 10,
    })
    return docs
  }),

  getAll: baseProcedure.query(async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'projects',
      sort: '-order',
      depth: 1,
      limit: 50,
    })
    return docs
  }),
})
```

#### Task 3.2: Create Experiences Router
**File**: `src/trpc/routers/experiences.ts`

```typescript
import { baseProcedure, createTRPCRouter } from '../init'
import { getPayload } from 'payload'
import config from '@payload-config'

export const experiencesRouter = createTRPCRouter({
  getAll: baseProcedure.query(async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'experiences',
      sort: '-order',
      depth: 1,
      limit: 20,
    })
    return docs
  }),
})
```

#### Task 3.3: Create Skills Router
**File**: `src/trpc/routers/skills.ts`

```typescript
import { baseProcedure, createTRPCRouter } from '../init'
import { getPayload } from 'payload'
import config from '@payload-config'

export const skillsRouter = createTRPCRouter({
  getAll: baseProcedure.query(async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'skills',
      sort: '-order',
      depth: 0,
      limit: 100,
    })
    return docs
  }),

  getByCategory: baseProcedure.query(async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'skills',
      sort: '-order',
      depth: 0,
      limit: 100,
    })

    // Group by category
    const grouped = docs.reduce(
      (acc, skill) => {
        const category = skill.category || 'other'
        if (!acc[category]) acc[category] = []
        acc[category].push(skill)
        return acc
      },
      {} as Record<string, typeof docs>
    )

    return grouped
  }),
})
```

#### Task 3.4: Create Profile Router
**File**: `src/trpc/routers/profile.ts`

```typescript
import { baseProcedure, createTRPCRouter } from '../init'
import { getPayload } from 'payload'
import config from '@payload-config'

export const profileRouter = createTRPCRouter({
  get: baseProcedure.query(async () => {
    const payload = await getPayload({ config })
    const profile = await payload.findGlobal({
      slug: 'profile',
      depth: 2,
    })
    return profile
  }),
})
```

#### Task 3.5: Update App Router
**File**: `src/trpc/routers/_app.ts`

```typescript
import { z } from 'zod'
import { baseProcedure, createTRPCRouter } from '../init'
import { projectsRouter } from './projects'
import { experiencesRouter } from './experiences'
import { skillsRouter } from './skills'
import { profileRouter } from './profile'

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return { greeting: `hello ${input.text}` }
    }),
  projects: projectsRouter,
  experiences: experiencesRouter,
  skills: skillsRouter,
  profile: profileRouter,
})

export type AppRouter = typeof appRouter
```

---

### Phase 4: Homepage Sections

#### Task 4.1: Create Section Components Directory
```bash
mkdir -p src/components/sections
mkdir -p src/components/shared
```

#### Task 4.2: Create SectionTitle Component
**File**: `src/components/shared/SectionTitle.tsx`

```typescript
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function SectionTitle({ children, className, id }: SectionTitleProps) {
  return (
    <h2
      id={id}
      className={cn(
        'text-lg font-semibold text-foreground mb-6',
        className
      )}
    >
      {children}
    </h2>
  )
}
```

#### Task 4.3: Create HeroSection
**File**: `src/components/sections/HeroSection.tsx`
**Reference**: braydoncoyer.dev (multiple photos + name)

```typescript
import Image from 'next/image'
import type { Profile, Media } from '@/payload-types'

interface HeroSectionProps {
  profile: Profile
}

export function HeroSection({ profile }: HeroSectionProps) {
  const photos = profile.photos || []

  return (
    <section id="hero" className="py-16">
      {/* Photo Gallery */}
      {photos.length > 0 && (
        <div className="flex gap-4 mb-8 justify-center">
          {photos.slice(0, 5).map((photo, index) => {
            const image = photo.image as Media
            if (!image?.url) return null

            return (
              <div
                key={index}
                className={cn(
                  'relative overflow-hidden rounded-2xl',
                  index === 0 ? 'w-24 h-24' : 'w-20 h-20',
                  'bg-muted'
                )}
              >
                <Image
                  src={image.url}
                  alt={image.alt || `Photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80px, 96px"
                />
              </div>
            )
          })}
        </div>
      )}

      {/* Name */}
      <h1 className="text-4xl font-bold text-foreground mb-2 text-center">
        {profile.name}
      </h1>

      {/* Title/Tagline */}
      {profile.title && (
        <p className="text-xl text-muted-foreground text-center">
          {profile.title}
        </p>
      )}
    </section>
  )
}
```

#### Task 4.4: Create OverviewSection
**File**: `src/components/sections/OverviewSection.tsx`
**Reference**: chanhdai.com (job, location, time)

```typescript
'use client'

import { useEffect, useState } from 'react'
import { MapPin, Clock, Briefcase } from 'lucide-react'
import type { Profile } from '@/payload-types'

interface OverviewSectionProps {
  profile: Profile
}

export function OverviewSection({ profile }: OverviewSectionProps) {
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      if (profile.timezone) {
        const time = new Date().toLocaleTimeString('en-US', {
          timeZone: profile.timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        setCurrentTime(time)
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [profile.timezone])

  return (
    <section id="overview" className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {profile.title && (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Briefcase className="w-5 h-5" />
            <span>{profile.title}</span>
          </div>
        )}

        {profile.location && (
          <div className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="w-5 h-5" />
            <span>{profile.location}</span>
          </div>
        )}

        {currentTime && (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span>{currentTime} local time</span>
          </div>
        )}
      </div>
    </section>
  )
}
```

#### Task 4.5: Create SocialLinksSection
**File**: `src/components/sections/SocialLinksSection.tsx`
**Reference**: chanhdai.com (2-col grid)

```typescript
import { Github, Twitter, Instagram, Linkedin, Youtube, Mail, ExternalLink } from 'lucide-react'
import type { Profile } from '@/payload-types'
import { Card, CardPanel } from '@/components/ui/card'

interface SocialLinksSectionProps {
  profile: Profile
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  email: Mail,
}

export function SocialLinksSection({ profile }: SocialLinksSectionProps) {
  const socialLinks = profile.socialLinks || []

  if (socialLinks.length === 0) return null

  return (
    <section id="social" className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialLinks.map((link, index) => {
          const Icon = iconMap[link.platform] || ExternalLink
          const label = link.label || link.platform

          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="transition-shadow hover:shadow-sm">
                <CardPanel className="flex items-center gap-4 py-4">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-foreground font-medium capitalize">
                    {label}
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardPanel>
              </Card>
            </a>
          )
        })}
      </div>
    </section>
  )
}
```

#### Task 4.6: Create AboutSection
**File**: `src/components/sections/AboutSection.tsx`

```typescript
import { SectionTitle } from '@/components/shared/SectionTitle'
import { Card, CardPanel } from '@/components/ui/card'
import { RichText } from '@/components/RichText'
import type { Profile } from '@/payload-types'

interface AboutSectionProps {
  profile: Profile
}

export function AboutSection({ profile }: AboutSectionProps) {
  if (!profile.bio) return null

  return (
    <section id="about" className="py-8">
      <SectionTitle>About</SectionTitle>
      <Card>
        <CardPanel>
          <RichText data={profile.bio} />
        </CardPanel>
      </Card>
    </section>
  )
}
```

#### Task 4.7: Create GitHubSection
**File**: `src/components/sections/GitHubSection.tsx`
**Reference**: victoreke.com (contribution calendar)

```typescript
'use client'

import GitHubCalendar from 'react-github-calendar'
import { useTheme } from '@/providers/Theme'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { Card, CardPanel } from '@/components/ui/card'

interface GitHubSectionProps {
  username: string
}

export function GitHubSection({ username }: GitHubSectionProps) {
  const { theme } = useTheme()

  if (!username) return null

  return (
    <section id="github" className="py-8">
      <SectionTitle>GitHub Activity</SectionTitle>
      <Card>
        <CardPanel className="overflow-x-auto">
          <GitHubCalendar
            username={username}
            colorScheme={theme === 'dark' ? 'dark' : 'light'}
            fontSize={12}
            blockSize={12}
            blockMargin={4}
          />
        </CardPanel>
      </Card>
    </section>
  )
}
```

#### Task 4.8: Create TechStackSection
**File**: `src/components/sections/TechStackSection.tsx`
**Reference**: portfolio-site-master (icon grid)

```typescript
import { SectionTitle } from '@/components/shared/SectionTitle'
import { Card, CardPanel } from '@/components/ui/card'
import { Tooltip, TooltipTrigger, TooltipPopup, TooltipProvider } from '@/components/ui/tooltip'
import type { Skill } from '@/payload-types'

interface TechStackSectionProps {
  skills: Skill[]
}

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools',
  other: 'Other',
}

export function TechStackSection({ skills }: TechStackSectionProps) {
  if (skills.length === 0) return null

  // Group by category
  const grouped = skills.reduce(
    (acc, skill) => {
      const category = skill.category || 'other'
      if (!acc[category]) acc[category] = []
      acc[category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>
  )

  return (
    <section id="stack" className="py-8">
      <SectionTitle>Tech Stack</SectionTitle>
      <TooltipProvider>
        <div className="space-y-6">
          {Object.entries(grouped).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                {categoryLabels[category] || category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <Tooltip key={skill.id}>
                    <TooltipTrigger asChild>
                      <a
                        href={skill.url || '#'}
                        target={skill.url ? '_blank' : undefined}
                        rel={skill.url ? 'noopener noreferrer' : undefined}
                        className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-accent transition-colors"
                      >
                        {skill.name}
                      </a>
                    </TooltipTrigger>
                    <TooltipPopup>{skill.name}</TooltipPopup>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TooltipProvider>
    </section>
  )
}
```

#### Task 4.9: Create ExperienceSection
**File**: `src/components/sections/ExperienceSection.tsx`
**Reference**: chanhdai.com (timeline)

```typescript
import Image from 'next/image'
import { format } from 'date-fns'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { Card, CardPanel } from '@/components/ui/card'
import { RichText } from '@/components/RichText'
import type { Experience, Media } from '@/payload-types'

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (experiences.length === 0) return null

  return (
    <section id="experience" className="py-8">
      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-4">
        {experiences.map((experience) => {
          const logo = experience.logo as Media | undefined

          const startDate = experience.startDate
            ? format(new Date(experience.startDate), 'MMM yyyy')
            : ''
          const endDate = experience.endDate
            ? format(new Date(experience.endDate), 'MMM yyyy')
            : 'Present'

          return (
            <Card key={experience.id}>
              <CardPanel className="flex gap-4">
                {logo?.url && (
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={logo.url}
                      alt={logo.alt || experience.company}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {experience.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {experience.website ? (
                          <a
                            href={experience.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {experience.company}
                          </a>
                        ) : (
                          experience.company
                        )}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {startDate} - {endDate}
                    </span>
                  </div>

                  {experience.description && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <RichText data={experience.description} />
                    </div>
                  )}
                </div>
              </CardPanel>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
```

#### Task 4.10: Create ProjectsSection
**File**: `src/components/sections/ProjectsSection.tsx`
**Reference**: chanhdai.com (collapsible list)

```typescript
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { Card, CardPanel } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Project, Media } from '@/payload-types'

interface ProjectsSectionProps {
  projects: Project[]
}

const INITIAL_SHOW = 3

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [showAll, setShowAll] = useState(false)

  if (projects.length === 0) return null

  const displayedProjects = showAll ? projects : projects.slice(0, INITIAL_SHOW)
  const hasMore = projects.length > INITIAL_SHOW

  return (
    <section id="projects" className="py-8">
      <SectionTitle>Projects</SectionTitle>
      <div className="space-y-4">
        {displayedProjects.map((project) => {
          const image = project.image as Media | undefined
          const tags = project.tags || []

          return (
            <Card key={project.id} className="overflow-hidden">
              <Link href={`/projects/${project.slug}`} className="block group">
                <CardPanel className="flex gap-4">
                  {image?.url && (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={image.url}
                        alt={image.alt || project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    {project.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {project.description}
                      </p>
                    )}

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {tags.slice(0, 4).map((tagItem, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 text-xs rounded bg-secondary text-secondary-foreground"
                          >
                            {tagItem.tag}
                          </span>
                        ))}
                        {tags.length > 4 && (
                          <span className="px-2 py-0.5 text-xs text-muted-foreground">
                            +{tags.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <Github className="w-4 h-4 text-muted-foreground" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </a>
                    )}
                  </div>
                </CardPanel>
              </Link>
            </Card>
          )
        })}
      </div>

      {hasMore && (
        <Button
          variant="ghost"
          className="w-full mt-4"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <>
              Show less <ChevronUp className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Show all {projects.length} projects <ChevronDown className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      )}
    </section>
  )
}
```

#### Task 4.11: Create ContactSection
**File**: `src/components/sections/ContactSection.tsx`

```typescript
import { Mail } from 'lucide-react'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { Card, CardPanel } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Profile } from '@/payload-types'

interface ContactSectionProps {
  profile: Profile
}

export function ContactSection({ profile }: ContactSectionProps) {
  if (!profile.email) return null

  return (
    <section id="contact" className="py-8">
      <SectionTitle>Contact</SectionTitle>
      <Card>
        <CardPanel className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Interested in working together? Get in touch.
          </p>
          <Button asChild>
            <a href={`mailto:${profile.email}`}>
              <Mail className="w-4 h-4 mr-2" />
              {profile.email}
            </a>
          </Button>
        </CardPanel>
      </Card>
    </section>
  )
}
```

---

### Phase 5: Update Homepage

#### Task 5.1: Update Homepage
**File**: `src/app/(frontend)/page.tsx`

```typescript
import { getPayload } from 'payload'
import config from '@payload-config'
import { HeroSection } from '@/components/sections/HeroSection'
import { OverviewSection } from '@/components/sections/OverviewSection'
import { SocialLinksSection } from '@/components/sections/SocialLinksSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { GitHubSection } from '@/components/sections/GitHubSection'
import { TechStackSection } from '@/components/sections/TechStackSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Fetch all data in parallel
  const [profile, projects, experiences, skills] = await Promise.all([
    payload.findGlobal({
      slug: 'profile',
      depth: 2,
    }),
    payload.find({
      collection: 'projects',
      where: { featured: { equals: true } },
      sort: '-order',
      depth: 1,
      limit: 10,
    }),
    payload.find({
      collection: 'experiences',
      sort: '-order',
      depth: 1,
      limit: 20,
    }),
    payload.find({
      collection: 'skills',
      sort: '-order',
      depth: 0,
      limit: 100,
    }),
  ])

  return (
    <main className="container max-w-3xl mx-auto px-4 py-16">
      <HeroSection profile={profile} />
      <OverviewSection profile={profile} />
      <SocialLinksSection profile={profile} />
      <AboutSection profile={profile} />
      <GitHubSection username={profile.github || 'srjaykikani'} />
      <TechStackSection skills={skills.docs} />
      <ExperienceSection experiences={experiences.docs} />
      <ProjectsSection projects={projects.docs} />
      <ContactSection profile={profile} />
    </main>
  )
}
```

---

### Phase 6: Update Header with Sticky Navigation

#### Task 6.1: Update Header Component
**File**: `src/components/Header/Component.client.tsx`

Add section navigation links to the header with scroll-to-section functionality and sticky behavior.

```typescript
// Add these nav items
const sectionLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

// Add sticky behavior
<header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
```

---

### Phase 7: Project Detail Page

#### Task 7.1: Create Project Detail Page
**File**: `src/app/(frontend)/projects/[slug]/page.tsx`
**Copy Pattern From**: `example/website/src/app/(frontend)/[slug]/page.tsx`

```typescript
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import type { Metadata } from 'next'
import { RichText } from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { Project, Media } from '@/payload-types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    depth: 0,
    limit: 100,
    pagination: false,
  })

  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
  })

  const project = docs[0]
  if (!project) return {}

  return {
    title: project.meta?.title || project.title,
    description: project.meta?.description || project.description,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  const project = docs[0] as Project | undefined
  if (!project) notFound()

  const image = project.image as Media | undefined
  const tags = project.tags || []

  return (
    <main className="container max-w-3xl mx-auto px-4 py-16">
      <Link
        href="/#projects"
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to projects
      </Link>

      {image?.url && (
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted mb-8">
          <Image
            src={image.url}
            alt={image.alt || project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl font-bold text-foreground mb-4">{project.title}</h1>

      {project.description && (
        <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tagItem, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm rounded-lg bg-secondary text-secondary-foreground"
            >
              {tagItem.tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-4 mb-8">
        {project.liveUrl && (
          <Button asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button variant="outline" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Source Code
            </a>
          </Button>
        )}
      </div>

      {project.content && (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <RichText data={project.content} />
        </div>
      )}
    </main>
  )
}
```

---

## 6. Validation Gates

### 6.1 Type Checking
```bash
pnpm check-types
```
**Expected**: Zero errors

### 6.2 Linting
```bash
pnpm lint
```
**Expected**: Zero errors

### 6.3 Generate Types After Schema Changes
```bash
pnpm generate:types
```
**Expected**: Updated `payload-types.ts` with Profile, Project, Experience, Skill, Gallery types

### 6.4 Development Server
```bash
pnpm dev
```
**Expected**: Server starts on port 3000 without errors

### 6.5 Admin Panel Verification
1. Navigate to `/admin`
2. Verify Profile global appears in sidebar
3. Verify Projects, Experiences, Skills, Gallery collections appear
4. Create test data in Profile global
5. Create test projects, experiences, skills

### 6.6 Homepage Verification
1. Navigate to `/`
2. Verify all 10 sections render
3. Test GitHub calendar loads (may take a few seconds)
4. Test theme toggle works
5. Test section navigation scrolls smoothly

### 6.7 Project Detail Verification
1. Create a test project with slug "test-project"
2. Navigate to `/projects/test-project`
3. Verify content renders correctly
4. Verify back button works

### 6.8 Mobile Responsiveness
1. Test homepage on mobile viewport (375px)
2. Verify all sections stack properly
3. Verify touch interactions work

---

## 7. Design Tokens Reference

Use COSS UI tokens from INITIAL.md:

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `bg-background` | white | zinc-950 | Page background |
| `bg-card` | white | zinc-900/80 | Card surfaces |
| `text-foreground` | zinc-900 | zinc-100 | Primary text |
| `text-muted-foreground` | zinc-600 | zinc-400 | Subtle text |
| `bg-secondary` | black/4% | white/6% | Tags, badges |
| `border` | black/12% | white/12% | Card borders |
| `rounded-2xl` | 18px | - | Cards, images |
| `shadow-xs` | 0 1px 2px | - | Card shadows |

---

## 8. Files to Create/Modify Summary

### New Files (22 total)
```
src/payload/access/authenticatedOrPublished.ts
src/payload/globals/Profile/config.ts
src/payload/collections/Projects.ts
src/payload/collections/Experiences.ts
src/payload/collections/Skills.ts
src/payload/collections/Gallery.ts
src/trpc/routers/projects.ts
src/trpc/routers/experiences.ts
src/trpc/routers/skills.ts
src/trpc/routers/profile.ts
src/components/shared/SectionTitle.tsx
src/components/sections/HeroSection.tsx
src/components/sections/OverviewSection.tsx
src/components/sections/SocialLinksSection.tsx
src/components/sections/AboutSection.tsx
src/components/sections/GitHubSection.tsx
src/components/sections/TechStackSection.tsx
src/components/sections/ExperienceSection.tsx
src/components/sections/ProjectsSection.tsx
src/components/sections/ContactSection.tsx
src/app/(frontend)/projects/[slug]/page.tsx
```

### Modified Files (4 total)
```
src/payload.config.ts (add collections, globals)
src/trpc/routers/_app.ts (add routers)
src/app/(frontend)/page.tsx (replace with sections)
src/components/Header/Component.client.tsx (add sticky nav)
package.json (add dependencies)
```

---

## 9. Error Handling

### Common Issues and Solutions

1. **Type errors after adding collections**:
   - Run `pnpm generate:types` to regenerate Payload types
   - Restart dev server after schema changes

2. **GitHub calendar not loading**:
   - Verify username is correct (srjaykikani)
   - Check browser console for CORS errors
   - Component requires client-side rendering ('use client')

3. **Images not loading**:
   - Check `depth` parameter in Payload queries (should be at least 1)
   - Verify Media collection has proper upload configuration
   - Check image URL is being resolved correctly

4. **tRPC queries returning null**:
   - Verify collection access rules allow public read
   - Check where clause syntax
   - Verify collection slug matches

5. **Revalidation not working**:
   - Check `context.disableRevalidate` is being checked
   - Verify revalidatePath/revalidateTag imports
   - Check Payload hooks are registered

---

## 10. Quality Checklist

- [ ] All necessary context included
- [ ] Validation gates are executable
- [ ] References existing patterns from codebase
- [ ] References patterns from doctor-raj and website templates
- [ ] Clear implementation path with code examples
- [ ] Error handling documented
- [ ] Design tokens from COSS UI documented
- [ ] File structure clearly defined
- [ ] Mobile responsiveness considered
- [ ] Dark mode support via theme provider

---

## Confidence Score: 9/10

**Rationale**:
- Complete code examples for all collections, globals, and components
- Follows established patterns from reference projects (website, doctor-raj)
- Uses existing COSS UI components (Card, Button, Tooltip)
- Clear validation gates that can be executed
- Design tokens match INITIAL.md specifications

**Risk Mitigation**:
- Run `pnpm check-types` after each phase
- Test each section visually as it's built
- Keep existing homepage until migration is verified
- Test GitHub calendar with actual username early

**Only Uncertainties**:
- RichText component may need adjustment if not already in project
- GitHub calendar styling may need theme-specific tweaks
- Header sticky behavior may need refinement
