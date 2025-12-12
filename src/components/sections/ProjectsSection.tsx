'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box, ChevronDown, ExternalLink } from 'lucide-react'

import { SectionLayout } from '@/components/Panel'
import { Button } from '@/components/ui/button'
import type { Project } from '@/payload-types'
import { getMedia } from '@/lib/type-guards'

interface ProjectsSectionProps {
  projects: Project[]
}

const INITIAL_SHOW = 4

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [showAll, setShowAll] = useState(false)

  if (projects.length === 0) return null

  const displayedProjects = showAll ? projects : projects.slice(0, INITIAL_SHOW)
  const hasMore = projects.length > INITIAL_SHOW

  return (
    <SectionLayout title="Projects" className="scroll-mt-12" id="projects">
      <div className="flex flex-col gap-6">
        {displayedProjects.map((project) => {
          const image = getMedia(project.image)
          const tags = project.tags || []

          return (
            <Link key={project.id} href={`/projects/${project.slug}`} className="group block">
              <div className="flex gap-4 items-start">
                <div className="shrink-0 pt-1">
                  {image?.url ? (
                    <div className="relative size-12 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={image.url}
                        alt={image.alt || `${project.title} screenshot`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex size-12 items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/50">
                      <Box className="size-5 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium text-foreground group-hover:underline underline-offset-4">
                      {project.title}
                    </h3>
                    {project.liveUrl && (
                      <ExternalLink className="size-4 text-muted-foreground shrink-0" />
                    )}
                  </div>

                  {project.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tags.slice(0, 4).map((tagItem, index) => (
                        <span
                          key={index}
                          className="tag text-xs px-1.5 py-0.5 bg-muted text-muted-foreground rounded-md border border-border"
                        >
                          {tagItem.tag}
                        </span>
                      ))}
                      {tags.length > 4 && (
                        <span className="text-xs text-muted-foreground">+{tags.length - 4}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          )
        })}

        {hasMore && (
          <div className="pt-2">
            <Button
              variant="ghost"
              className="h-auto p-0 text-muted-foreground hover:text-foreground font-normal"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'Show More'}
              <ChevronDown
                className={`size-4 ml-1 transition-transform ${showAll ? 'rotate-180' : ''}`}
              />
            </Button>
          </div>
        )}
      </div>
    </SectionLayout>
  )
}
