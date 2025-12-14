import type { Payload } from 'payload'

import { seedBlogs } from './blogs'
import { seedExperiences } from './experiences'
import { seedMedia } from './media'
import { seedHeader } from './header'
import { seedProfile } from './profile'
import { seedProjects } from './projects'
import { seedSkills } from './skills'

export async function seed(payload: Payload): Promise<void> {
  payload.logger.info('Starting seed...')

  // Clear existing data in dependency order
  payload.logger.info('Clearing existing data...')

  // Clear blogs first
  await payload.delete({
    collection: 'blogs',
    where: { id: { exists: true } },
    context: { disableRevalidate: true },
  })
  payload.logger.info('Cleared blogs')

  // Clear collections that depend on media first
  await payload.delete({
    collection: 'projects',
    where: { id: { exists: true } },
    context: { disableRevalidate: true },
  })
  payload.logger.info('Cleared projects')

  await payload.delete({
    collection: 'experiences',
    where: { id: { exists: true } },
    context: { disableRevalidate: true },
  })
  payload.logger.info('Cleared experiences')

  await payload.delete({
    collection: 'skills',
    where: { id: { exists: true } },
    context: { disableRevalidate: true },
  })
  payload.logger.info('Cleared skills')

  await payload.delete({
    collection: 'gallery',
    where: { id: { exists: true } },
    context: { disableRevalidate: true },
  })
  payload.logger.info('Cleared gallery')

  // Clear media last (after dependents)
  await payload.delete({
    collection: 'media',
    where: { id: { exists: true } },
    context: { disableRevalidate: true },
  })
  payload.logger.info('Cleared media')

  // Seed in dependency order
  payload.logger.info('Seeding data...')

  // 1. Media first (other collections depend on it)
  const mediaMap = await seedMedia(payload)

  // 2. Profile (depends on media)
  await seedProfile(payload, mediaMap)

  // 3. Skills (no dependencies, but needed by projects and experiences)
  await seedSkills(payload)

  // 4. Projects (depends on skills for technology lookup)
  await seedProjects(payload)

  // 5. Experiences (depends on skills for relationship lookup)
  await seedExperiences(payload)

  // 6. Header
  await seedHeader(payload)

  // 7. Blogs (depends on media)
  await seedBlogs(payload, mediaMap)

  payload.logger.info('Seed completed successfully!')
}
