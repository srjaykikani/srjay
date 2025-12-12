import type { Payload } from 'payload'

import { seedExperiences } from './experiences'
import { seedMedia } from './media'
import { seedProfile } from './profile'
import { seedProjects } from './projects'
import { seedSkills } from './skills'

export async function seed(payload: Payload): Promise<void> {
  payload.logger.info('Starting seed...')

  // Clear existing data in dependency order
  payload.logger.info('Clearing existing data...')

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

  // 3. Projects (depends on media)
  await seedProjects(payload, mediaMap)

  // 4. Experiences (no media dependencies in current seed)
  await seedExperiences(payload)

  // 5. Skills (no dependencies)
  await seedSkills(payload)

  payload.logger.info('Seed completed successfully!')
}
