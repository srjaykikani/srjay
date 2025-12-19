'use client'

import Image from 'next/image'

import { getMedia } from '@/lib/type-guards'
import { usePhotoSwipe } from '@/hooks/usePhotoSwipe'
import type { Gallery, Media } from '@/payload-types'

interface MasonryGridProps {
  items: Gallery[]
  columns?: number
}

export function MasonryGrid({ items, columns: _columns = 2 }: MasonryGridProps) {
  // Initialize PhotoSwipe
  usePhotoSwipe([items])

  if (items.length === 0) {
    return (
      <div className="flex min-h-[240px] items-center justify-center rounded-xl border border-border bg-muted/40">
        <p className="text-sm text-muted-foreground">Gallery coming soon. Check back shortly!</p>
      </div>
    )
  }

  return (
    <div data-pswp-gallery="gallery" className="masonry-grid">
      {items.map((item, index) => (
        <GalleryItem key={item.id} item={item} index={index} />
      ))}
    </div>
  )
}

interface GalleryItemProps {
  item: Gallery
  index: number
}

function GalleryItem({ item, index }: GalleryItemProps) {
  const media = getMedia(item.image) as Media | null

  if (!media?.url) {
    return (
      <div className="relative w-full overflow-hidden rounded-xl border border-border bg-muted/40 aspect-[4/3]">
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-muted-foreground">No image</span>
        </div>
      </div>
    )
  }

  // Use original image dimensions
  const width = media.width || 1200
  const height = media.height || 800
  const aspectRatio = `${width} / ${height}`

  return (
    <a
      href={media.url}
      data-pswp-width={width}
      data-pswp-height={height}
      data-cropped="true"
      target="_blank"
      rel="noreferrer"
      className="masonry-item group relative block w-full overflow-hidden rounded-xl border border-border bg-muted/40 transition-all duration-300 hover:border-border/80 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
      style={{ aspectRatio }}
    >
      <Image
        src={media.url}
        alt={media.alt || item.title || 'Gallery image'}
        fill
        priority={index < 4}
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/15" />

      {/* Caption shown on hover */}
      {(item.title || item.description) && (
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex flex-col gap-1 p-3 text-white">
            {item.title && <h3 className="text-sm font-medium drop-shadow-sm">{item.title}</h3>}
            {item.description && (
              <p className="text-xs text-white/80 line-clamp-2">{item.description}</p>
            )}
          </div>
        </div>
      )}
    </a>
  )
}
