import Image from 'next/image'

import { cn } from '@/lib/utils'
import { getMedia } from '@/lib/type-guards'
import type { Skill } from '@/payload-types'

interface TechTagProps {
  skill: Skill | string
  className?: string
}

/**
 * Tech tag component that displays a skill/technology with its icon
 * Used consistently across Experience and Projects sections
 */
export function TechTag({ skill, className }: TechTagProps) {
  // Handle string-only skills (legacy/fallback)
  if (typeof skill === 'string') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground',
          className,
        )}
      >
        {skill}
      </span>
    )
  }

  const image = getMedia(skill.image)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground',
        className,
      )}
    >
      {image?.url ? (
        <span className="relative size-4 shrink-0">
          <Image
            src={image.url}
            alt={`${skill.name} icon`}
            fill
            className="object-contain"
          />
        </span>
      ) : null}
      <span>{skill.name}</span>
    </span>
  )
}

interface TechTagListProps {
  skills: (Skill | string)[]
  maxVisible?: number
  className?: string
}

/**
 * Renders a list of tech tags with optional "show more" truncation
 */
export function TechTagList({ skills, maxVisible, className }: TechTagListProps) {
  if (!skills || skills.length === 0) return null

  const visibleSkills = maxVisible ? skills.slice(0, maxVisible) : skills
  const hiddenCount = maxVisible ? Math.max(0, skills.length - maxVisible) : 0

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {visibleSkills.map((skill, index) => (
        <TechTag key={typeof skill === 'string' ? index : skill.id} skill={skill} />
      ))}
      {hiddenCount > 0 && (
        <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          +{hiddenCount}
        </span>
      )}
    </div>
  )
}
