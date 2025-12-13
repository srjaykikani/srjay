import { Mail, Phone } from 'lucide-react'

import { SectionLayout } from '@/components/Panel'
import { Button } from '@/components/ui/button'
import type { Profile } from '@/payload-types'

interface ContactSectionProps {
  profile: Profile
}

export function ContactSection({ profile }: ContactSectionProps) {
  if (!profile.email && !profile.phone) return null

  return (
    <SectionLayout title="Contact" className="scroll-mt-12" id="contact">
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-balance">
          Interested in working together? Feel free to reach out.
        </p>
        <div className="flex flex-wrap gap-2">
          {profile.email && (
            <Button
              variant="outline"
              size="sm"
              render={<a href={`mailto:${profile.email}`} />}
            >
              <Mail className="size-4" />
              {profile.email}
            </Button>
          )}
          {profile.phone && (
            <Button
              variant="outline"
              size="sm"
              render={<a href={`tel:${profile.phone.replace(/\s/g, '')}`} />}
            >
              <Phone className="size-4" />
              {profile.phone}
            </Button>
          )}
        </div>
      </div>
    </SectionLayout>
  )
}
