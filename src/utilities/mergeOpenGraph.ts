import type { Metadata } from 'next'

import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Portfolio of srjay - Full-stack developer specializing in modern web technologies.',
  images: [
    {
      url: `${getServerSideURL()}/og-image.png`,
    },
  ],
  siteName: 'srjay',
  title: 'srjay',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
