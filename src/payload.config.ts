import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Validate required environment variables
const requiredEnvVars = ['PAYLOAD_SECRET', 'DATABASE_URI'] as const
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
}

import { Experiences } from './payload/collections/Experiences'
import { Gallery } from './payload/collections/Gallery'
import { Media } from './payload/collections/Media'
import { Projects } from './payload/collections/Projects'
import { Skills } from './payload/collections/Skills'
import { Users } from './payload/collections/Users'
import { Footer } from './payload/globals/Footer/config'
import { Header } from './payload/globals/Header/config'
import { Profile } from './payload/globals/Profile/config'
import { storagePlugin } from './payload/plugins/storage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: ['/payload/components/BeforeDashboard#BeforeDashboard'],
      graphics: {
        Icon: '/payload/components/graphics/Icon.tsx#Icon',
        Logo: '/payload/components/graphics/Logo.tsx#Logo',
      },
    },
    meta: {
      icons: [
        {
          type: 'image/svg+xml',
          rel: 'icon',
          url: '/favicon.svg',
        },
      ],
      openGraph: {
        images: [
          {
            height: 630,
            url: '/og-image.png',
            width: 1200,
          },
        ],
      },
      titleSuffix: '- Admin',
    },
  },
  collections: [Users, Media, Projects, Experiences, Skills, Gallery],
  globals: [Header, Footer, Profile],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),
  sharp,
  plugins: [
    ...(process.env.R2_BUCKET ? [storagePlugin] : []),
  ],
})
