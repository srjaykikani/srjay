import type { Media } from '@/payload-types'

/**
 * Type guard to check if a value is a Media object
 */
export function isMedia(value: unknown): value is Media {
  return (
    value !== null &&
    typeof value === 'object' &&
    'url' in value &&
    typeof (value as Media).url === 'string'
  )
}

/**
 * Safely get Media from a potentially populated field
 * Returns undefined if not a valid Media object
 */
export function getMedia(value: unknown): Media | undefined {
  return isMedia(value) ? value : undefined
}
