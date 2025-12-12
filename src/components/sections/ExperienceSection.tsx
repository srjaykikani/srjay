import { format, isValid } from 'date-fns'

import { RichText } from '@/components/RichText'
import { SectionLayout } from '@/components/Panel'
import type { Experience } from '@/payload-types'

interface ExperienceSectionProps {
  experiences: Experience[]
}

/**
 * Safely parse and format a date string
 * Returns formatted date or fallback if invalid
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

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (experiences.length === 0) return null

  return (
    <SectionLayout title="Experience" className="scroll-mt-12" id="experience">
      <div className="space-y-12">
        {experiences.map((experience) => {
          const startDate = formatDate(experience.startDate)
          const endDate = experience.endDate ? formatDate(experience.endDate) : 'Present'

          return (
            <div
              key={experience.id}
              className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:h-full before:w-[1px] before:bg-border last:before:hidden"
            >
              {/* Timeline dot */}
              <div className="absolute left-[7px] top-2 size-2.5 rounded-full border border-muted-foreground/30 bg-muted" />

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-medium text-foreground text-lg">{experience.company}</h3>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {startDate} — {endDate}
                  </span>
                </div>

                <h4 className="text-base text-muted-foreground">{experience.title}</h4>

                {experience.description && (
                  <div className="mt-2 text-sm text-muted-foreground dark:prose-invert prose-p:leading-relaxed">
                    <RichText data={experience.description} />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </SectionLayout>
  )
}
