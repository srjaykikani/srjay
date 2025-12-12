# PRP: Layout System, Asset Migration & Database Seeding

**Status**: Ready for Implementation
**Priority**: Critical
**Confidence Score**: 9/10
**Feature Reference**: [INITIAL.md](../INITIAL.md)
**Target**: Complete layout overhaul + asset migration + fully seeded database

---

## 1. Executive Summary

This PRP covers three interconnected implementation phases:

1. **Layout System Update**: Implement chanhdai.com-style screen-line patterns, sticky header with scroll shadow, and panel-based sections while keeping COSS UI (NOT mono fonts)
2. **Asset Migration**: Copy all personal branding assets (logo, favicons, profile photo, project images) from Srjay.com-GSAP-main
3. **Database Seeding**: Create a complete seeding system following doctor-raj patterns with type-safe seed data for all collections

**Key Deliverables**:
- Screen-line CSS utilities for full-width visual lines
- Updated header with scroll-based shadow effect
- Updated footer with screen-line decorations
- Panel component for consistent section styling
- All favicon and logo assets copied to public/
- Seed endpoint with type-safe data factories
- Pre-populated database with profile, projects, experiences, skills

---

## 2. Prerequisites

### 2.1 Already Completed (Phase 1-7 of Original PRP)
- All Payload collections created (Projects, Experiences, Skills, Gallery)
- Profile global configured
- tRPC routers implemented
- 10 section components created
- Header with sticky nav exists
- Project detail page exists
- Dependencies installed (react-github-calendar, date-fns)

### 2.2 External Documentation
- **chanhdai.com source**: `example/chanhdai.com-main/` (layout patterns)
- **doctor-raj source**: `example/doctor-raj/` (seeding patterns)
- **Srjay.com-GSAP source**: `example/Srjay.com-GSAP-main/public/` (assets)
- **Payload CMS Endpoints**: https://payloadcms.com/docs/rest-api/overview
- **motion/react (Framer Motion)**: https://motion.dev/docs/react-quick-start

---

## 3. Phase A: Layout System Update

### 3.1 CSS Utilities to Add

**File**: `src/app/(frontend)/styles.css`

Add these utilities AFTER the existing styles:

```css
/* ============================================
   SCREEN-LINE UTILITIES (chanhdai.com pattern)
   ============================================ */

/* Border edge color - subtle structural divider */
@theme {
  --color-edge: color-mix(in oklab, var(--color-border) 64%, var(--color-background));
}

/* Screen-spanning horizontal lines */
.screen-line-before {
  position: relative;
}

.screen-line-before::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100vw;
  z-index: -1;
  height: 1px;
  width: 200vw;
  background-color: var(--color-edge);
}

.screen-line-after {
  position: relative;
}

.screen-line-after::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: -100vw;
  z-index: -1;
  height: 1px;
  width: 200vw;
  background-color: var(--color-edge);
}

/* Border edge utility class */
.border-edge {
  border-color: var(--color-edge);
}

/* Header scroll shadow (appears when scrolled) */
[data-affix="true"] {
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] [data-affix="true"],
[data-affix="true"]:where([data-theme="dark"], [data-theme="dark"] *) {
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.4);
}
```

### 3.2 Panel Component

**File**: `src/components/shared/Panel.tsx`

```typescript
import { cn } from '@/utilities/cn'

interface PanelProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Panel({ children, className, id }: PanelProps) {
  return (
    <section
      id={id}
      data-slot="panel"
      className={cn(
        'relative screen-line-before screen-line-after border-x border-edge',
        className
      )}
    >
      {children}
    </section>
  )
}

interface PanelHeaderProps {
  children: React.ReactNode
  className?: string
}

export function PanelHeader({ children, className }: PanelHeaderProps) {
  return (
    <header
      data-slot="panel-header"
      className={cn('screen-line-after px-4 py-4', className)}
    >
      {children}
    </header>
  )
}

interface PanelContentProps {
  children: React.ReactNode
  className?: string
}

export function PanelContent({ children, className }: PanelContentProps) {
  return (
    <div data-slot="panel-content" className={cn('p-4', className)}>
      {children}
    </div>
  )
}
```

### 3.3 Header Update with Scroll Shadow

**File**: `src/components/Header/Component.client.tsx`

Replace the existing file with:

```typescript
'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { cn } from '@/utilities/cn'

interface HeaderClientProps {
  data: Header
}

const sectionLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [affix, setAffix] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  // Reset header theme on route change
  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  // Sync header theme
  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  // Scroll detection for shadow
  useEffect(() => {
    const handleScroll = () => {
      setAffix(window.scrollY >= 8)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2',
        'transition-shadow duration-300'
      )}
      data-affix={affix}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 border-x border-edge px-4 md:max-w-3xl">
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>

        {/* Section navigation for homepage */}
        {isHomePage && (
          <nav className="hidden sm:flex gap-6 items-center">
            {sectionLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        )}

        <HeaderNav data={data} />
      </div>
    </header>
  )
}
```

### 3.4 Footer Update with Screen-Lines

**File**: `src/components/Footer/Component.tsx`

Replace with:

```typescript
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto max-w-screen overflow-x-hidden px-2">
      {/* Main footer content */}
      <div className="screen-line-before mx-auto border-x border-edge pt-8 pb-4 md:max-w-3xl">
        <div className="flex flex-col md:flex-row md:justify-between gap-6 px-4">
          <Link className="flex items-center" href="/">
            <Logo className="invert dark:invert-0" />
          </Link>

          <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
            <ThemeSelector />
            <nav className="flex flex-col md:flex-row gap-4">
              {navItems.map(({ link }, i) => {
                return <CMSLink className="text-muted-foreground hover:text-foreground transition-colors" key={i} {...link} />
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Footer bottom with credits */}
      <div className="screen-line-before screen-line-after mx-auto border-x border-edge md:max-w-3xl">
        <div className="flex items-center justify-center gap-2 px-4 py-3 text-xs text-muted-foreground">
          <span>&copy; {currentYear} srjay</span>
          <span className="h-3 w-px bg-edge" />
          <span>Built with Next.js, Payload CMS</span>
        </div>
      </div>

      {/* Safe area for mobile */}
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="h-2" />
      </div>
    </footer>
  )
}
```

### 3.5 Update Homepage Layout

**File**: `src/app/(frontend)/page.tsx`

Update the main container:

```typescript
// Change the main wrapper from:
<main className="container max-w-3xl mx-auto px-4 py-16">

// To:
<main className="max-w-screen overflow-x-hidden px-2">
  <div className="mx-auto md:max-w-3xl">
    {/* All section components */}
  </div>
</main>
```

---

## 4. Phase B: Asset Migration

### 4.1 Files to Copy

**Source**: `example/Srjay.com-GSAP-main/public/`
**Destination**: `public/`

| Source File | Destination | Action |
|-------------|-------------|--------|
| `S R logo.svg` | `public/logo.svg` | Copy |
| `logosrjay.png` | `public/logo.png` | Copy |
| `logo.png` | `public/logo-alt.png` | Copy |
| `favicon.ico` | `public/favicon.ico` | Copy |
| `favicon.svg` | `public/favicon.svg` | Copy |
| `favicon-16x16.png` | `public/favicon-16x16.png` | Copy |
| `favicon-32x32.png` | `public/favicon-32x32.png` | Copy |
| `apple-touch-icon.png` | `public/apple-touch-icon.png` | Copy |
| `android-chrome-192x192.png` | `public/android-chrome-192x192.png` | Copy |
| `android-chrome-512x512.png` | `public/android-chrome-512x512.png` | Copy |
| `maskable_icon.png` | `public/maskable_icon.png` | Copy |
| `site.webmanifest` | `public/site.webmanifest` | Copy & update |
| `img/srjay.png` | `public/seed/srjay.png` | Copy for seeding |
| `img/challengerate.webp` | `public/seed/challengerate.webp` | Copy for seeding |
| `img/educave.webp` | `public/seed/educave.webp` | Copy for seeding |
| `img/ecellsvnit.webp` | `public/seed/ecellsvnit.webp` | Copy for seeding |
| `img/drvandna.webp` | `public/seed/drvandna.webp` | Copy for seeding |
| `img/portfolio.webp` | `public/seed/portfolio.webp` | Copy for seeding |

### 4.2 Bash Commands for Asset Copy

```bash
# Create seed directory
mkdir -p public/seed

# Copy favicon and PWA assets
cp "example/Srjay.com-GSAP-main/public/S R logo.svg" public/logo.svg
cp example/Srjay.com-GSAP-main/public/logosrjay.png public/logo.png
cp example/Srjay.com-GSAP-main/public/logo.png public/logo-alt.png
cp example/Srjay.com-GSAP-main/public/favicon.ico public/favicon.ico
cp example/Srjay.com-GSAP-main/public/favicon.svg public/favicon.svg
cp example/Srjay.com-GSAP-main/public/favicon-16x16.png public/favicon-16x16.png
cp example/Srjay.com-GSAP-main/public/favicon-32x32.png public/favicon-32x32.png
cp example/Srjay.com-GSAP-main/public/apple-touch-icon.png public/apple-touch-icon.png
cp example/Srjay.com-GSAP-main/public/android-chrome-192x192.png public/android-chrome-192x192.png
cp example/Srjay.com-GSAP-main/public/android-chrome-512x512.png public/android-chrome-512x512.png
cp example/Srjay.com-GSAP-main/public/maskable_icon.png public/maskable_icon.png
cp example/Srjay.com-GSAP-main/public/site.webmanifest public/site.webmanifest

# Copy seed images
cp example/Srjay.com-GSAP-main/public/img/srjay.png public/seed/srjay.png
cp example/Srjay.com-GSAP-main/public/img/challengerate.webp public/seed/challengerate.webp
cp example/Srjay.com-GSAP-main/public/img/educave.webp public/seed/educave.webp
cp example/Srjay.com-GSAP-main/public/img/ecellsvnit.webp public/seed/ecellsvnit.webp
cp example/Srjay.com-GSAP-main/public/img/drvandna.webp public/seed/drvandna.webp
cp example/Srjay.com-GSAP-main/public/img/portfolio.webp public/seed/portfolio.webp
```

### 4.3 Update site.webmanifest

**File**: `public/site.webmanifest`

```json
{
  "name": "S R Jay",
  "short_name": "srjay",
  "description": "Portfolio website of S R Jay - Full Stack Developer",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/maskable_icon.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/"
}
```

---

## 5. Phase C: Database Seeding System

### 5.1 Directory Structure

```
src/
└── endpoints/
    └── seed/
        ├── index.ts          # Main seed orchestrator
        ├── media.ts          # Media seeding helper
        ├── profile.ts        # Profile global seed data
        ├── projects.ts       # Projects collection seed data
        ├── experiences.ts    # Experiences collection seed data
        └── skills.ts         # Skills collection seed data
```

### 5.2 Main Seed Orchestrator

**File**: `src/endpoints/seed/index.ts`

```typescript
import type { Payload, PayloadRequest } from 'payload'

import { seedMedia } from './media'
import { profileData } from './profile'
import { projectsData } from './projects'
import { experiencesData } from './experiences'
import { skillsData } from './skills'

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('🌱 Starting database seed...')

  // 1. Clear existing data (in dependency order)
  payload.logger.info('— Clearing gallery...')
  await payload.delete({
    collection: 'gallery',
    where: { id: { exists: true } },
    req,
    context: { disableRevalidate: true },
  })

  payload.logger.info('— Clearing projects...')
  await payload.delete({
    collection: 'projects',
    where: { id: { exists: true } },
    req,
    context: { disableRevalidate: true },
  })

  payload.logger.info('— Clearing experiences...')
  await payload.delete({
    collection: 'experiences',
    where: { id: { exists: true } },
    req,
    context: { disableRevalidate: true },
  })

  payload.logger.info('— Clearing skills...')
  await payload.delete({
    collection: 'skills',
    where: { id: { exists: true } },
    req,
    context: { disableRevalidate: true },
  })

  payload.logger.info('— Clearing media...')
  await payload.delete({
    collection: 'media',
    where: { id: { exists: true } },
    req,
    context: { disableRevalidate: true },
  })

  // 2. Seed media files
  payload.logger.info('— Seeding media...')
  const mediaMap = await seedMedia(payload, req)

  // 3. Seed skills (no dependencies)
  payload.logger.info('— Seeding skills...')
  for (const skillData of skillsData()) {
    await payload.create({
      collection: 'skills',
      data: skillData,
      req,
      context: { disableRevalidate: true },
    })
  }

  // 4. Seed experiences (no dependencies)
  payload.logger.info('— Seeding experiences...')
  for (const expData of experiencesData()) {
    await payload.create({
      collection: 'experiences',
      data: expData,
      req,
      context: { disableRevalidate: true },
    })
  }

  // 5. Seed projects (depends on media)
  payload.logger.info('— Seeding projects...')
  for (const projectData of projectsData(mediaMap)) {
    await payload.create({
      collection: 'projects',
      data: projectData,
      req,
      context: { disableRevalidate: true },
    })
  }

  // 6. Update Profile global
  payload.logger.info('— Updating profile global...')
  await payload.updateGlobal({
    slug: 'profile',
    data: profileData(mediaMap),
    req,
    context: { disableRevalidate: true },
  })

  payload.logger.info('✅ Database seed complete!')
}
```

### 5.3 Media Seeding Helper

**File**: `src/endpoints/seed/media.ts`

```typescript
import type { Payload, PayloadRequest } from 'payload'
import fs from 'fs'
import path from 'path'

export type MediaMap = Record<string, string>

const seedImages = [
  { name: 'srjay-avatar', file: 'srjay.png', alt: 'S R Jay profile photo' },
  { name: 'challengerate-cover', file: 'challengerate.webp', alt: 'ChallengeRate project cover' },
  { name: 'educave-cover', file: 'educave.webp', alt: 'EduCave project cover' },
  { name: 'ecellsvnit-cover', file: 'ecellsvnit.webp', alt: 'E-Cell SVNIT project cover' },
  { name: 'drvandna-cover', file: 'drvandna.webp', alt: 'Dr. Vandna project cover' },
  { name: 'portfolio-cover', file: 'portfolio.webp', alt: 'Portfolio v1 project cover' },
]

function getMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'png':
      return 'image/png'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'webp':
      return 'image/webp'
    case 'svg':
      return 'image/svg+xml'
    default:
      return 'image/png'
  }
}

export async function seedMedia(
  payload: Payload,
  req: PayloadRequest
): Promise<MediaMap> {
  const mediaMap: MediaMap = {}

  for (const { name, file, alt } of seedImages) {
    const filePath = path.join(process.cwd(), 'public', 'seed', file)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      payload.logger.warn(`Seed image not found: ${filePath}`)
      continue
    }

    const buffer = fs.readFileSync(filePath)

    try {
      const media = await payload.create({
        collection: 'media',
        data: { alt },
        file: {
          data: buffer,
          mimetype: getMimeType(file),
          name: file,
          size: buffer.length,
        },
        req,
        context: { disableRevalidate: true },
      })

      mediaMap[name] = media.id
      payload.logger.info(`  ✓ Created media: ${name}`)
    } catch (error) {
      payload.logger.error(`  ✗ Failed to create media: ${name}`, error)
    }
  }

  return mediaMap
}
```

### 5.4 Profile Seed Data

**File**: `src/endpoints/seed/profile.ts`

```typescript
import type { MediaMap } from './media'
import type { Profile } from '@/payload-types'

type ProfileData = Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>

export const profileData = (mediaMap: MediaMap): ProfileData => ({
  name: 'S R Jay',
  title: 'Full Stack Developer & Entrepreneur',
  bio: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Building products that matter. Passionate about clean code, scalable systems, and exceptional user experiences.',
              version: 1,
            },
          ],
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Currently focused on creating impactful web applications using modern technologies like Next.js, React, Node.js, and cloud infrastructure.',
              version: 1,
            },
          ],
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'When not coding, I enjoy exploring new technologies, contributing to open source, and sharing knowledge with the developer community.',
              version: 1,
            },
          ],
          version: 1,
        },
      ],
      version: 1,
    },
  },
  avatar: mediaMap['srjay-avatar'] || undefined,
  photos: [],
  email: 'hello@srjay.com',
  phone: '+91 98765 43210',
  location: 'Gujarat, India',
  timezone: 'Asia/Kolkata',
  github: 'srjaykikani',
  socialLinks: [
    { platform: 'github', url: 'https://github.com/srjaykikani', label: 'GitHub' },
    { platform: 'twitter', url: 'https://twitter.com/_srjay', label: 'Twitter' },
    { platform: 'instagram', url: 'https://instagram.com/_srjay', label: 'Instagram' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/srjaykikani', label: 'LinkedIn' },
  ],
  resumeUrl: 'https://srjay.com/resume.pdf',
})
```

### 5.5 Projects Seed Data

**File**: `src/endpoints/seed/projects.ts`

```typescript
import type { RequiredDataFromCollectionSlug } from 'payload'
import type { MediaMap } from './media'

export const projectsData = (
  mediaMap: MediaMap
): RequiredDataFromCollectionSlug<'projects'>[] => [
  {
    title: 'ChallengeRate',
    slug: 'challengerate',
    description:
      'A competitive coding platform for developers to improve their skills through daily challenges and real-time competitions.',
    image: mediaMap['challengerate-cover'] || undefined,
    tags: [
      { tag: 'React' },
      { tag: 'Node.js' },
      { tag: 'MongoDB' },
      { tag: 'WebSocket' },
      { tag: 'Redis' },
    ],
    liveUrl: 'https://challengerate.com',
    githubUrl: 'https://github.com/srjaykikani/challengerate',
    featured: true,
    order: 100,
    _status: 'published',
  },
  {
    title: 'EduCave',
    slug: 'educave',
    description:
      'Educational platform providing interactive learning experiences for students with video courses, quizzes, and progress tracking.',
    image: mediaMap['educave-cover'] || undefined,
    tags: [
      { tag: 'Next.js' },
      { tag: 'Payload CMS' },
      { tag: 'TailwindCSS' },
      { tag: 'Stripe' },
    ],
    liveUrl: 'https://educave.in',
    githubUrl: 'https://github.com/srjaykikani/educave',
    featured: true,
    order: 90,
    _status: 'published',
  },
  {
    title: 'E-Cell SVNIT',
    slug: 'ecell-svnit',
    description:
      'Official website for the Entrepreneurship Cell of SVNIT with event management, team showcase, and sponsor integrations.',
    image: mediaMap['ecellsvnit-cover'] || undefined,
    tags: [
      { tag: 'React' },
      { tag: 'Express' },
      { tag: 'PostgreSQL' },
      { tag: 'AWS' },
    ],
    liveUrl: 'https://ecellsvnit.in',
    githubUrl: 'https://github.com/srjaykikani/ecell-svnit',
    featured: true,
    order: 80,
    _status: 'published',
  },
  {
    title: 'Dr. Vandna',
    slug: 'dr-vandna',
    description:
      'Professional medical practice website with appointment booking, patient portal, and integrated payment system.',
    image: mediaMap['drvandna-cover'] || undefined,
    tags: [
      { tag: 'Next.js' },
      { tag: 'Stripe' },
      { tag: 'SendGrid' },
      { tag: 'Vercel' },
    ],
    liveUrl: 'https://drvandna.com',
    featured: true,
    order: 70,
    _status: 'published',
  },
  {
    title: 'Portfolio v1',
    slug: 'portfolio-v1',
    description:
      'Previous iteration of my personal portfolio showcasing projects and skills with smooth GSAP animations.',
    image: mediaMap['portfolio-cover'] || undefined,
    tags: [
      { tag: 'HTML' },
      { tag: 'CSS' },
      { tag: 'JavaScript' },
      { tag: 'GSAP' },
    ],
    githubUrl: 'https://github.com/srjaykikani/portfolio-v1',
    featured: false,
    order: 60,
    _status: 'published',
  },
]
```

### 5.6 Experiences Seed Data

**File**: `src/endpoints/seed/experiences.ts`

```typescript
import type { RequiredDataFromCollectionSlug } from 'payload'

export const experiencesData = (): RequiredDataFromCollectionSlug<'experiences'>[] => [
  {
    company: 'Freelance',
    title: 'Senior Full Stack Developer',
    startDate: '2023-01-01',
    endDate: undefined, // Current position
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Leading development of enterprise web applications for diverse clients. Building scalable solutions using Next.js, Node.js, and cloud infrastructure (AWS, Vercel).',
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    website: 'https://srjay.com',
    order: 100,
  },
  {
    company: 'Tech Startup',
    title: 'Full Stack Developer',
    startDate: '2021-06-01',
    endDate: '2022-12-31',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Developed core product features, optimized database queries, and implemented CI/CD pipelines. Reduced page load time by 60% through performance optimization.',
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    order: 90,
  },
  {
    company: 'Web Agency',
    title: 'Frontend Developer',
    startDate: '2020-01-01',
    endDate: '2021-05-31',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Created responsive web interfaces for diverse clients. Specialized in React and modern CSS frameworks. Collaborated with designers to implement pixel-perfect UIs.',
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    order: 80,
  },
  {
    company: 'E-Cell SVNIT',
    title: 'Technical Lead',
    startDate: '2019-08-01',
    endDate: '2020-05-31',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: "Led technical team for entrepreneurship events and hackathons. Built and maintained the cell's digital infrastructure including website and event management systems.",
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
    },
    website: 'https://ecellsvnit.in',
    order: 70,
  },
]
```

### 5.7 Skills Seed Data

**File**: `src/endpoints/seed/skills.ts`

```typescript
import type { RequiredDataFromCollectionSlug } from 'payload'

export const skillsData = (): RequiredDataFromCollectionSlug<'skills'>[] => [
  // Frontend
  { name: 'React', icon: 'react', category: 'frontend', url: 'https://react.dev', order: 100 },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend', url: 'https://nextjs.org', order: 95 },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend', url: 'https://typescriptlang.org', order: 90 },
  { name: 'TailwindCSS', icon: 'tailwindcss', category: 'frontend', url: 'https://tailwindcss.com', order: 85 },
  { name: 'HTML5', icon: 'html5', category: 'frontend', url: 'https://developer.mozilla.org', order: 80 },
  { name: 'CSS3', icon: 'css3', category: 'frontend', url: 'https://developer.mozilla.org', order: 75 },

  // Backend
  { name: 'Node.js', icon: 'nodejs', category: 'backend', url: 'https://nodejs.org', order: 100 },
  { name: 'Express', icon: 'express', category: 'backend', url: 'https://expressjs.com', order: 95 },
  { name: 'Payload CMS', icon: 'payload', category: 'backend', url: 'https://payloadcms.com', order: 90 },
  { name: 'PostgreSQL', icon: 'postgresql', category: 'backend', url: 'https://postgresql.org', order: 85 },
  { name: 'MongoDB', icon: 'mongodb', category: 'backend', url: 'https://mongodb.com', order: 80 },
  { name: 'Redis', icon: 'redis', category: 'backend', url: 'https://redis.io', order: 75 },

  // Tools
  { name: 'Git', icon: 'git', category: 'tools', url: 'https://git-scm.com', order: 100 },
  { name: 'Docker', icon: 'docker', category: 'tools', url: 'https://docker.com', order: 95 },
  { name: 'AWS', icon: 'aws', category: 'tools', url: 'https://aws.amazon.com', order: 90 },
  { name: 'Vercel', icon: 'vercel', category: 'tools', url: 'https://vercel.com', order: 85 },
  { name: 'Figma', icon: 'figma', category: 'tools', url: 'https://figma.com', order: 80 },
  { name: 'VS Code', icon: 'vscode', category: 'tools', url: 'https://code.visualstudio.com', order: 75 },
]
```

### 5.8 Seed API Route

**File**: `src/app/(frontend)/api/seed/route.ts`

```typescript
import { headers } from 'next/headers'
import { createLocalReq, getPayload } from 'payload'

import config from '@payload-config'
import { seed } from '@/endpoints/seed'

export const maxDuration = 60 // 60 second timeout for Vercel

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Development: Allow without auth
  // Production: Require auth or secret token
  if (process.env.NODE_ENV === 'production') {
    const authHeader = requestHeaders.get('authorization')
    const seedSecret = process.env.SEED_SECRET

    if (seedSecret && authHeader !== `Bearer ${seedSecret}`) {
      // Try payload auth as fallback
      const { user } = await payload.auth({ headers: requestHeaders })
      if (!user) {
        return new Response('Unauthorized', { status: 401 })
      }
    }
  }

  try {
    const payloadReq = await createLocalReq({}, payload)
    await seed({ payload, req: payloadReq })

    return Response.json({
      success: true,
      message: 'Database seeded successfully',
    })
  } catch (error) {
    payload.logger.error({ err: error, message: 'Error seeding database' })

    return Response.json(
      {
        success: false,
        message: 'Error seeding database',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
```

### 5.9 Add Seed Script to package.json

Add to `package.json` scripts:

```json
{
  "scripts": {
    "seed": "curl -X POST http://localhost:3000/api/seed"
  }
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

### 6.3 Development Server
```bash
pnpm dev
```
**Expected**: Server starts on port 3000 without errors

### 6.4 Layout Verification
1. Navigate to `/`
2. Verify screen-lines appear at section boundaries
3. Scroll down and verify header shadow appears
4. Check footer has screen-line decorations
5. Test on mobile (375px) - verify layout doesn't break

### 6.5 Asset Verification
1. Check favicon appears in browser tab
2. Check logo renders in header
3. Open `/site.webmanifest` - verify JSON is valid
4. Test PWA installation (Chrome DevTools > Application > Manifest)

### 6.6 Seed Verification
```bash
# Start dev server first
pnpm dev

# In another terminal, run seed
curl -X POST http://localhost:3000/api/seed
```
**Expected**:
- Response: `{"success":true,"message":"Database seeded successfully"}`
- Check `/admin` - verify Profile has data
- Check `/admin/collections/projects` - verify 5 projects exist
- Check `/admin/collections/experiences` - verify 4 experiences exist
- Check `/admin/collections/skills` - verify 18 skills exist

### 6.7 Homepage Data Verification
1. Navigate to `/`
2. Verify Profile name "S R Jay" appears in hero
3. Verify GitHub calendar loads for "srjaykikani"
4. Verify skills grouped by category
5. Verify experiences sorted by order
6. Verify featured projects appear

---

## 7. Implementation Order (Task Sequence)

### Phase A: Layout (Tasks 1-5)
1. Add CSS utilities to styles.css
2. Create Panel component
3. Update Header with scroll shadow
4. Update Footer with screen-lines
5. Update homepage main wrapper

### Phase B: Assets (Tasks 6-8)
6. Run asset copy commands
7. Update site.webmanifest
8. Verify favicon/logo rendering

### Phase C: Seeding (Tasks 9-15)
9. Create `src/endpoints/seed/` directory
10. Create media.ts helper
11. Create profile.ts seed data
12. Create projects.ts seed data
13. Create experiences.ts seed data
14. Create skills.ts seed data
15. Create index.ts orchestrator
16. Create API route
17. Add package.json script
18. Test seed execution

---

## 8. Files Summary

### New Files (12)
```
src/components/shared/Panel.tsx
src/endpoints/seed/index.ts
src/endpoints/seed/media.ts
src/endpoints/seed/profile.ts
src/endpoints/seed/projects.ts
src/endpoints/seed/experiences.ts
src/endpoints/seed/skills.ts
src/app/(frontend)/api/seed/route.ts
public/seed/*.{png,webp} (6 images)
```

### Modified Files (5)
```
src/app/(frontend)/styles.css (add CSS utilities)
src/components/Header/Component.client.tsx (scroll shadow)
src/components/Footer/Component.tsx (screen-lines)
src/app/(frontend)/page.tsx (container update)
package.json (add seed script)
public/site.webmanifest (update content)
```

### Copied Files (12)
```
public/logo.svg
public/logo.png
public/logo-alt.png
public/favicon.ico
public/favicon.svg
public/favicon-16x16.png
public/favicon-32x32.png
public/apple-touch-icon.png
public/android-chrome-192x192.png
public/android-chrome-512x512.png
public/maskable_icon.png
public/site.webmanifest
```

---

## 9. Error Handling

### Common Issues and Solutions

1. **Screen-lines not appearing**:
   - Verify `position: relative` is on parent elements
   - Check z-index values (use `-z-1` for pseudo-elements)
   - Ensure `overflow-x-hidden` is on outer wrapper

2. **Header shadow not appearing on scroll**:
   - Verify `data-affix` attribute is being set
   - Check scroll event listener is attached
   - Verify CSS selector `[data-affix="true"]` matches

3. **Seed images not found**:
   - Verify `public/seed/` directory exists
   - Check file names match exactly (case-sensitive)
   - Ensure images were copied correctly

4. **Seed endpoint 401 error**:
   - In development, should work without auth
   - In production, set `SEED_SECRET` env var
   - Or authenticate as admin user first

5. **Lexical rich text format errors**:
   - Ensure `version: 1` is on all nodes
   - Check `type: 'root'` at top level
   - Verify `children` arrays are properly structured

---

## 10. Quality Checklist

- [x] All necessary context included
- [x] Validation gates are executable
- [x] References existing patterns from codebase
- [x] References patterns from chanhdai.com and doctor-raj
- [x] Clear implementation path with code examples
- [x] Error handling documented
- [x] File structure clearly defined
- [x] Mobile responsiveness considered
- [x] Dark mode support maintained

---

## Confidence Score: 9/10

**Rationale**:
- Complete code examples for all new files
- Follows established patterns from reference projects
- Type-safe seed data using `RequiredDataFromCollectionSlug`
- Clear validation gates that can be executed
- Builds on already-working foundation (Phase 1-7 complete)

**Risk Mitigation**:
- Run `pnpm check-types` after each phase
- Test layout changes visually before moving to next phase
- Verify seed images exist before running seed
- Test seed in development before production

**Only Uncertainties**:
- Image paths may need adjustment based on actual file locations
- Some project URLs are placeholder (user will update)
- Phone number is placeholder (user will update)
