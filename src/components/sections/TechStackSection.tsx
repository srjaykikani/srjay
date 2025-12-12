import { SectionLayout } from '@/components/Panel'
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { Skill } from '@/payload-types'

interface TechStackSectionProps {
  skills: Skill[]
}

export function TechStackSection({ skills }: TechStackSectionProps) {
  if (skills.length === 0) return null

  return (
    <SectionLayout title="Stack" className="scroll-mt-12" id="stack">
      <TooltipProvider>
        <ul className="flex flex-wrap gap-2 select-none">
          {skills.map((skill) => (
            <li key={skill.id}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    skill.url ? (
                      <a
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-sm hover:text-foreground hover:bg-accent transition-colors"
                      >
                        {skill.name}
                      </a>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-muted text-muted-foreground text-sm cursor-default">
                        {skill.name}
                      </span>
                    )
                  }
                />
                <TooltipPopup>{skill.name}</TooltipPopup>
              </Tooltip>
            </li>
          ))}
        </ul>
      </TooltipProvider>
    </SectionLayout>
  )
}
