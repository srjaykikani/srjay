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
      {theme === 'dark' ? (
        <Moon className="size-4" />
      ) : (
        <Sun className="size-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
