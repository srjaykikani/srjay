import type { Theme } from './types'

import { themeLocalStorageKey, defaultTheme } from './types'

export { themeLocalStorageKey, defaultTheme }

export const getImplicitPreference = (): Theme | null => {
  const mediaQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia(mediaQuery)
  const hasImplicitPreference = typeof mql.matches === 'boolean'

  if (hasImplicitPreference) {
    return mql.matches ? 'dark' : 'light'
  }

  return null
}
