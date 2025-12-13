import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type CMSLinkType = {
  appearance?: 'inline' | 'default' | 'outline' | 'link'
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  type?: 'custom' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    url,
  } = props

  const href = url || ''

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const baseStyles = 'transition-colors duration-200'

  const appearanceStyles: Record<string, string> = {
    inline: '',
    default: 'px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90',
    outline: 'px-4 py-2 border border-border rounded-md hover:bg-accent',
    link: 'hover:text-primary underline-offset-4 hover:underline',
  }

  return (
    <Link
      className={cn(baseStyles, appearanceStyles[appearance], className)}
      href={href}
      {...newTabProps}
    >
      {label && label}
      {children && children}
    </Link>
  )
}
