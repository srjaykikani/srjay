import { getPayload } from 'payload'

import config from '@payload-config'
import { baseProcedure, createTRPCRouter } from '../init'

export const profileRouter = createTRPCRouter({
  get: baseProcedure.query(async () => {
    const payload = await getPayload({ config })
    const profile = await payload.findGlobal({
      slug: 'profile',
      depth: 2,
    })
    return profile
  }),
})
