import type { Metadata } from 'next'

import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'A type-safe template built with Payload CMS and tRPC.',
  images: [
    {
      url: `${getServerSideURL()}/og-image.png`,
    },
  ],
  siteName: 'Payload + tRPC Template',
  title: 'Payload + tRPC Template',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
