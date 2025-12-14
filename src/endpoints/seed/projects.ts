import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

type ProjectSeed = Omit<RequiredDataFromCollectionSlug<'projects'>, 'image' | 'technologies'> & {
  technologyNames?: string[]
}

// Text node helper
function text(content: string, format: 0 | 1 | 2 = 0) {
  return {
    type: 'text' as const,
    detail: 0,
    format,
    mode: 'normal' as const,
    style: '',
    text: content,
    version: 1 as const,
  }
}

// Paragraph node
function paragraph(...children: ReturnType<typeof text>[]) {
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

// List item node
function listitem(content: string, value: number) {
  return {
    type: 'listitem' as const,
    children: [text(content)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    value,
    version: 1 as const,
  }
}

// Bullet list node
function bulletList(items: string[]) {
  return {
    type: 'list' as const,
    children: items.map((item, i) => listitem(item, i + 1)),
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

const projects: ProjectSeed[] = [
  {
    title: 'Physio at the Doorstep',
    description:
      'Home physiotherapy booking platform for a UK private client with type-safe full-stack architecture.',
    technologyNames: [
      'Next.js',
      'React',
      'Payload CMS',
      'tRPC',
      'TanStack Query',
      'MongoDB',
      'Cloudflare R2',
      'TypeScript',
      'Tailwind CSS',
    ],
    order: 100,
    content: richText(
      paragraph(
        text('Built a '),
        text('home physiotherapy booking platform', 1),
        text(' for a UK-based healthcare provider with end-to-end type safety.'),
      ),
      bulletList([
        'Patient booking platform with Payload CMS + Next.js',
        'tRPC v11 API layer with TanStack Query integration',
        'Integrated Cliniko practice management for appointments and patient data',
        'Custom collections for patients, appointments, and services',
        'Cloudflare R2 for media storage',
        'Vitest + Playwright testing suite',
      ]),
    ),
    _status: 'published',
  },

  {
    title: 'VisitCards.in',
    description:
      'NFC digital business card platform with scroll animations and multi-tenant RBAC. College 2nd year startup.',
    technologyNames: [
      'Next.js',
      'React',
      'Payload CMS',
      'MongoDB',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Radix UI',
      'AWS S3',
    ],
    order: 90,
    content: richText(
      paragraph(
        text('Built a '),
        text('NFC digital business card platform', 1),
        text(' with beautiful scroll animations and Framer Motion effects.'),
      ),
      bulletList([
        'Minimal landing page with AuroraText gradient typography',
        'Sticky scroll cards with rotation/scale animations',
        'Multi-tenant RBAC (Admin, Sales Partner, User)',
        'NFC card management with QR code fallback',
        'Searchable card directory for business discovery',
      ]),
    ),
    _status: 'published',
  },
]

export function getProjectsData(
  skillNameToId: Map<string, string>,
): RequiredDataFromCollectionSlug<'projects'>[] {
  return projects.map(({ technologyNames, ...project }) => ({
    ...project,
    image: undefined,
    technologies: technologyNames
      ?.map((name) => skillNameToId.get(name.toLowerCase()))
      .filter((id): id is string => id !== undefined),
  }))
}

export async function seedProjects(payload: Payload): Promise<void> {
  const { docs: allSkills } = await payload.find({
    collection: 'skills',
    limit: 1000,
    depth: 0,
  })

  const skillNameToId = new Map<string, string>()
  for (const skill of allSkills) {
    skillNameToId.set(skill.name.toLowerCase(), skill.id)
  }

  const projectsData = getProjectsData(skillNameToId)

  for (const project of projectsData) {
    await payload.create({
      collection: 'projects',
      data: project,
      context: { disableRevalidate: true },
    })
    payload.logger.info(`Created project: ${project.title}`)
  }
}
