import Image from 'next/image'

import type { Profile } from '@/payload-types'
import { getMedia } from '@/lib/type-guards'

interface HeroSectionProps {
  profile: Profile
}

export function HeroSection({ profile }: HeroSectionProps) {
  const avatar = getMedia(profile.avatar)

  return (
    <section id="hero" className="py-8 md:py-10">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Avatar */}
        <div className="shrink-0">
          {avatar?.url ? (
            <Image
              src={avatar.url}
              alt={avatar.alt || `${profile.name} avatar`}
              width={120}
              height={120}
              className="size-20 sm:size-24 rounded-full select-none object-cover bg-muted ring-1 ring-border"
              priority
            />
          ) : (
            <div className="size-20 sm:size-24 rounded-full bg-muted ring-1 ring-border" />
          )}
        </div>

        {/* Name and Title */}
        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">{profile.name}</h1>
          {profile.title && (
            <p className="text-muted-foreground text-sm sm:text-base">{profile.title}</p>
          )}
        </div>
      </div>
    </section>
  )
}
