'use client'

import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 lg:px-16 xl:px-24">
      <div className="w-full flex h-14 items-center">
        {/* Left: Logo/Name */}
        <Link href="/" aria-label="Home" className="shrink-0">
          <Logo />
        </Link>

        {/* Center: CMS Navigation */}
        <div className="flex-1 flex justify-center">
          <HeaderNav data={data} />
        </div>

        {/* Right: GitHub & Theme icons */}
        <div className="flex items-center shrink-0 gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
