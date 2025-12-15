# srjay.com Portfolio - Product Requirements Document

## Core Engineering Principles

These principles OVERRIDE any default behavior and MUST be followed exactly:

1. **NO HARDCODING, EVER**: All solutions must be generic, pattern-based, and work across all commands, not just specific examples.
2. **ROOT CAUSE, NOT BANDAID**: Fix the underlying structural or data lineage issues.
3. **DATA INTEGRITY**: Use consistent, authoritative data sources (Stage 1 raw JSON for table locations, parsed Stage 3 for final command structure).
4. **START FROM A HIGH-QUALITY REFERENCE**: Before building from scratch, check external reference projects. If a file, folder, or snippet from a high-quality reference provides the desired functionality, copy it as the starting point. Then, adapt it with the minimum modifications necessary for the new context.

---

## Product Vision

Build a **pixel-perfect, world-class portfolio** for srjay.com that showcases professional work, skills, and experience. The portfolio must be clean, minimal, and performant - representing the quality expected at the highest level of engineering excellence.

**Target**: A portfolio worthy of a $500k/year senior engineering position.

---

## Owner Details

| Item          | Value       |
| ------------- | ----------- |
| **Name**      | srjay       |
| **Website**   | srjay.com   |
| **GitHub**    | srjaykikani |
| **Twitter/X** | @\_srjay    |
| **Instagram** | @\_srjay    |
| **LinkedIn**  | srjaykikani |

---

## Design Requirements

| Aspect              | Requirement                                                                 | Reference Source                 |
| ------------------- | --------------------------------------------------------------------------- | -------------------------------- |
| **Layout**          | Single-page scroll with distinct sections                                   | chanhdai.com                     |
| **UI Components**   | COSS UI (Base UI primitives) - already installed                            | Current project (50+ components) |
| **Background**      | Clean white/light - no patterns, no diagonal separators                     | Custom                           |
| **Profile Header**  | Photo gallery style with multiple images                                    | braydoncoyer.dev                 |
| **GitHub Activity** | Contribution calendar graph                                                 | victoreke.com                    |
| **Navigation**      | Sticky header with logo, section jump links, theme toggle                   | Custom                           |
| **Visual Style**    | Rounded corners (`rounded-2xl`), soft shadows (`shadow-xs`), subtle borders | portfolio-site-master            |
| **Animations**      | NONE - no animations, simple hover effects only                             | Requirement                      |
| **Responsiveness**  | Mobile-first, works on all devices                                          | Standard                         |
| **Theme**           | Light/dark mode with system preference detection                            | Built-in                         |

---

## Reference Projects - Implementation Priority

### 1. doctor-raj (PRIMARY - Same Stack)

**Location**: `example/doctor-raj`
**Priority**: Copy patterns directly with minimal modification

#### What to Copy:

**Block System Architecture (16 Block Types)**

- HeroBlock - Title, subtitle, links, media
- ServiceCardsBlock - Grid display with relationship to collection
- FeatureBlock - Image + text side-by-side, configurable position
- CTABannerBlock - Full-width with icon, headline, link
- TestimonialsBlock - 2-column cards with avatars
- FAQBlock - Accordion with rich text answers
- TextBlock - Prose-styled rich text
- MediaBlock - Full-width media display
- DividerBlock - Simple separator
- FormBlock - Form builder integration
- BannerBlock - Styled alerts (info/warning/error/success)
- CallToActionBlock - Centered CTA with flexible buttons

**tRPC Router Pattern**

- Pages router: `getBySlug`, `getAll` with proper depth/limit
- Services router: Same pattern for detail pages
- Error handling with descriptive TRPCError messages
- Context with Payload instance + user

**Hero System (3 Variants)**

- HighImpact: Full-width image + centered text + 2 CTAs
- MediumImpact: Side-by-side layout
- LowImpact: Text only
- RenderHero dispatcher component

**Reusable Fields**

- `link.ts`: Internal reference OR external URL, appearance options
- `linkGroup.ts`: Array wrapper with maxRows
- `colorField.ts`: HEX validation with custom UI
- `richText.ts`: Lexical config with internal link support

**Component Patterns**

- CMSLink: Resolves internal references to routes, 4 appearance styles
- RenderBlocks: Block dispatcher with type mapping
- RichText: Lexical renderer with custom converters

**Footer Configuration**

- companyInfo.tagline
- serviceLinks array
- companyLinks array
- socialLinks with platform selector (Facebook, Twitter, Instagram, LinkedIn, YouTube, WhatsApp)
- legalLinks array
- copyrightText with auto year

---

### 2. Payload Official Website Template (AUTHORITATIVE)

**Location**: `example/website`
**Priority**: Follow these patterns exactly for Payload best practices

#### What to Copy:

**Access Control Patterns**

- `authenticated`: Returns `Boolean(user)` - requires login
- `authenticatedOrPublished`: Full access for users, query filter `{ _status: { equals: 'published' } }` for anonymous
- `anyone`: Returns `true` - public access

**Collection Configuration Pattern**

```
Collection: {
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,  // or 'anyone' for always-public
    update: authenticated,
  },
  admin: {
    livePreview: { url: generatePreviewPath },
    preview: generatePreviewPath,
  },
  defaultPopulate: { title: true, slug: true },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateDocument],
    afterDelete: [revalidateDelete],
  },
  versions: { drafts: { autosave: { interval: 100 } }, maxPerDoc: 50 },
}
```

**Revalidation Hook Pattern (CRITICAL)**

```
- Always check context.disableRevalidate first
- Use revalidatePath() for specific routes
- Use revalidateTag() for grouped content (sitemaps)
- Handle BOTH publish AND unpublish scenarios
- Special case: 'home' slug maps to '/'
- Log revalidation for debugging
```

**Reusable Link Field**

- Type selector: reference (internal) or custom (external URL)
- Appearance options: default, outline (or disabled)
- New tab checkbox
- Optional label field
- Deep merge support for overrides

**Live Preview Setup**

- Breakpoints: Mobile (375), Tablet (768), Desktop (1440)
- generatePreviewPath utility with encoded parameters
- LivePreviewListener client component
- Render only when `draft` is true

**Caching Strategy**

- `getCachedDocument(collection, slug)` with `unstable_cache`
- `getCachedGlobal(slug, depth)` with `unstable_cache`
- Tags: `${collection}_${slug}` or `global_${slug}`

**Dynamic Route Pattern**

```
- generateStaticParams: Fetch all, filter out 'home', return slugs
- Page component: Check draftMode(), decode slug, query with cache()
- Use overrideAccess: draft to show unpublished during preview
- Render LivePreviewListener only when draft is true
```

**Hook Patterns**

- `beforeChange`: Data transformation (populatePublishedAt)
- `afterChange`: Side effects (revalidation)
- `afterRead`: Data enrichment (populateAuthors)
- Always return doc/data from hooks

---

### 3. portfolio-site-master (Design Reference)

**Location**: `example/portfolio-site-master`
**Priority**: Reference for visual styling and portfolio-specific components

#### What to Reference:

**Card Styling**

- Rounded corners with soft shadows
- Subtle inner shadows using `before:` pseudo-elements
- Background clips for dark mode borders
- Hover transitions on shadow and outline

**Photo Gallery with EXIF**

- EXIF metadata extraction and display
- Lightbox view for full-size images
- Grid layout with consistent aspect ratios

**Project Showcase**

- Featured project carousel with progress bar
- Gradient backgrounds based on project colors
- Image positioning with object-fit cover

**Tech Stack Display**

- Icon grid presentation
- Tooltip on hover for skill names
- Category grouping (Frontend, Backend, Tools)

**FeaturedProjects Component Pattern**

- Auto-advance carousel with pause on hover
- Navigation arrows
- Progress indicator
- Gradient background light effect
- Layered image transitions

---

### 4. chanhdai.com (Layout Reference)

**Location**: External reference
**Priority**: Follow single-page scroll structure

#### What to Reference:

**Page Organization**

- Hero at top
- Overview section with job title, location, timezone
- Social links in 2-column grid
- About section with markdown content
- Experience as timeline
- Projects as collapsible list
- Contact at bottom

**Section Flow**

- Consistent vertical spacing between sections
- Clean transitions without decorative elements
- Section anchors for navigation

---

### 5. braydoncoyer.dev (Profile Reference)

**Location**: External reference
**Priority**: Hero section inspiration

#### What to Reference:

**Profile Header**

- Multiple photos in gallery layout
- Name prominently displayed
- Tagline/title underneath
- Personal branding approach

---

### 6. victoreke.com (GitHub Reference)

**Location**: External reference
**Priority**: GitHub activity display

#### What to Reference:

**Contribution Calendar**

- react-github-calendar integration
- Username: srjaykikani
- Activity statistics display
- Color theme matching site theme

---

## Content Management (Payload CMS)

### New Global: Profile

Stores personal information editable via admin panel:

| Field       | Type            | Description                 |
| ----------- | --------------- | --------------------------- |
| name        | text            | Full name                   |
| title       | text            | Job title/tagline           |
| bio         | richText        | About section content       |
| avatar      | upload (Media)  | Main profile photo          |
| photos      | array of upload | Gallery photos (3-5 images) |
| email       | email           | Contact email               |
| phone       | text            | Phone number (optional)     |
| location    | text            | City, Country               |
| timezone    | text            | e.g., "Asia/Kolkata"        |
| github      | text            | GitHub username             |
| socialLinks | array           | Platform + URL pairs        |
| resumeUrl   | text            | Resume/CV link              |

**Access**: `read: anyone` (public)
**Hooks**: `afterChange: revalidateProfile`

### New Collection: Projects

Portfolio projects with full case study support:

| Field       | Type               | Description                            |
| ----------- | ------------------ | -------------------------------------- |
| title       | text               | Project name (required)                |
| slug        | text               | URL slug (auto-generated, unique)      |
| description | textarea           | Short description for cards            |
| image       | upload (Media)     | Cover image                            |
| tags        | array of text      | Technology tags                        |
| liveUrl     | text               | Live demo URL                          |
| githubUrl   | text               | Source code URL                        |
| featured    | checkbox           | Show on homepage                       |
| order       | number             | Sort order                             |
| content     | richText (Lexical) | Full project case study                |
| meta        | group              | SEO fields (title, description, image) |

**Access**: `read: authenticatedOrPublished`, `create/update/delete: authenticated`
**Hooks**: `afterChange: revalidateProject`
**Versions**: Drafts enabled with autosave

### New Collection: Experiences

Work history entries:

| Field       | Type           | Description                       |
| ----------- | -------------- | --------------------------------- |
| company     | text           | Company name (required)           |
| logo        | upload (Media) | Company logo                      |
| title       | text           | Job title (required)              |
| startDate   | date           | Start date                        |
| endDate     | date           | End date (null = present)         |
| description | richText       | Role description and achievements |
| website     | text           | Company website URL               |
| order       | number         | Sort order (desc)                 |

**Access**: `read: anyone`, `create/update/delete: authenticated`

### New Collection: Skills

Technical skills and technologies:

| Field    | Type   | Description                         |
| -------- | ------ | ----------------------------------- |
| name     | text   | Skill name (required)               |
| icon     | text   | Icon identifier (lucide or devicon) |
| category | select | Frontend / Backend / Tools / Other  |
| url      | text   | Official website                    |
| order    | number | Sort order within category          |

**Access**: `read: anyone`, `create/update/delete: authenticated`

### New Collection: Gallery (Optional)

Photography showcase:

| Field       | Type           | Description                    |
| ----------- | -------------- | ------------------------------ |
| image       | upload (Media) | Photo (required)               |
| title       | text           | Photo title                    |
| description | textarea       | Caption                        |
| exifData    | json           | EXIF metadata (auto-extracted) |
| order       | number         | Sort order                     |

**Access**: `read: anyone`, `create/update/delete: authenticated`

---

## Homepage Sections (Top to Bottom)

| #   | Section             | Description                           | Data Source                         |
| --- | ------------------- | ------------------------------------- | ----------------------------------- |
| 1   | **Hero**            | Profile photos, name, tagline         | Profile global                      |
| 2   | **Overview**        | Current role, location, local time    | Profile global                      |
| 3   | **Social Links**    | Grid of social profile links          | Profile global                      |
| 4   | **About**           | Bio/introduction text                 | Profile global                      |
| 5   | **GitHub Activity** | Contribution calendar for srjaykikani | GitHub API                          |
| 6   | **Tech Stack**      | Icon grid of skills/technologies      | Skills collection                   |
| 7   | **Experience**      | Timeline of work history              | Experiences collection              |
| 8   | **Projects**        | Collapsible list of featured projects | Projects collection (featured=true) |
| 9   | **Gallery**         | Photo showcase (optional)             | Gallery collection                  |
| 10  | **Contact**         | Email and call-to-action              | Profile global                      |

---

## Header Requirements

| Position | Element            | Behavior                     |
| -------- | ------------------ | ---------------------------- |
| Left     | Logo/wordmark      | Links to top of page         |
| Center   | Section navigation | Scrolls smoothly to sections |
| Right    | Theme toggle       | Switches light/dark mode     |

**Behavior**:

- Sticky on scroll
- Backdrop blur effect
- Section links highlight based on scroll position
- Mobile: Hamburger menu

---

## Footer Requirements

| Element       | Description                           |
| ------------- | ------------------------------------- |
| Contact email | Primary contact method                |
| Social links  | GitHub, X, Instagram, LinkedIn        |
| Built with    | Next.js, Payload CMS, COSS UI credits |
| Copyright     | Auto-updated year                     |

---

## Quality Standards

| Category            | Requirement                             |
| ------------------- | --------------------------------------- |
| **Performance**     | Lighthouse score 90+ on all metrics     |
| **Accessibility**   | WCAG 2.1 AA compliant                   |
| **SEO**             | Proper meta tags, OpenGraph, sitemap    |
| **Type Safety**     | Zero TypeScript errors, no `as any`     |
| **Code Quality**    | Follow CLAUDE.md and .claude/ standards |
| **Testing**         | Critical paths covered                  |
| **Payload Queries** | Always use `depth: 0` and `limit`       |
| **tRPC Pattern**    | `useTRPC()` inside components only      |
| **Imports**         | Direct imports, no barrel exports       |

---

## What NOT to Include

- Blog/articles section (skip for initial version)
- Complex animations or transitions
- Diagonal line patterns or decorative separators
- Third-party analytics (unless explicitly requested)
- Newsletter signup
- Comments or social features
- Contact form (just email link for now)

---

## Dependencies to Install

```
react-github-calendar    # GitHub contribution calendar
date-fns                 # Date formatting for experience timeline
```

Already installed:

- COSS UI components (50+ in src/components/ui/)
- Base UI primitives (@base-ui-components/react)
- Lucide icons (lucide-react)
- Tailwind CSS v4

---

## Implementation Order

| Phase | Task                              | Reference             |
| ----- | --------------------------------- | --------------------- |
| 1     | Install dependencies              | package.json          |
| 2     | Create Profile global             | website template      |
| 3     | Create Projects collection        | website + doctor-raj  |
| 4     | Create Experiences collection     | website template      |
| 5     | Create Skills collection          | website template      |
| 6     | Update payload.config.ts          | website template      |
| 7     | Set white background default      | styles.css            |
| 8     | Create Hero section               | braydoncoyer.dev      |
| 9     | Create Overview section           | chanhdai.com          |
| 10    | Create Social Links section       | chanhdai.com          |
| 11    | Create About section              | chanhdai.com          |
| 12    | Create GitHub section             | victoreke.com         |
| 13    | Create Tech Stack section         | portfolio-site-master |
| 14    | Create Experience section         | chanhdai.com          |
| 15    | Create Projects section           | chanhdai.com          |
| 16    | Create Gallery section (optional) | portfolio-site-master |
| 17    | Create Contact section            | Custom                |
| 18    | Update Header with sticky nav     | doctor-raj            |
| 19    | Update Footer                     | doctor-raj            |
| 20    | Create project detail page        | website template      |
| 21    | Test and polish                   | All references        |

---

## File Structure for New Components

```
src/
├── payload/
│   ├── globals/
│   │   └── Profile/
│   │       ├── config.ts
│   │       └── hooks/revalidateProfile.ts
│   └── collections/
│       ├── Projects.ts
│       ├── Experiences.ts
│       ├── Skills.ts
│       └── Gallery.ts
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── OverviewSection.tsx
│   │   ├── SocialLinksSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── GitHubSection.tsx
│   │   ├── TechStackSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── GallerySection.tsx
│   │   └── ContactSection.tsx
│   └── shared/
│       ├── SectionTitle.tsx
│       ├── TimelineItem.tsx
│       ├── ProjectCard.tsx
│       └── SkillIcon.tsx
└── app/
    └── (frontend)/
        ├── page.tsx (update with sections)
        └── projects/
            └── [slug]/
                └── page.tsx
```

---

## Success Criteria

The portfolio is complete when:

1. All 10 sections render correctly with real CMS data
2. Theme toggle works (light/dark mode)
3. Navigation scrolls smoothly to sections
4. GitHub calendar displays contribution data for srjaykikani
5. Projects link to detail pages with full case studies
6. Mobile experience is flawless
7. Page loads fast (< 2s on 3G)
8. Admin can update all content via Payload CMS at /admin
9. Lighthouse scores 90+ on Performance, Accessibility, Best Practices, SEO
10. Zero TypeScript errors (`pnpm check-types` passes)
11. All patterns match reference projects (doctor-raj, website template)

---

## Design Tokens (COSS UI + @coss/colors-zinc)

COSS UI uses opaque borders instead of solid ones to ensure crisp, contrasted borders even when backgrounds lack sufficient contrast. These opaque borders mix with bottom shadows to create enhanced contrast and visual depth.

### Core Color Variables

| Token                    | Light Mode | Dark Mode         | Usage                  |
| ------------------------ | ---------- | ----------------- | ---------------------- |
| `--background`           | white      | zinc-950          | Page background        |
| `--foreground`           | zinc-900   | zinc-100          | Primary text           |
| `--card`                 | white      | zinc-900/80 mixed | Card surfaces          |
| `--card-foreground`      | zinc-900   | zinc-100          | Card text              |
| `--popover`              | white      | zinc-900          | Tooltips, dropdowns    |
| `--popover-foreground`   | zinc-900   | zinc-100          | Popover text           |
| `--primary`              | zinc-800   | zinc-100          | Primary buttons, links |
| `--primary-foreground`   | zinc-50    | zinc-900          | Primary button text    |
| `--secondary`            | black/4%   | white/6%          | Secondary buttons      |
| `--secondary-foreground` | zinc-900   | zinc-100          | Secondary button text  |
| `--muted`                | black/4%   | white/6%          | Muted backgrounds      |
| `--muted-foreground`     | zinc-600   | zinc-400          | Muted/subtle text      |
| `--accent`               | black/4%   | white/6%          | Accent backgrounds     |
| `--accent-foreground`    | zinc-900   | zinc-100          | Accent text            |
| `--border`               | black/12%  | white/12%         | Borders (opaque)       |
| `--input`                | black/12%  | white/12%         | Input borders          |
| `--ring`                 | zinc-400   | zinc-500          | Focus rings            |

### State Color Variables

| Token                      | Light Mode  | Dark Mode   | Usage                     |
| -------------------------- | ----------- | ----------- | ------------------------- |
| `--destructive`            | red-500     | red-500     | Error/destructive actions |
| `--destructive-foreground` | red-700     | red-400     | Destructive text          |
| `--info`                   | blue-500    | blue-500    | Information states        |
| `--info-foreground`        | blue-700    | blue-400    | Info text                 |
| `--success`                | emerald-500 | emerald-500 | Success states            |
| `--success-foreground`     | emerald-700 | emerald-400 | Success text              |
| `--warning`                | amber-500   | amber-500   | Warning states            |
| `--warning-foreground`     | amber-700   | amber-400   | Warning text              |

### Tailwind Utility Classes

| Class                   | Value                   | Usage               |
| ----------------------- | ----------------------- | ------------------- |
| `bg-background`         | var(--background)       | Page background     |
| `bg-card`               | var(--card)             | Card surfaces       |
| `bg-popover`            | var(--popover)          | Tooltips, dropdowns |
| `bg-primary`            | var(--primary)          | Primary buttons     |
| `bg-secondary`          | var(--secondary)        | Secondary buttons   |
| `bg-muted`              | var(--muted)            | Muted backgrounds   |
| `bg-accent`             | var(--accent)           | Hover states        |
| `bg-destructive`        | var(--destructive)      | Error backgrounds   |
| `text-foreground`       | var(--foreground)       | Primary text        |
| `text-muted-foreground` | var(--muted-foreground) | Subtle text         |
| `text-primary`          | var(--primary)          | Primary color text  |
| `border`                | var(--border)           | Default border      |
| `ring`                  | var(--ring)             | Focus ring          |

### Layout Tokens

| Token         | Value                     | Usage              |
| ------------- | ------------------------- | ------------------ |
| `--radius`    | 0.625rem (10px)           | Base border radius |
| `rounded-sm`  | calc(var(--radius) - 4px) | Small elements     |
| `rounded-md`  | calc(var(--radius) - 2px) | Tooltips, inputs   |
| `rounded-lg`  | var(--radius)             | Buttons, badges    |
| `rounded-xl`  | calc(var(--radius) + 4px) | Cards, dialogs     |
| `rounded-2xl` | calc(var(--radius) + 8px) | Large containers   |
| `shadow-xs`   | 0 1px 2px black/5%        | Subtle elevation   |
| `shadow-sm`   | 0 1px 3px black/10%       | Card shadows       |
| `shadow-md`   | 0 4px 6px black/10%       | Dropdown shadows   |

### Component-Specific Patterns

**Cards** (from COSS UI card.tsx):

```
bg-card border shadow-xs rounded-2xl
before:shadow-[0_1px_--theme(--color-black/4%)]  // Light mode inner shadow
dark:before:shadow-[0_-1px_--theme(--color-white/8%)]  // Dark mode top highlight
```

**Tooltips/Popovers** (from COSS UI tooltip.tsx):

```
bg-popover border rounded-md shadow-md shadow-black/5
before:shadow-[0_1px_--theme(--color-black/4%)]
dark:before:shadow-[0_-1px_--theme(--color-white/8%)]
```

**Buttons**:

```
Primary: bg-primary text-primary-foreground hover:bg-primary/90
Secondary: bg-secondary text-secondary-foreground hover:bg-secondary/80
Outline: border border-input bg-background hover:bg-accent
Ghost: hover:bg-accent hover:text-accent-foreground
```

---

## Key Technical Decisions

| Decision         | Choice                | Rationale                                |
| ---------------- | --------------------- | ---------------------------------------- |
| UI Library       | COSS UI (Base UI)     | Already installed, accessible primitives |
| State Management | React Query via tRPC  | Type-safe, built-in caching              |
| Styling          | Tailwind CSS v4       | Already configured, utility-first        |
| CMS              | Payload CMS           | Already set up, same as references       |
| Database         | MongoDB               | Already configured                       |
| Hosting          | Vercel (assumed)      | Next.js optimized                        |
| GitHub Calendar  | react-github-calendar | Proven library                           |
| Icons            | Lucide React          | Already installed                        |

---

## Layout System Requirements (chanhdai.com Reference)

**Source**: `example/chanhdai.com-main`

The layout system uses a distinctive "screen-line" pattern that extends visual borders to the full viewport width while keeping content centered. This creates a clean, structured appearance.

### Container Pattern

| Element                | Class                                                       | Description                                            |
| ---------------------- | ----------------------------------------------------------- | ------------------------------------------------------ |
| **Outer wrapper**      | `max-w-screen overflow-x-hidden px-2`                       | Prevents horizontal scroll, adds edge padding          |
| **Inner container**    | `mx-auto md:max-w-3xl`                                      | Centers content, max 768px on desktop                  |
| **Content with lines** | `screen-line-before screen-line-after border-x border-edge` | Vertical edge lines + horizontal screen-spanning lines |

### CSS Utility Classes to Create

Add to `src/app/(frontend)/styles.css`:

```css
/* Screen-spanning horizontal lines */
.screen-line-before::before,
.screen-line-after::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 1px;
  background: var(--border-edge);
}

.screen-line-before::before {
  top: 0;
}

.screen-line-after::after {
  bottom: 0;
}

/* Border edge color (subtle structural divider) */
:root {
  --border-edge: oklch(0.922 0 0); /* Light mode - subtle gray */
}

.dark {
  --border-edge: oklch(0.274 0 0); /* Dark mode - subtle gray */
}

.border-edge {
  border-color: var(--border-edge);
}
```

### Header Structure (Sticky with Scroll Shadow)

```tsx
// Header wrapper with scroll-based shadow
<header
  className={cn(
    'sticky top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2',
    'data-[affix=true]:shadow-[0_0_16px_0_black]/8', // Shadow appears on scroll
  )}
>
  <div className="screen-line-before screen-line-after mx-auto flex h-12 items-center justify-between gap-2 border-x border-edge px-2 md:max-w-3xl">
    {/* Logo | Nav Links | Theme Toggle */}
  </div>
</header>
```

**Header Height**: `h-12` (48px)
**Scroll Detection**: Use `data-affix` attribute to toggle shadow based on scroll position
**Breakpoint**: 640px for mobile navigation switch

### Footer Structure

```tsx
<footer className="max-w-screen overflow-x-hidden px-2">
  <div className="screen-line-before mx-auto border-x border-edge pt-4 md:max-w-3xl">
    {/* Footer content with screen-line decoration */}
  </div>
</footer>
```

### Section Panel Component

Create a reusable `Panel` component for consistent section styling:

```tsx
// src/components/shared/Panel.tsx
interface PanelProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Panel({ children, className, id }: PanelProps) {
  return (
    <section
      id={id}
      className={cn('relative screen-line-after border-x border-edge px-4 py-8', className)}
    >
      {children}
    </section>
  )
}
```

### Key Layout Differences from Current Implementation

| Current                | Required Change                                |
| ---------------------- | ---------------------------------------------- |
| `container` class      | Replace with `mx-auto md:max-w-3xl`            |
| Simple sections        | Add `screen-line-before/after` utilities       |
| Basic borders          | Use `border-edge` color token                  |
| No scroll shadow       | Add `data-[affix=true]:shadow-[...]` to header |
| Variable header height | Standardize to `h-12` (48px)                   |

### IMPORTANT: Font Requirement

**DO NOT** use the monospace font from chanhdai.com. Keep existing COSS UI typography (system fonts / sans-serif). Only copy the layout structure, not the font choices.

---

## Assets & Branding Requirements

### Personal Assets (Copy from Srjay.com-GSAP-main)

**Source**: `example/Srjay.com-GSAP-main/public/`

| Asset             | Source Path                  | Destination                         | Usage               |
| ----------------- | ---------------------------- | ----------------------------------- | ------------------- |
| **Main Logo**     | `S R logo.svg`               | `public/logo.svg`                   | Header, favicon     |
| **Logo PNG**      | `logosrjay.png`              | `public/logo.png`                   | Social/OG image     |
| **Logo Alt**      | `logo.png`                   | `public/logo-alt.png`               | Alternative usage   |
| **Favicon ICO**   | `favicon.ico`                | `public/favicon.ico`                | Browser tab         |
| **Favicon SVG**   | `favicon.svg`                | `public/favicon.svg`                | Modern browsers     |
| **Favicon 16**    | `favicon-16x16.png`          | `public/favicon-16x16.png`          | Small icon          |
| **Favicon 32**    | `favicon-32x32.png`          | `public/favicon-32x32.png`          | Standard icon       |
| **Apple Touch**   | `apple-touch-icon.png`       | `public/apple-touch-icon.png`       | iOS home screen     |
| **Android 192**   | `android-chrome-192x192.png` | `public/android-chrome-192x192.png` | Android PWA         |
| **Android 512**   | `android-chrome-512x512.png` | `public/android-chrome-512x512.png` | Android splash      |
| **Profile Photo** | `srjay.png`                  | `public/srjay.png`                  | Hero section avatar |
| **Web Manifest**  | `site.webmanifest`           | `public/site.webmanifest`           | PWA config          |

### Project Assets (Copy for Seeding)

**Source**: `example/Srjay.com-GSAP-main/public/`

| Project           | Files                                               | Description                   |
| ----------------- | --------------------------------------------------- | ----------------------------- |
| **ChallengeRate** | `challengerate-cover.png`, `challengerate-logo.svg` | Coding challenge platform     |
| **EduCave**       | `educave-cover.png`, `educave-logo.svg`             | Educational platform          |
| **E-Cell SVNIT**  | `ecellsvnit-cover.png`, `ecellsvnit-logo.svg`       | Entrepreneurship cell website |
| **Dr Vandna**     | `drvandna-cover.png`, `drvandna-logo.svg`           | Medical practice website      |

### Icons to Include

**Source**: `example/chanhdai.com-main/src/icons/` (Adapt without mono styling)

Copy icon components for social links and tech stack display. Ensure icons follow COSS UI styling conventions.

### Web Manifest Configuration

```json
{
  "name": "S R Jay Kikani",
  "short_name": "srjay",
  "icons": [
    { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

---

## Seeding System Requirements

**Reference**: `example/doctor-raj/src/endpoints/seed/`

Implement a complete database seeding system that populates all collections with sample data for development and demonstration purposes.

### Architecture Overview

```
src/
├── endpoints/
│   └── seed/
│       ├── index.ts          # Main seed orchestrator
│       ├── profile.ts        # Profile global seed data
│       ├── projects.ts       # Projects collection seed data
│       ├── experiences.ts    # Experiences collection seed data
│       ├── skills.ts         # Skills collection seed data
│       ├── gallery.ts        # Gallery collection seed data (optional)
│       └── images/           # Local images for seeding (or use fetchFileByURL)
```

### Seed Endpoint Configuration

**File**: `src/endpoints/seed/index.ts`

```typescript
import type { Payload, PayloadRequest } from 'payload'

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // 1. Clear existing data (in order of dependencies)
  await payload.delete({
    collection: 'gallery',
    where: { id: { exists: true } },
    context: { disableRevalidate: true },
  })
  await payload.delete({
    collection: 'projects',
    where: { id: { exists: true } },
    context: { disableRevalidate: true },
  })
  await payload.delete({
    collection: 'experiences',
    where: { id: { exists: true } },
    context: { disableRevalidate: true },
  })
  await payload.delete({
    collection: 'skills',
    where: { id: { exists: true } },
    context: { disableRevalidate: true },
  })
  await payload.delete({
    collection: 'media',
    where: { id: { exists: true } },
    context: { disableRevalidate: true },
  })

  // 2. Seed media files
  const mediaMap = await seedMedia(payload)

  // 3. Seed collections (with media references)
  await seedSkills(payload)
  await seedExperiences(payload, mediaMap)
  await seedProjects(payload, mediaMap)
  await seedGallery(payload, mediaMap)

  // 4. Update Profile global
  await seedProfile(payload, mediaMap)

  payload.logger.info('Seeding complete!')
}
```

### Register Seed Endpoint

**File**: `src/payload.config.ts`

```typescript
import { seed } from '@/endpoints/seed'

export default buildConfig({
  // ... existing config
  endpoints: [
    {
      handler: async (req) => {
        // Auth check - only allow in development or with admin token
        if (process.env.NODE_ENV === 'production') {
          const authHeader = req.headers.get('authorization')
          if (authHeader !== `Bearer ${process.env.SEED_SECRET}`) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 })
          }
        }

        await seed({ payload: req.payload, req })
        return Response.json({ success: true, message: 'Database seeded' })
      },
      method: 'post',
      path: '/seed',
    },
  ],
})
```

### Seed Data Factory Pattern

**Type-safe factory functions** using Payload's `RequiredDataFromCollectionSlug`:

```typescript
import type { RequiredDataFromCollectionSlug } from 'payload'

export const projectsData = (
  mediaMap: Record<string, string>,
): RequiredDataFromCollectionSlug<'projects'>[] => {
  return [
    {
      title: 'Project Name',
      slug: 'project-slug',
      description: 'Short description',
      image: mediaMap['project-cover'], // Reference to seeded media
      tags: [{ tag: 'React' }, { tag: 'TypeScript' }],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/user/repo',
      featured: true,
      order: 1,
      _status: 'published',
    },
  ]
}
```

### Media Seeding Helper

```typescript
import path from 'path'
import fs from 'fs'

export async function seedMedia(payload: Payload): Promise<Record<string, string>> {
  const mediaMap: Record<string, string> = {}

  // Option 1: Local files
  const localImages = [
    { name: 'srjay-avatar', file: 'srjay.png' },
    { name: 'challengerate-cover', file: 'challengerate-cover.png' },
    // ... more images
  ]

  for (const { name, file } of localImages) {
    const filePath = path.join(process.cwd(), 'public', file)
    const buffer = fs.readFileSync(filePath)

    const media = await payload.create({
      collection: 'media',
      data: { alt: name },
      file: {
        data: buffer,
        mimetype: 'image/png',
        name: file,
        size: buffer.length,
      },
      context: { disableRevalidate: true },
    })

    mediaMap[name] = media.id
  }

  return mediaMap
}
```

---

## Seed Data Specification

### Profile Global Seed Data

```typescript
{
  name: 'S R Jay Kikani',
  title: 'Full Stack Developer & Entrepreneur',
  bio: {
    // Lexical rich text format
    root: {
      children: [
        {
          children: [{ text: 'Building products that matter. Passionate about clean code, scalable systems, and user experience.' }],
          type: 'paragraph',
        },
        {
          children: [{ text: 'Currently focused on creating impactful web applications using modern technologies.' }],
          type: 'paragraph',
        },
      ],
      type: 'root',
    },
  },
  avatar: '{{mediaMap.srjay-avatar}}',
  photos: [
    { photo: '{{mediaMap.srjay-photo-1}}' },
    { photo: '{{mediaMap.srjay-photo-2}}' },
    { photo: '{{mediaMap.srjay-photo-3}}' },
  ],
  email: 'hello@srjay.com',
  phone: '+91 XXXXX XXXXX',
  location: 'Gujarat, India',
  timezone: 'Asia/Kolkata',
  github: 'srjaykikani',
  socialLinks: [
    { platform: 'github', url: 'https://github.com/srjaykikani' },
    { platform: 'twitter', url: 'https://twitter.com/_srjay' },
    { platform: 'instagram', url: 'https://instagram.com/_srjay' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/srjaykikani' },
  ],
  resumeUrl: 'https://srjay.com/resume.pdf',
}
```

### Projects Collection Seed Data

| #   | Title             | Slug            | Description                                                                                   | Tags                               | Featured |
| --- | ----------------- | --------------- | --------------------------------------------------------------------------------------------- | ---------------------------------- | -------- |
| 1   | **ChallengeRate** | `challengerate` | A competitive coding platform for developers to improve their skills through daily challenges | React, Node.js, MongoDB, WebSocket | ✅       |
| 2   | **EduCave**       | `educave`       | Educational platform providing interactive learning experiences for students                  | Next.js, Payload CMS, TailwindCSS  | ✅       |
| 3   | **E-Cell SVNIT**  | `ecell-svnit`   | Official website for the Entrepreneurship Cell of SVNIT with event management                 | React, Express, PostgreSQL         | ✅       |
| 4   | **Dr. Vandna**    | `dr-vandna`     | Professional medical practice website with appointment booking system                         | Next.js, Stripe, SendGrid          | ✅       |
| 5   | **Portfolio v1**  | `portfolio-v1`  | Previous iteration of personal portfolio showcasing projects and skills                       | HTML, CSS, JavaScript, GSAP        | ❌       |

### Experiences Collection Seed Data

| #   | Company          | Title                       | Period         | Description                                                                                                                       |
| --- | ---------------- | --------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Freelance**    | Senior Full Stack Developer | 2023 - Present | Leading development of enterprise web applications. Building scalable solutions using Next.js, Node.js, and cloud infrastructure. |
| 2   | **Tech Startup** | Full Stack Developer        | 2021 - 2023    | Developed core product features, optimized database queries, and implemented CI/CD pipelines. Reduced page load time by 60%.      |
| 3   | **Web Agency**   | Frontend Developer          | 2020 - 2021    | Created responsive web interfaces for diverse clients. Specialized in React and modern CSS frameworks.                            |
| 4   | **E-Cell SVNIT** | Technical Lead              | 2019 - 2020    | Led technical team for entrepreneurship events. Built and maintained the cell's digital infrastructure.                           |

### Skills Collection Seed Data

**Frontend Category**:
| Name | Icon | URL |
|------|------|-----|
| React | `react` | https://react.dev |
| Next.js | `nextjs` | https://nextjs.org |
| TypeScript | `typescript` | https://typescriptlang.org |
| TailwindCSS | `tailwindcss` | https://tailwindcss.com |
| HTML5 | `html5` | https://developer.mozilla.org |
| CSS3 | `css3` | https://developer.mozilla.org |

**Backend Category**:
| Name | Icon | URL |
|------|------|-----|
| Node.js | `nodejs` | https://nodejs.org |
| Express | `express` | https://expressjs.com |
| Payload CMS | `payload` | https://payloadcms.com |
| PostgreSQL | `postgresql` | https://postgresql.org |
| MongoDB | `mongodb` | https://mongodb.com |
| Redis | `redis` | https://redis.io |

**Tools Category**:
| Name | Icon | URL |
|------|------|-----|
| Git | `git` | https://git-scm.com |
| Docker | `docker` | https://docker.com |
| AWS | `aws` | https://aws.amazon.com |
| Vercel | `vercel` | https://vercel.com |
| Figma | `figma` | https://figma.com |
| VS Code | `vscode` | https://code.visualstudio.com |

### Gallery Collection Seed Data (Optional)

| #   | Title           | Description                                 |
| --- | --------------- | ------------------------------------------- |
| 1   | Workspace Setup | My development workspace with dual monitors |
| 2   | Conference Talk | Speaking at local tech meetup               |
| 3   | Team Hackathon  | 24-hour hackathon with the team             |

---

## Seeding Execution

### Development

```bash
# Start dev server
pnpm dev

# Trigger seed via HTTP POST
curl -X POST http://localhost:3000/api/seed
```

### Production

```bash
# Set seed secret in environment
SEED_SECRET=your-secret-token

# Trigger with authorization
curl -X POST https://srjay.com/api/seed \
  -H "Authorization: Bearer your-secret-token"
```

### NPM Script (Optional)

Add to `package.json`:

```json
{
  "scripts": {
    "seed": "curl -X POST http://localhost:3000/api/seed"
  }
}
```

---

## Implementation Checklist for Layout & Seeding

### Phase A: Layout System Update

- [ ] Create `screen-line-before/after` CSS utilities in styles.css
- [ ] Add `--border-edge` CSS variable
- [ ] Create `Panel` component for consistent sections
- [ ] Update Header with scroll shadow detection
- [ ] Update Footer with screen-line decorations
- [ ] Update all sections to use new container pattern
- [ ] Verify mobile breakpoints (640px)

### Phase B: Asset Migration

- [ ] Copy all favicon files from Srjay.com-GSAP-main
- [ ] Copy logo files (SVG, PNG)
- [ ] Copy profile photo
- [ ] Copy project cover images
- [ ] Update `site.webmanifest`
- [ ] Update `<head>` meta tags for favicons

### Phase C: Seeding System

- [ ] Create `src/endpoints/seed/` directory structure
- [ ] Implement main seed orchestrator (`index.ts`)
- [ ] Create Profile seed data factory
- [ ] Create Projects seed data factory
- [ ] Create Experiences seed data factory
- [ ] Create Skills seed data factory
- [ ] Create Gallery seed data factory (optional)
- [ ] Register seed endpoint in payload.config.ts
- [ ] Add media seeding helper
- [ ] Test seed execution
- [ ] Add seed NPM script

---

LLMS-FULL.txt: https://payloadcms.com/llms-full.txt
