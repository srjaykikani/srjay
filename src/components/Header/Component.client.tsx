'use client'
import { Github } from 'lucide-react'
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 px-8 md:px-16 lg:px-24">
      <div className="flex h-14 items-center">
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
          <a
            href="https://github.com/srjaykikani"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="GitHub"
          >
            <Github className="size-4" />
          </a>
          <span className="flex h-4 w-px bg-border" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
