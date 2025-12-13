'use client'

import { useEffect } from 'react'
import { initPhotoSwipe, destroyPhotoSwipe } from '@/scripts/photoswipe'

/**
 * Hook to initialize PhotoSwipe for gallery elements
 * Call this in components that contain [data-pswp-gallery] elements
 */
export function usePhotoSwipe(deps: unknown[] = []) {
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initPhotoSwipe()
    }, 100)

    return () => {
      clearTimeout(timer)
      destroyPhotoSwipe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
