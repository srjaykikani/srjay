import Image from 'next/image'
import { Code2 } from 'lucide-react'

import { SectionLayout } from '@/components/Panel'
import { getMedia } from '@/lib/type-guards'
import type { Skill } from '@/payload-types'

interface TechStackSectionProps {
  skills: Skill[]
}

export function TechStackSection({ skills }: TechStackSectionProps) {
  if (skills.length === 0) return null

  return (
    <SectionLayout title="Stack" className="scroll-mt-12" id="stack">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {skills.map((skill) => {
          const image = getMedia(skill.image)
          const content = (
            <>
              <div className="relative size-10 shrink-0">
                {image?.url ? (
                  <>
                    <Image
                      src={image.url}
                      alt={image.alt || `${skill.name} logo`}
                      fill
                      className="rounded-lg object-contain select-none"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset dark:ring-white/15" />
                  </>
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Code2 className="size-4" />
                    <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset dark:ring-white/15" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground group-hover/skill:underline underline-offset-4">
                  {skill.name}
                </h3>
                {skill.description && (
                  <p className="text-xs text-muted-foreground truncate">{skill.description}</p>
                )}
              </div>
            </>
          )

          if (skill.url) {
            return (
              <a
                key={skill.id}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/skill flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
              >
                {content}
              </a>
            )
          }

          return (
            <div
              key={skill.id}
              className="flex items-center gap-3 rounded-lg p-3"
            >
              {content}
            </div>
          )
        })}
      </div>
    </SectionLayout>
  )
}
