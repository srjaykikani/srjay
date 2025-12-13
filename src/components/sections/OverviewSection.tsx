'use client'

import { TZDate, tzOffset } from '@date-fns/tz'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import {
  Briefcase,
  Clock1Icon,
  Clock2Icon,
  Clock3Icon,
  Clock4Icon,
  Clock5Icon,
  Clock6Icon,
  Clock7Icon,
  Clock8Icon,
  Clock9Icon,
  Clock10Icon,
  Clock11Icon,
  Clock12Icon,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from 'lucide-react'

import { SectionLayout } from '@/components/Panel'
import type { Profile } from '@/payload-types'

const CLOCK_ICONS: Record<number, LucideIcon> = {
  1: Clock1Icon,
  2: Clock2Icon,
  3: Clock3Icon,
  4: Clock4Icon,
  5: Clock5Icon,
  6: Clock6Icon,
  7: Clock7Icon,
  8: Clock8Icon,
  9: Clock9Icon,
  10: Clock10Icon,
  11: Clock11Icon,
  12: Clock12Icon,
}

interface OverviewSectionProps {
  profile: Profile
}

function IntroItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex items-center gap-2.5 text-sm ${className || ''}`}>{children}</div>
}

function IntroItemIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-4 shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:text-muted-foreground [&_svg]:size-4">
      {children}
    </div>
  )
}

function CurrentLocalTimeItem({ timeZone }: { timeZone: string }) {
  const [timeString, setTimeString] = useState<string>('')
  const [diffText, setDiffText] = useState<string>('')
  const [ClockIcon, setClockIcon] = useState<LucideIcon>(Clock12Icon)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      // Get time in target timezone using TZDate
      const targetTime = TZDate.tz(timeZone)
      const formattedTime = format(targetTime, 'HH:mm')
      setTimeString(formattedTime)

      // Get hour for clock icon (1-12)
      const hour = targetTime.getHours()
      const hour12 = hour % 12 || 12
      setClockIcon(CLOCK_ICONS[hour12])

      // Calculate timezone offset difference using tzOffset
      const viewerOffset = -now.getTimezoneOffset() // in minutes
      const targetOffset = tzOffset(timeZone, now) // in minutes

      const minutesDiff = Math.abs(targetOffset - viewerOffset)
      const hoursDiff = minutesDiff / 60

      let diff = ''
      if (hoursDiff < 1) {
        diff = ' // same time'
      } else {
        const hours = Math.floor(hoursDiff)
        const isAhead = targetOffset > viewerOffset
        diff = ` // ${hours}h ${isAhead ? 'ahead' : 'behind'}`
      }
      setDiffText(diff)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [timeZone])

  if (!timeString) {
    return (
      <IntroItem>
        <IntroItemIcon>
          <Clock12Icon />
        </IntroItemIcon>
        <span>00:00</span>
      </IntroItem>
    )
  }

  return (
    <IntroItem>
      <IntroItemIcon>
        <ClockIcon />
      </IntroItemIcon>
      <span aria-label={`Current local time: ${timeString}`}>
        <span>{timeString}</span>
        <span className="text-muted-foreground" aria-hidden="true">
          {diffText}
        </span>
      </span>
    </IntroItem>
  )
}

export function OverviewSection({ profile }: OverviewSectionProps) {
  return (
    <SectionLayout title="Overview" className="scroll-mt-12 py-6" id="overview">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {profile.title && (
          <IntroItem>
            <IntroItemIcon>
              <Briefcase />
            </IntroItemIcon>
            <span className="text-balance">{profile.title}</span>
          </IntroItem>
        )}

        {/* Founder @ChallengeRate */}
        <IntroItem>
          <IntroItemIcon>
            <ExternalLink />
          </IntroItemIcon>
          <a
            href="https://challengerate.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline text-balance"
          >
            Founder @ChallengeRate
          </a>
        </IntroItem>

        {profile.location && (
          <IntroItem>
            <IntroItemIcon>
              <MapPin />
            </IntroItemIcon>
            <span className="text-balance">{profile.location}</span>
          </IntroItem>
        )}

        {profile.timezone && <CurrentLocalTimeItem timeZone={profile.timezone} />}

        {profile.email && (
          <IntroItem>
            <IntroItemIcon>
              <Mail />
            </IntroItemIcon>
            <a
              href={`mailto:${profile.email}`}
              className="underline-offset-4 hover:underline text-balance"
            >
              {profile.email}
            </a>
          </IntroItem>
        )}

        {profile.phone && (
          <IntroItem>
            <IntroItemIcon>
              <Phone />
            </IntroItemIcon>
            <a
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
              className="underline-offset-4 hover:underline text-balance"
            >
              {profile.phone}
            </a>
          </IntroItem>
        )}
      </div>
    </SectionLayout>
  )
}
