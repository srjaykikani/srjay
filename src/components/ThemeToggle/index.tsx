'use client'

import { Moon, Sun } from 'lucide-react'
import { useCallback } from 'react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/providers/Theme'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      <Moon className="relative hidden [html[data-theme='dark']_&]:block size-4" />
      <Sun className="relative hidden [html[data-theme='light']_&]:block size-4" />
      <span className="sr-only">Theme Toggle</span>
    </Button>
  )
}
