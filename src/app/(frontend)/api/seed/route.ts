import { getPayload } from 'payload'
import { headers } from 'next/headers'

import config from '@payload-config'
import { seed } from '@/endpoints/seed'

export async function POST(): Promise<Response> {
  const headersList = await headers()
  const authorization = headersList.get('authorization')

  // In production, require authorization
  if (process.env.NODE_ENV === 'production') {
    const expectedToken = process.env.SEED_SECRET

    if (!expectedToken) {
      return Response.json({ error: 'Seed endpoint not configured' }, { status: 500 })
    }

    if (authorization !== `Bearer ${expectedToken}`) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const payload = await getPayload({ config })

  try {
    await seed(payload)
    return Response.json({ success: true, message: 'Seed completed successfully' })
  } catch (error) {
    payload.logger.error({ err: error }, 'Seed error')
    return Response.json(
      { error: 'Seed failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}

export async function GET(): Promise<Response> {
  return Response.json(
    {
      message: 'Seed endpoint. Send a POST request to seed the database.',
      note: 'In production, include Authorization: Bearer <SEED_SECRET> header.',
    },
    { status: 200 },
  )
}
