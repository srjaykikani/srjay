'use client'

import { format, isValid } from 'date-fns'
import { ChevronDown, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@/components/ui/collapsible'
import { RichText } from '@/components/RichText'
import { SectionLayout } from '@/components/Panel'
import { TechTagList } from '@/components/TechTag'
import { cn } from '@/lib/utils'
import { getMedia } from '@/lib/type-guards'
import type { Experience, Skill } from '@/payload-types'

interface ExperienceSectionProps {
  experiences: Experience[]
}

/**
 * Safely parse and format a date string
 */
function formatDate(dateString: string | undefined, fallback: string = 'Unknown'): string {
  if (!dateString) return fallback
  try {
    const date = new Date(dateString)
    if (!isValid(date)) return fallback
    return format(date, 'MMM yyyy')
  } catch {
    return fallback
  }
}

/**
 * Get the date range for a company based on all positions
 */
function getCompanyDateRange(positions: Experience['positions']): { start: string; end: string } {
  if (!positions || positions.length === 0) {
    return { start: 'Unknown', end: 'Present' }
  }

  const sortedPositions = [...positions].sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  })

  const earliestStart = sortedPositions[0].startDate
  const latestPosition = sortedPositions[sortedPositions.length - 1]
  const hasCurrentPosition = positions.some((p) => !p.endDate)

  return {
    start: formatDate(earliestStart),
    end: hasCurrentPosition ? 'Present' : formatDate(latestPosition.endDate || undefined),
  }
}

const employmentTypeLabels: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  freelance: 'Freelance',
  internship: 'Internship',
}

interface ExperienceItemProps {
  experience: Experience
  defaultOpen?: boolean
}

function ExperienceItem({ experience, defaultOpen = false }: ExperienceItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const logo = getMedia(experience.logo)
  const { start, end } = getCompanyDateRange(experience.positions)
  const hasMultiplePositions = experience.positions.length > 1

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      {/* Company Header */}
      <CollapsibleTrigger className="group/exp w-full rounded-lg p-3 transition-colors hover:bg-accent">
        <div className="flex items-start gap-3">
          {/* Logo */}
          <div className="relative size-10 shrink-0">
            {logo?.url ? (
              <>
                <Image
                  src={logo.url}
                  alt={`${experience.company} logo`}
                  fill
                  className="rounded-lg object-contain select-none"
                />
                <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset dark:ring-white/15" />
              </>
            ) : (
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-foreground text-base font-medium">
                {experience.company.charAt(0).toUpperCase()}
                <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset dark:ring-white/15" />
              </div>
            )}
          </div>

          {/* Company Info */}
          <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{experience.company}</span>
                {experience.isCurrentEmployer && (
                  <Badge variant="secondary" size="sm">
                    Current
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {experience.website && (
                  <a
                    href={experience.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-6 items-center justify-center text-muted-foreground hover:text-brand transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Visit website"
                  >
                    <ExternalLink className="size-4" />
                  </a>
                )}
                <span className="hidden whitespace-nowrap text-xs text-muted-foreground sm:block">
                  {start} — {end}
                </span>
                <ChevronDown
                  className={cn(
                    'size-4 text-muted-foreground transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                />
              </div>
            </div>

            {/* Location */}
            {experience.location && (
              <span className="text-xs text-muted-foreground">{experience.location}</span>
            )}

            {/* Show most recent position title when collapsed */}
            <span className="text-left text-xs text-muted-foreground">
              {experience.positions[experience.positions.length - 1]?.title}
              {hasMultiplePositions && !isOpen && ` +${experience.positions.length - 1} more`}
            </span>
            <span className="text-xs text-muted-foreground sm:hidden">
              {start} — {end}
            </span>
          </div>
        </div>
      </CollapsibleTrigger>

      {/* Positions - reversed to show most recent first */}
      <CollapsiblePanel>
        <div className="ml-[3.25rem] py-2 pl-3">
          {[...experience.positions].reverse().map((position, index, reversedArr) => {
            const positionStart = formatDate(position.startDate)
            const positionEnd = position.endDate ? formatDate(position.endDate) : 'Present'
            const isLast = index === reversedArr.length - 1

            return (
              <div
                key={position.id || index}
                className={cn(
                  'relative pl-4',
                  !isLast && 'border-l border-border/50 pb-6',
                  isLast && 'pb-2',
                )}
              >
                {/* Timeline Dot */}
                <div
                  className={cn(
                    'absolute -left-[3.5px] top-1.5 size-1.5 rounded-full bg-muted-foreground/40',
                    'ring-4 ring-background',
                  )}
                />

                {/* Position Header */}
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between -mt-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-foreground">{position.title}</h4>
                    {position.employmentType && (
                      <Badge variant="outline" size="sm" className="hidden sm:inline-flex">
                        {employmentTypeLabels[position.employmentType] || position.employmentType}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {positionStart} — {positionEnd}
                  </span>
                </div>

                {/* Mobile Badge */}
                {position.employmentType && (
                  <Badge variant="outline" size="sm" className="mt-1 w-fit sm:hidden">
                    {employmentTypeLabels[position.employmentType] || position.employmentType}
                  </Badge>
                )}

                {/* Description */}
                {position.description && (
                  <div className="mt-2 text-xs text-muted-foreground prose-p:leading-relaxed">
                    <RichText data={position.description} />
                  </div>
                )}

                {/* Skills */}
                {position.skills && position.skills.length > 0 && (
                  <TechTagList
                    skills={position.skills.filter((s): s is Skill => typeof s !== 'string')}
                    className="mt-3"
                  />
                )}
              </div>
            )
          })}
        </div>
      </CollapsiblePanel>
    </Collapsible>
  )
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (experiences.length === 0) return null

  return (
    <SectionLayout title="Experience" className="scroll-mt-12" id="experience">
      <div className="flex flex-col gap-2">
        {experiences.map((experience, index) => (
          <ExperienceItem key={experience.id} experience={experience} defaultOpen={index === 0} />
        ))}
      </div>
    </SectionLayout>
  )
}
