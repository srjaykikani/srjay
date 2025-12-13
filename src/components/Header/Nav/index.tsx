'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()

  return (
    <nav className="flex gap-6 items-center">
      {navItems.map(({ link }, i) => {
        const href = link.url || ''
        const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className={isActive ? 'text-brand font-medium' : 'text-muted-foreground hover:text-foreground'}
          />
        )
      })}
    </nav>
  )
}
