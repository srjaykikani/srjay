import { Mail, Phone, ArrowUpRight } from 'lucide-react'

import { SectionLayout } from '@/components/Panel'
import type { Profile } from '@/payload-types'

interface ContactSectionProps {
  profile: Profile
}

export function ContactSection({ profile }: ContactSectionProps) {
  if (!profile.email && !profile.phone) return null

  return (
    <SectionLayout title="Contact" className="scroll-mt-12" id="contact">
      <div className="flex flex-col gap-2">
        {profile.email && (
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Mail className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground group-hover:underline underline-offset-4">
                Email
              </p>
              <p className="text-xs text-muted-foreground truncate">{profile.email}</p>
            </div>
            <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        )}
        {profile.phone && (
          <a
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Phone className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground group-hover:underline underline-offset-4">
                Phone
              </p>
              <p className="text-xs text-muted-foreground truncate">{profile.phone}</p>
            </div>
            <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        )}
      </div>
    </SectionLayout>
  )
}
