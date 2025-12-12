import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import { PayloadIcon } from '@/components/icons/payload-icon'
import config from '@/payload.config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="flex-grow flex flex-col items-center justify-center px-6 py-12">
      <div className="flex flex-col items-center gap-8 max-w-2xl text-center">
        <div className="flex items-center gap-4">
          <PayloadIcon className="w-12 h-12 md:w-16 md:h-16" />
          <span className="text-4xl md:text-5xl font-bold text-muted-foreground">+</span>
          <Image
            src="/trpc-logo.png"
            alt="tRPC Logo"
            width={64}
            height={64}
            className="w-12 h-12 md:w-16 md:h-16 rounded-xl"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Payload <span className="text-muted-foreground">+</span> tRPC
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-md">
          {user
            ? `Welcome back, ${user.email}`
            : 'Type-safe APIs with end-to-end typesafety'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <a
            href={payloadConfig.routes.admin}
            className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Admin Panel
          </a>
          <a
            href="https://payloadcms.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-border font-medium rounded-lg hover:bg-accent transition-colors"
          >
            Payload Docs
          </a>
          <a
            href="https://trpc.io/docs/client/tanstack-react-query/server-components"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-border font-medium rounded-lg hover:bg-accent transition-colors"
          >
            tRPC Docs
          </a>
        </div>
      </div>
    </div>
  )
}
