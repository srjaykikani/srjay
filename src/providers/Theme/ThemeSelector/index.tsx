'use client'

import React, { useState } from 'react'

import type { Theme } from '../types'

import { useTheme } from '..'
import { themeLocalStorageKey } from '../types'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')

  const onThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const themeToSet = e.target.value as Theme | 'auto'
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  return (
    <select
      aria-label="Select a theme"
      className="bg-transparent border border-border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      onChange={onThemeChange}
      value={value}
    >
      <option value="auto">Auto</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  )
}
