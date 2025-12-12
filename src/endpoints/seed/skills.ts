import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

const skills: RequiredDataFromCollectionSlug<'skills'>[] = [
  // Frontend
  { name: 'React', icon: 'react', category: 'frontend', url: 'https://react.dev', order: 100 },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend', url: 'https://nextjs.org', order: 95 },
  {
    name: 'TypeScript',
    icon: 'typescript',
    category: 'frontend',
    url: 'https://typescriptlang.org',
    order: 90,
  },
  {
    name: 'Tailwind CSS',
    icon: 'tailwindcss',
    category: 'frontend',
    url: 'https://tailwindcss.com',
    order: 85,
  },
  {
    name: 'React Native',
    icon: 'react',
    category: 'frontend',
    url: 'https://reactnative.dev',
    order: 80,
  },
  { name: 'Framer Motion', icon: 'framer', category: 'frontend', url: 'https://framer.com/motion', order: 75 },

  // Backend
  { name: 'Node.js', icon: 'nodejs', category: 'backend', url: 'https://nodejs.org', order: 100 },
  {
    name: 'PostgreSQL',
    icon: 'postgresql',
    category: 'backend',
    url: 'https://postgresql.org',
    order: 95,
  },
  { name: 'MongoDB', icon: 'mongodb', category: 'backend', url: 'https://mongodb.com', order: 90 },
  { name: 'Payload CMS', icon: 'payload', category: 'backend', url: 'https://payloadcms.com', order: 85 },
  { name: 'tRPC', icon: 'trpc', category: 'backend', url: 'https://trpc.io', order: 80 },
  { name: 'Prisma', icon: 'prisma', category: 'backend', url: 'https://prisma.io', order: 75 },

  // Tools
  { name: 'Git', icon: 'git', category: 'tools', url: 'https://git-scm.com', order: 100 },
  { name: 'Figma', icon: 'figma', category: 'tools', url: 'https://figma.com', order: 95 },
  { name: 'VS Code', icon: 'vscode', category: 'tools', url: 'https://code.visualstudio.com', order: 90 },
  { name: 'Docker', icon: 'docker', category: 'tools', url: 'https://docker.com', order: 85 },
  { name: 'Vercel', icon: 'vercel', category: 'tools', url: 'https://vercel.com', order: 80 },
  { name: 'AWS', icon: 'aws', category: 'tools', url: 'https://aws.amazon.com', order: 75 },
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
