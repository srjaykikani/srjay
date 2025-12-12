import { Mail, Phone } from 'lucide-react'

import { SectionLayout } from '@/components/Panel'
import type { Profile } from '@/payload-types'

interface ContactSectionProps {
  profile: Profile
}

export function ContactSection({ profile }: ContactSectionProps) {
  if (!profile.email && !profile.phone) return null

  return (
    <SectionLayout title="Contact" className="scroll-mt-12" id="contact">
      <div className="space-y-4">
        <p className="text-muted-foreground text-balance">
          Interested in working together? Feel free to reach out.
        </p>
        <div className="flex flex-wrap gap-3">
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors"
            >
              <Mail className="size-4 text-muted-foreground" />
              {profile.email}
            </a>
          )}
          {profile.phone && (
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors"
            >
              <Phone className="size-4 text-muted-foreground" />
              {profile.phone}
            </a>
          )}
        </div>
      </div>
    </SectionLayout>
  )
}
