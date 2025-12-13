import Image from 'next/image'
import Link from 'next/link'

import type { Blog, Media } from '@/payload-types'

import { cn } from '@/lib/utils'
import { getMedia } from '@/lib/type-guards'

interface BlogCardProps {
  blog: Blog
  featured?: boolean
  className?: string
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function BlogCard({ blog, featured = false, className }: BlogCardProps) {
  const image = getMedia(blog.image as Media | string | null | undefined)

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className={cn(
        'group flex flex-col rounded-xl border border-transparent bg-transparent p-2 transition-colors hover:border-border hover:bg-muted/50',
        featured && 'md:flex-row md:gap-6',
        className,
      )}
    >
      {image?.url && (
        <div
          className={cn(
            'relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted',
            featured ? 'md:w-1/2 md:shrink-0' : '',
          )}
        >
          <Image
            src={image.url}
            alt={image.alt || `${blog.title} thumbnail`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
          />
        </div>
      )}
      <div className={cn('flex flex-col gap-3 py-4 px-2', featured && 'justify-center')}>
        <p className="text-xs text-muted-foreground">{formatDate(blog.publishedAt)}</p>
        <h3
          className={cn(
            'font-semibold text-foreground transition-colors group-hover:text-primary',
            featured ? 'text-2xl' : 'text-lg',
          )}
        >
          {blog.title}
        </h3>
        {blog.summary && (
          <p
            className={cn(
              'text-muted-foreground line-clamp-2',
              featured ? 'text-base' : 'text-sm',
            )}
          >
            {blog.summary}
          </p>
        )}
      </div>
    </Link>
  )
}

interface BlogGridProps {
  blogs: Blog[]
  columns?: 1 | 2 | 3
  className?: string
}

export function BlogGrid({ blogs, columns = 2, className }: BlogGridProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 md:grid-cols-2',
        columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
