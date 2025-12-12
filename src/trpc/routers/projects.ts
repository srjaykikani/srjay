import { z } from 'zod'
import { getPayload } from 'payload'
import { TRPCError } from '@trpc/server'

import config from '@payload-config'
import { baseProcedure, createTRPCRouter } from '../init'

export const projectsRouter = createTRPCRouter({
  getBySlug: baseProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayload({ config })
      const { docs } = await payload.find({
        collection: 'projects',
        where: { slug: { equals: input.slug } },
        depth: 2,
        limit: 1,
      })

      if (!docs[0]) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Project with slug "${input.slug}" not found`,
        })
      }

      return docs[0]
    }),

  getFeatured: baseProcedure.query(async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'projects',
      where: { featured: { equals: true } },
      sort: '-order',
      depth: 1,
      limit: 10,
    })
    return docs
  }),

  getAll: baseProcedure.query(async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'projects',
      sort: '-order',
      depth: 1,
      limit: 50,
    })
    return docs
  }),
})
