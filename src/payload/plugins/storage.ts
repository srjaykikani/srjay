import { s3Storage } from '@payloadcms/storage-s3'

export const storagePlugin = s3Storage({
  collections: {
    media: {
      prefix: 'media',
      generateFileURL: ({ filename, prefix }) => {
        return `${process.env.R2_PUBLIC_URL}/${prefix}/${filename}`
      },
    },
  },
  bucket: process.env.R2_BUCKET || '',
  config: {
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
    endpoint: process.env.R2_ENDPOINT || '',
    region: 'auto',
    forcePathStyle: true,
  },
})
