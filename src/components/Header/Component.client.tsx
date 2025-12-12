'use client'
import { Github } from 'lucide-react'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

const sectionLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [affix, setAffix] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const handleScroll = () => {
      setAffix(window.scrollY >= 8)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      data-affix={affix}
      className="sticky top-0 z-50 w-full bg-background px-8 md:px-16 lg:px-24 pt-2 transition-shadow duration-300"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="flex h-12 items-center">
        {/* Left: Logo/Name */}
        <Link href="/" aria-label="Home" className="shrink-0">
          <Logo />
        </Link>

        {/* Center: Section navigation for homepage */}
        <div className="flex-1 flex justify-center">
          {isHomePage && (
            <nav className="hidden md:flex gap-6 items-center">
              {sectionLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          )}
        </div>

        {/* Right: GitHub & Theme icons */}
        <div className="flex items-center shrink-0">
          <a
            href="https://github.com/srjaykikani"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="GitHub"
          >
            <Github className="size-4" />
          </a>
          <span className="mx-2 flex h-4 w-px bg-border" />
          <ThemeToggle />
        </div>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
