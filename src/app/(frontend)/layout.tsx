import type { Metadata } from 'next'

import React from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { TRPCReactProvider } from '@/trpc/client'
import { Providers } from '@/providers'
import { Header } from '@/components/Header/Component'
import { Footer } from '@/components/Footer/Component'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'

import './styles.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        <TRPCReactProvider>
          <Providers>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </Providers>
        </TRPCReactProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Payload + tRPC',
    template: '%s | Payload + tRPC',
  },
  description: 'A type-safe template built with Payload CMS and tRPC.',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
