import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

import type { MediaMap } from './media'

type ProjectSeed = Omit<RequiredDataFromCollectionSlug<'projects'>, 'image'> & {
  imageKey?: string
}

const projects: ProjectSeed[] = [
  {
    title: 'ChallengeRate',
    slug: 'challengerate',
    description:
      'A gamified productivity app that turns daily habits into challenges. Users can set goals, track progress, and compete with friends.',
    tags: [{ tag: 'React Native' }, { tag: 'Firebase' }, { tag: 'TypeScript' }],
    liveUrl: 'https://challengerate.app',
    githubUrl: 'https://github.com/srjaykikani/challengerate',
    featured: true,
    order: 100,
    imageKey: 'project-challengerate',
    _status: 'published',
  },
  {
    title: 'Dr. Vandna',
    slug: 'drvandna',
    description:
      'Professional medical practice website with appointment booking, patient portal, and telemedicine integration.',
    tags: [{ tag: 'Next.js' }, { tag: 'Payload CMS' }, { tag: 'Tailwind CSS' }],
    liveUrl: 'https://drvandna.com',
    featured: true,
    order: 90,
    imageKey: 'project-drvandna',
    _status: 'published',
  },
  {
    title: 'E-Cell SVNIT',
    slug: 'ecell-svnit',
    description:
      'Official website for the Entrepreneurship Cell of SVNIT. Features event management, startup showcase, and resource library.',
    tags: [{ tag: 'React' }, { tag: 'Node.js' }, { tag: 'MongoDB' }],
    liveUrl: 'https://ecellsvnit.in',
    featured: true,
    order: 80,
    imageKey: 'project-ecell',
    _status: 'published',
  },
  {
    title: 'Educave',
    slug: 'educave',
    description:
      'E-learning platform with course management, video streaming, quizzes, and progress tracking for students and educators.',
    tags: [{ tag: 'Next.js' }, { tag: 'PostgreSQL' }, { tag: 'AWS' }],
    liveUrl: 'https://educave.in',
    featured: true,
    order: 70,
    imageKey: 'project-educave',
    _status: 'published',
  },
]

export function getProjectsData(
  mediaMap: MediaMap,
): RequiredDataFromCollectionSlug<'projects'>[] {
  return projects.map(({ imageKey, ...project }) => ({
    ...project,
    image: imageKey ? mediaMap[imageKey] : undefined,
  }))
}

export async function seedProjects(payload: Payload, mediaMap: MediaMap): Promise<void> {
  const projectsData = getProjectsData(mediaMap)

  for (const project of projectsData) {
    await payload.create({
      collection: 'projects',
      data: project,
      context: {
        disableRevalidate: true,
      },
    })
    payload.logger.info(`Created project: ${project.title}`)
  }
}
