'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    // Find all headings in the article/content area
    const article = document.querySelector('article, .prose')
    if (!article) return

    const elements = article.querySelectorAll('h2, h3')
    const items: TOCItem[] = []

    elements.forEach((element, index) => {
      // Generate ID if not present
      if (!element.id) {
        element.id = `heading-${index}`
      }

      items.push({
        id: element.id,
        text: element.textContent || '',
        level: element.tagName === 'H2' ? 2 : 3,
      })
    })

    setHeadings(items)
  }, [])

  useEffect(() => {
    if (headings.length === 0) return

    const observers: IntersectionObserver[] = []

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id)
            }
          })
        },
        {
          rootMargin: '-80px 0px -70% 0px',
          threshold: 0,
        },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [headings])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - 100

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  if (headings.length === 0) return null

  return (
    <nav className={cn('flex flex-col gap-3', className)}>
      <span className="text-sm font-medium text-muted-foreground mb-2">On this page</span>
      {headings.map(({ id, text, level }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={cn(
            'group flex items-center gap-2 text-left text-sm transition-colors duration-200 cursor-pointer',
            level === 3 && 'pl-4',
            activeId === id
              ? 'text-brand'
              : 'text-muted-foreground/60 hover:text-muted-foreground',
          )}
        >
          <span
            className={cn(
              'h-px transition-all duration-200',
              activeId === id
                ? 'w-3 bg-brand'
                : 'w-1.5 bg-muted-foreground/40 group-hover:w-2 group-hover:bg-muted-foreground',
            )}
          />
          <span className="line-clamp-2">{text}</span>
        </button>
      ))}
    </nav>
  )
}
