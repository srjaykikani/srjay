import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

const skills: RequiredDataFromCollectionSlug<'skills'>[] = [
  // ==========================================
  // FRONTEND SKILLS
  // ==========================================

  // Core Frontend
  {
    name: 'React',
    description: 'Frontend Library',
    category: 'frontend',
    url: 'https://react.dev',
    order: 100,
  },
  {
    name: 'Next.js',
    description: 'React Framework',
    category: 'frontend',
    url: 'https://nextjs.org',
    order: 98,
  },
  {
    name: 'TypeScript',
    description: 'Type-safe JavaScript',
    category: 'frontend',
    url: 'https://typescriptlang.org',
    order: 96,
  },
  {
    name: 'JavaScript',
    description: 'Programming Language',
    category: 'frontend',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    order: 94,
  },

  // Styling
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS',
    category: 'frontend',
    url: 'https://tailwindcss.com',
    order: 92,
  },
  {
    name: 'CSS',
    description: 'Styling Language',
    category: 'frontend',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    order: 90,
  },
  {
    name: 'Sass',
    description: 'CSS Preprocessor',
    category: 'frontend',
    url: 'https://sass-lang.com',
    order: 88,
  },

  // UI Frameworks & Libraries
  {
    name: 'Framer Motion',
    description: 'Animation Library',
    category: 'frontend',
    url: 'https://framer.com/motion',
    order: 86,
  },
  {
    name: 'Radix UI',
    description: 'Accessible Components',
    category: 'frontend',
    url: 'https://radix-ui.com',
    order: 84,
  },
  {
    name: 'shadcn/ui',
    description: 'Component Collection',
    category: 'frontend',
    url: 'https://ui.shadcn.com',
    order: 82,
  },

  // Mobile
  {
    name: 'React Native',
    description: 'Mobile Framework',
    category: 'frontend',
    url: 'https://reactnative.dev',
    order: 80,
  },
  {
    name: 'Expo',
    description: 'React Native Toolchain',
    category: 'frontend',
    url: 'https://expo.dev',
    order: 78,
  },

  // State Management
  {
    name: 'Redux',
    description: 'State Management',
    category: 'frontend',
    url: 'https://redux.js.org',
    order: 76,
  },
  {
    name: 'Zustand',
    description: 'Lightweight State',
    category: 'frontend',
    url: 'https://zustand-demo.pmnd.rs',
    order: 74,
  },
  {
    name: 'TanStack Query',
    description: 'Data Fetching',
    category: 'frontend',
    url: 'https://tanstack.com/query',
    order: 72,
  },

  // Testing
  {
    name: 'Jest',
    description: 'Testing Framework',
    category: 'frontend',
    url: 'https://jestjs.io',
    order: 70,
  },
  {
    name: 'Vitest',
    description: 'Unit Testing',
    category: 'frontend',
    url: 'https://vitest.dev',
    order: 68,
  },
  {
    name: 'Playwright',
    description: 'E2E Testing',
    category: 'frontend',
    url: 'https://playwright.dev',
    order: 66,
  },

  // ==========================================
  // BACKEND SKILLS
  // ==========================================

  // Runtime & Frameworks
  {
    name: 'Node.js',
    description: 'JavaScript Runtime',
    category: 'backend',
    url: 'https://nodejs.org',
    order: 100,
  },
  {
    name: 'Express',
    description: 'Web Framework',
    category: 'backend',
    url: 'https://expressjs.com',
    order: 98,
  },
  {
    name: 'Python',
    description: 'Programming Language',
    category: 'backend',
    url: 'https://python.org',
    order: 96,
  },

  // Databases
  {
    name: 'PostgreSQL',
    description: 'Relational Database',
    category: 'backend',
    url: 'https://postgresql.org',
    order: 94,
  },
  {
    name: 'MongoDB',
    description: 'NoSQL Database',
    category: 'backend',
    url: 'https://mongodb.com',
    order: 92,
  },
  {
    name: 'Redis',
    description: 'In-Memory Store',
    category: 'backend',
    url: 'https://redis.io',
    order: 90,
  },
  {
    name: 'SQLite',
    description: 'Embedded Database',
    category: 'backend',
    url: 'https://sqlite.org',
    order: 88,
  },

  // CMS & Headless
  {
    name: 'Payload CMS',
    description: 'Headless CMS',
    category: 'backend',
    url: 'https://payloadcms.com',
    order: 86,
  },
  {
    name: 'Sanity',
    description: 'Content Platform',
    category: 'backend',
    url: 'https://sanity.io',
    order: 84,
  },
  {
    name: 'Strapi',
    description: 'Headless CMS',
    category: 'backend',
    url: 'https://strapi.io',
    order: 82,
  },

  // APIs & Data
  {
    name: 'tRPC',
    description: 'Type-safe APIs',
    category: 'backend',
    url: 'https://trpc.io',
    order: 80,
  },
  {
    name: 'GraphQL',
    description: 'Query Language',
    category: 'backend',
    url: 'https://graphql.org',
    order: 78,
  },
  {
    name: 'REST APIs',
    description: 'API Architecture',
    category: 'backend',
    url: 'https://restfulapi.net',
    order: 76,
  },

  // ORM & Query Builders
  {
    name: 'Prisma',
    description: 'TypeScript ORM',
    category: 'backend',
    url: 'https://prisma.io',
    order: 74,
  },
  {
    name: 'Drizzle',
    description: 'TypeScript ORM',
    category: 'backend',
    url: 'https://orm.drizzle.team',
    order: 72,
  },

  // Auth
  {
    name: 'NextAuth.js',
    description: 'Authentication',
    category: 'backend',
    url: 'https://next-auth.js.org',
    order: 70,
  },
  {
    name: 'Clerk',
    description: 'User Management',
    category: 'backend',
    url: 'https://clerk.com',
    order: 68,
  },

  // ==========================================
  // TOOLS & DEVOPS
  // ==========================================

  // Version Control
  {
    name: 'Git',
    description: 'Version Control',
    category: 'tools',
    url: 'https://git-scm.com',
    order: 100,
  },
  {
    name: 'GitHub',
    description: 'Code Hosting',
    category: 'tools',
    url: 'https://github.com',
    order: 98,
  },

  // Design
  {
    name: 'Figma',
    description: 'Design Tool',
    category: 'tools',
    url: 'https://figma.com',
    order: 96,
  },
  {
    name: 'Adobe XD',
    description: 'UI/UX Design',
    category: 'tools',
    url: 'https://adobe.com/products/xd',
    order: 94,
  },
  {
    name: 'Framer',
    description: 'Design & Prototype',
    category: 'tools',
    url: 'https://framer.com',
    order: 92,
  },

  // IDE & Editors
  {
    name: 'VS Code',
    description: 'Code Editor',
    category: 'tools',
    url: 'https://code.visualstudio.com',
    order: 90,
  },
  {
    name: 'Cursor',
    description: 'AI Code Editor',
    category: 'tools',
    url: 'https://cursor.com',
    order: 88,
  },

  // Containerization & DevOps
  {
    name: 'Docker',
    description: 'Containerization',
    category: 'tools',
    url: 'https://docker.com',
    order: 86,
  },
  {
    name: 'Kubernetes',
    description: 'Container Orchestration',
    category: 'tools',
    url: 'https://kubernetes.io',
    order: 84,
  },

  // Hosting & Deployment
  {
    name: 'Vercel',
    description: 'Frontend Hosting',
    category: 'tools',
    url: 'https://vercel.com',
    order: 82,
  },
  {
    name: 'AWS',
    description: 'Cloud Platform',
    category: 'tools',
    url: 'https://aws.amazon.com',
    order: 80,
  },
  {
    name: 'Railway',
    description: 'App Hosting',
    category: 'tools',
    url: 'https://railway.app',
    order: 78,
  },
  {
    name: 'Cloudflare',
    description: 'CDN & Security',
    category: 'tools',
    url: 'https://cloudflare.com',
    order: 76,
  },

  // CI/CD
  {
    name: 'GitHub Actions',
    description: 'CI/CD Platform',
    category: 'tools',
    url: 'https://github.com/features/actions',
    order: 74,
  },

  // Package Managers
  {
    name: 'pnpm',
    description: 'Package Manager',
    category: 'tools',
    url: 'https://pnpm.io',
    order: 72,
  },
  {
    name: 'npm',
    description: 'Package Manager',
    category: 'tools',
    url: 'https://npmjs.com',
    order: 70,
  },

  // Other Tools
  {
    name: 'Storybook',
    description: 'UI Development',
    category: 'tools',
    url: 'https://storybook.js.org',
    order: 68,
  },
  {
    name: 'Turborepo',
    description: 'Monorepo Tool',
    category: 'tools',
    url: 'https://turbo.build/repo',
    order: 66,
  },
  {
    name: 'ESLint',
    description: 'Linting Tool',
    category: 'tools',
    url: 'https://eslint.org',
    order: 64,
  },
  {
    name: 'Prettier',
    description: 'Code Formatter',
    category: 'tools',
    url: 'https://prettier.io',
    order: 62,
  },
]

export function getSkillsData(): RequiredDataFromCollectionSlug<'skills'>[] {
  return skills
}

export async function seedSkills(payload: Payload): Promise<void> {
  const skillsData = getSkillsData()

  for (const skill of skillsData) {
    await payload.create({
      collection: 'skills',
      data: skill,
      context: {
        disableRevalidate: true,
      },
    })
    payload.logger.info(`Created skill: ${skill.name}`)
  }
}
