import { RichText } from '@/components/RichText'
import { SectionLayout } from '@/components/Panel'
import type { Profile } from '@/payload-types'

interface AboutSectionProps {
  profile: Profile
}

export function AboutSection({ profile }: AboutSectionProps) {
  if (!profile.bio) return null

  return (
    <SectionLayout title="About" className="scroll-mt-12" id="about">
      <RichText data={profile.bio} />
    </SectionLayout>
  )
}
