import { getPayload } from 'payload'

import config from '@payload-config'
import { baseProcedure, createTRPCRouter } from '../init'

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
      {} as Record<string, typeof docs>,
    )

    return grouped
  }),
})
