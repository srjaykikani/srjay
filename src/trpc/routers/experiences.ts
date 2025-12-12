import { getPayload } from 'payload'

import config from '@payload-config'
import { baseProcedure, createTRPCRouter } from '../init'

export const experiencesRouter = createTRPCRouter({
  getAll: baseProcedure.query(async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'experiences',
      sort: '-order',
      depth: 1,
      limit: 20,
    })
    return docs
  }),
})
