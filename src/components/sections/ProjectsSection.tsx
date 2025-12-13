'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Box, ChevronDown, ExternalLink, Github } from 'lucide-react'

import { SectionLayout } from '@/components/Panel'
import { TechTagList } from '@/components/TechTag'
import { RichText } from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@/components/ui/collapsible'
import type { Project, Skill } from '@/payload-types'
import { getMedia } from '@/lib/type-guards'
import { cn } from '@/lib/utils'

interface ProjectsSectionProps {
  projects: Project[]
}

interface ProjectItemProps {
  project: Project
  defaultOpen?: boolean
}

function ProjectItem({ project, defaultOpen = false }: ProjectItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const image = getMedia(project.image)
  const technologies = project.technologies || []

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="group/project w-full rounded-lg p-3 transition-colors hover:bg-accent">
        <div className="flex items-start gap-3">
          {/* Project Image/Icon */}
          <div className="relative size-10 shrink-0">
            {image?.url ? (
              <>
                <Image
                  src={image.url}
                  alt={image.alt || `${project.title} screenshot`}
                  fill
                  className="rounded-lg object-cover select-none"
                />
                <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset dark:ring-white/15" />
              </>
            ) : (
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Box className="size-4" />
                <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset dark:ring-white/15" />
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
            <div className="flex w-full items-center justify-between gap-2">
              <h3 className="text-sm font-medium text-foreground text-left">
                {project.title}
              </h3>
              <div className="flex items-center gap-2">
                {/* External Links */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-6 items-center justify-center text-muted-foreground hover:text-brand transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="View live site"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-6 items-center justify-center text-muted-foreground hover:text-brand transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="View source code"
                  >
                    <Github className="size-4" />
                  </a>
                )}
                <ChevronDown
                  className={cn(
                    'size-4 text-muted-foreground transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                />
              </div>
            </div>

            {/* Description preview when collapsed */}
            {project.description && (
              <p className="text-xs text-muted-foreground text-left line-clamp-2">
                {project.description}
              </p>
            )}
          </div>
        </div>
      </CollapsibleTrigger>

      {/* Expanded Content */}
      <CollapsiblePanel>
        <div className="ml-[3.25rem] py-2 pl-3 space-y-4">
          {/* Full Description */}
          {project.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          )}

          {/* Rich Text Content */}
          {project.content && (
            <div className="text-sm text-muted-foreground prose-p:leading-relaxed">
              <RichText data={project.content} />
            </div>
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <TechTagList
              skills={technologies.filter((t): t is Skill => typeof t !== 'string')}
            />
          )}
        </div>
      </CollapsiblePanel>
    </Collapsible>
  )
}

const INITIAL_SHOW = 4

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [showAll, setShowAll] = useState(false)

  if (projects.length === 0) return null

  const displayedProjects = showAll ? projects : projects.slice(0, INITIAL_SHOW)
  const hasMore = projects.length > INITIAL_SHOW

  return (
    <SectionLayout title="Projects" className="scroll-mt-12" id="projects">
      <div className="flex flex-col gap-2">
        {displayedProjects.map((project, index) => (
          <ProjectItem key={project.id} project={project} defaultOpen={index === 0} />
        ))}

        {hasMore && (
          <Button
            variant="link"
            size="sm"
            className="w-fit text-muted-foreground hover:text-brand"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `Show ${projects.length - INITIAL_SHOW} More`}
            <ChevronDown
              className={`size-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
            />
          </Button>
        )}
      </div>
    </SectionLayout>
  )
}
