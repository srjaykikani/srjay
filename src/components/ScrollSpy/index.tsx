'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface ScrollSpySection {
  id: string
  title: string
}

interface ScrollSpyProps {
  sections: ScrollSpySection[]
  className?: string
}

export function ScrollSpy({ sections, className }: ScrollSpyProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        {
          rootMargin: '-20% 0px -70% 0px',
          threshold: 0,
        },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sections])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - 80

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className={cn('flex flex-col gap-6', className)}>
      {sections.map(({ id, title }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={cn(
            'group flex items-center gap-2 text-left text-base transition-colors duration-200 cursor-pointer',
            activeSection === id
              ? 'text-foreground'
              : 'text-muted-foreground/50 hover:text-muted-foreground',
          )}
        >
          <span
            className={cn(
              'h-px transition-all duration-200',
              activeSection === id
                ? 'w-8 bg-foreground'
                : 'w-4 bg-muted-foreground/50 group-hover:w-6 group-hover:bg-muted-foreground',
            )}
          />
          <span>{title}</span>
        </button>
      ))}
    </nav>
  )
}
