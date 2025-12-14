import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

/**
 * Payload Lexical Rich Text helper - matches the exact structure from example/website
 */

// Text node - matches reference pattern exactly
function text(content: string, format: 0 | 1 | 2 = 0) {
  return {
    type: 'text' as const,
    detail: 0,
    format, // 0 = normal, 1 = bold, 2 = italic
    mode: 'normal' as const,
    style: '',
    text: content,
    version: 1 as const,
  }
}

// Link node - matches reference pattern from example/website
type LinkNode = {
  type: 'link'
  children: ReturnType<typeof text>[]
  direction: 'ltr'
  fields: {
    linkType: 'custom'
    newTab: boolean
    url: string
  }
  format: ''
  indent: 0
  version: 3
}

function link(label: string, url: string, newTab = true): LinkNode {
  return {
    type: 'link',
    children: [text(label)],
    direction: 'ltr',
    fields: {
      linkType: 'custom',
      newTab,
      url,
    },
    format: '',
    indent: 0,
    version: 3,
  }
}

type InlineNode = ReturnType<typeof text> | LinkNode

// Paragraph node
function paragraph(...children: InlineNode[]) {
  return {
    type: 'paragraph' as const,
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    textFormat: 0,
    version: 1 as const,
  }
}

// List item node - supports mixed content (text + links)
function listitem(children: InlineNode[], value: number) {
  return {
    type: 'listitem' as const,
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    value,
    version: 1 as const,
  }
}

// Simple list item from string
function listitemText(content: string, value: number) {
  return listitem([text(content)], value)
}

// Bullet list node - accepts either strings or pre-built listitem nodes
function bulletList(items: (string | ReturnType<typeof listitem>)[]) {
  return {
    type: 'list' as const,
    children: items.map((item, i) =>
      typeof item === 'string' ? listitemText(item, i + 1) : { ...item, value: i + 1 },
    ),
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    listType: 'bullet' as const,
    start: 1,
    tag: 'ul' as const,
    version: 1 as const,
  }
}

// Root rich text structure
function richText(...nodes: (ReturnType<typeof paragraph> | ReturnType<typeof bulletList>)[]) {
  return {
    root: {
      type: 'root' as const,
      children: nodes,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1 as const,
    },
  }
}

type ExperienceSeed = Omit<RequiredDataFromCollectionSlug<'experiences'>, 'positions'> & {
  positions: Array<{
    title: string
    employmentType?: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship'
    startDate: string
    endDate?: string
    description?: ReturnType<typeof richText>
    skillNames?: string[]
  }>
}

const experiences: ExperienceSeed[] = [
  {
    company: 'Challenge Rate',
    website: 'https://www.challengerate.com/',
    location: 'GJ — India',
    isCurrentEmployer: true,
    positions: [
      {
        title: 'Co-Founder',
        employmentType: 'full-time',
        startDate: '2025-05-01',
        endDate: undefined,
        description: richText(
          paragraph(
            text('Developed a '),
            text('multi-tenant B2B wholesale marketplace', 1),
            text(
              ' for Indian manufacturers and buyers with a focus on type-safety, performance, and scalability.',
            ),
          ),
          bulletList([
            'Built tenant isolation per manufacturer with complete data segregation',
            'Implemented type-safe API layer using tRPC + TanStack Query',
            'Advanced tables with TanStack Table v8 and URL state via nuqs',
            'OTP authentication via MSG91 SMS integration',
            'INR payments: UPI, bank transfer, and COD support',
            'SEO features: dynamic sitemaps and robots.txt generation',
            'Robust search and filtering workflows',
            '47 tests covering unit, E2E, and integration testing',
            'Production maintenance scripts and internal tools',
          ]),
          paragraph(
            text('Built internal tools: ', 1),
            text(
              'bulk WhatsApp manager, lead scraping, and finance tooling. Continuing roadmap work on GST billing and mobile app.',
            ),
          ),
        ),
        skillNames: [
          'Next.js',
          'React',
          'TypeScript',
          'Payload CMS',
          'tRPC',
          'TanStack Query',
          'TanStack Table',
          'nuqs',
          'MongoDB',
          'Tailwind CSS',
          'shadcn/ui',
          'MSG91',
          'Cloudflare R2',
          'Vercel',
        ],
      },
    ],
    order: 100,
  },

  {
    company: 'JHB Software',
    website: 'https://www.upwork.com/freelancers/~01290934f0ff42a832',
    location: 'Germany',
    isCurrentEmployer: true,
    positions: [
      {
        title: 'Software Developer (Freelancing, Remote)',
        employmentType: 'freelance',
        startDate: '2025-05-16',
        endDate: undefined,
        description: richText(
          paragraph(
            text('Freelance work focused on '),
            text('Payload CMS and Astro', 1),
            text(' projects.'),
          ),
          bulletList([
            'Troubleshooting production issues and implementing features',
            'Keeping CMS and websites stable across deployments',
            listitem(
              [
                text('Contributing to open-source Payload CMS plugins ('),
                link('payload-plugins', 'https://github.com/jhb-software/payload-plugins'),
                text(')'),
              ],
              3,
            ),
          ]),
        ),
        skillNames: [
          'Payload CMS',
          'Astro',
          'WP to Payload Migration',
          'Tailwind CSS',
          'MongoDB',
          'Vercel',
        ],
      },
    ],
    order: 95,
  },

  {
    company: 'Beachbox Ventures',
    website: 'https://hyprrstaging.com/',
    location: 'Australia',
    isCurrentEmployer: false,
    positions: [
      {
        title: 'Full Stack Developer (Remote)',
        employmentType: 'part-time',
        startDate: '2025-03-31',
        endDate: '2025-05-31',
        description: richText(
          paragraph(
            text('Worked in a '),
            text('4-person core engineering team', 1),
            text(' on a multi-tenant event management platform ecosystem.'),
          ),
          bulletList([
            'Web platform development with multi-tenant architecture and data isolation',
            'Payload CMS collections, access control, and hooks implementation',
            'Headless APIs for mobile integration',
          ]),
        ),
        skillNames: [
          'Next.js',
          'React',
          'Payload CMS',
          'MongoDB',
          'AWS S3',
          'TypeScript',
          'Tailwind CSS',
          'Shadcn/UI',
        ],
      },
      {
        title: 'Mobile Developer (Remote)',
        employmentType: 'full-time',
        startDate: '2025-06-01',
        endDate: '2025-09-04',
        description: richText(
          paragraph(
            text('Shipped '),
            text('two React Native mobile applications', 1),
            text(' to App Store and Play Store.'),
          ),
          bulletList([
            'Built ticketing experiences with wallet passes',
            'QR-based entry flows for event check-in',
            'Push notifications integration with OneSignal',
            'Supported production release workflows',
          ]),
        ),
        skillNames: ['React Native', 'Expo', 'React', 'TypeScript', 'OneSignal', 'Tailwind CSS'],
      },
    ],
    order: 90,
  },

  {
    company: 'Mindbend 2025',
    website: 'https://mindbend-main.vercel.app/',
    location: 'Surat, GJ — India',
    isCurrentEmployer: false,
    positions: [
      {
        title: 'Co Head - Sponsorship Team',
        employmentType: 'part-time',
        startDate: '2023-10-01',
        endDate: '2024-10-01',
        description: richText(
          paragraph(
            text('Started in the '),
            text('sponsorship committee', 1),
            text(', coordinating outreach and execution with seniors and peers.'),
          ),
          bulletList([
            'Coordinating sponsor outreach and relationship management',
            'Contributing to operational planning for fest programs',
            'Managing partnerships and sponsorship deliverables',
          ]),
        ),
        skillNames: ['Team Leadership', 'Communication', 'Negotiation'],
      },
      {
        title: 'Manager',
        employmentType: 'part-time',
        startDate: '2024-10-01',
        endDate: '2025-03-01',
        description: richText(
          paragraph(
            text('Managed teams and '),
            text('cross-functional coordination', 1),
            text(' for a large techno-managerial fest.'),
          ),
          bulletList([
            'Supporting multi-team execution across event tracks',
            'Day-to-day operations management',
            'Resource allocation and timeline coordination',
          ]),
        ),
        skillNames: ['Operations', 'Project Management', 'Team Leadership'],
      },
      {
        title: 'Joint Co-Curricular Affairs Secretary',
        employmentType: 'part-time',
        startDate: '2025-03-01',
        endDate: '2025-06-01',
        description: richText(
          paragraph(
            text('Helped '),
            text('lead overall fest execution', 1),
            text(' by coordinating large student teams and multi-activity programming.'),
          ),
          bulletList([
            'Led the Mindbend 2025 website development with juniors',
            'Contributed across development, design, publicity, and marketing',
            'Coordinated large student team activities',
          ]),
        ),
        skillNames: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Payload CMS'],
      },
    ],
    order: 80,
  },

  {
    company: '10turtle (Par Solution)',
    website: 'https://10turtle.com/',
    location: 'GJ — India',
    isCurrentEmployer: false,
    positions: [
      {
        title: 'Software Developer (Hybrid)',
        employmentType: 'part-time',
        startDate: '2024-10-01',
        endDate: '2025-01-01',
        description: richText(
          paragraph(
            text('Built and maintained '),
            text('full-stack applications', 1),
            text(' including a Payload + Next.js platform and Electron-based HRMS desktop app.'),
          ),
          bulletList([
            'PAR Solution platform with type-safe APIs using tRPC',
            'Electron-based HRMS desktop application',
            'Analytics dashboards with Chart.js and Recharts',
            'File storage integration with AWS S3',
            'Async processing with RabbitMQ',
            'Security-focused data handling',
          ]),
        ),
        skillNames: [
          'Next.js',
          'React',
          'Payload CMS',
          'tRPC',
          'MongoDB',
          'Express.js',
          'Electron',
          'TypeScript',
          'Tailwind CSS',
          'AWS S3',
          'RabbitMQ',
          'Chart.js',
          'Recharts',
          'Radix UI',
          'Zustand',
          'React Hook Form',
        ],
      },
    ],
    order: 70,
  },
]

export function getExperiencesData(): ExperienceSeed[] {
  return experiences
}

export async function seedExperiences(payload: Payload): Promise<void> {
  const experiencesData = getExperiencesData()

  // First, get all skills to create a lookup map
  const { docs: allSkills } = await payload.find({
    collection: 'skills',
    limit: 1000,
    depth: 0,
  })

  const skillNameToId = new Map<string, string>()
  for (const skill of allSkills) {
    skillNameToId.set(skill.name.toLowerCase(), skill.id)
  }

  for (const experience of experiencesData) {
    // Transform positions to include skill IDs
    const positions = experience.positions.map(({ skillNames, ...position }) => ({
      ...position,
      skills: skillNames
        ?.map((name) => skillNameToId.get(name.toLowerCase()))
        .filter((id): id is string => id !== undefined),
    }))

    await payload.create({
      collection: 'experiences',
      data: {
        ...experience,
        positions,
      },
      context: {
        disableRevalidate: true,
      },
    })

    payload.logger.info(`Created experience: ${experience.company}`)
  }
}
