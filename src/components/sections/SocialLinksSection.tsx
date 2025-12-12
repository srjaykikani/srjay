import { ArrowUpRightIcon } from 'lucide-react'
import Image from 'next/image'

import { SectionLayout } from '@/components/Panel'
import type { Profile } from '@/payload-types'

interface SocialLinksSectionProps {
  profile: Profile
}

// Social media icon URLs
const iconUrlMap: Record<string, string> = {
  github: 'https://assets.chanhdai.com/images/link-icons/github.webp',
  twitter: 'https://assets.chanhdai.com/images/link-icons/x.webp',
  instagram: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png',
  linkedin: 'https://assets.chanhdai.com/images/link-icons/linkedin.webp',
  youtube: 'https://assets.chanhdai.com/images/link-icons/youtube.webp',
  email: 'https://assets.chanhdai.com/images/link-icons/email.webp',
}

function extractUsername(url: string, platform: string): string {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname.replace(/^\/+|\/+$/g, '')

    if (platform === 'email') {
      return url.replace('mailto:', '')
    }

    if (platform === 'twitter') {
      return pathname ? `@${pathname.split('/')[0]}` : '@twitter'
    }

    if (platform === 'instagram') {
      return pathname ? `@${pathname.split('/')[0]}` : '@instagram'
    }

    if (platform === 'youtube') {
      const match = pathname.match(/@?([^/]+)/)
      return match ? `@${match[1].replace('@', '')}` : '@youtube'
    }

    // For github, linkedin - just return the username part
    return pathname.split('/')[0] || platform
  } catch {
    return platform
  }
}

export function SocialLinksSection({ profile }: SocialLinksSectionProps) {
  const socialLinks = profile.socialLinks || []

  if (socialLinks.length === 0) return null

  return (
    <SectionLayout title="Connect" className="scroll-mt-12" id="social">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {socialLinks.map((link, index) => {
          const iconUrl = iconUrlMap[link.platform]
          const title = link.label || link.platform.charAt(0).toUpperCase() + link.platform.slice(1)
          const description = extractUsername(link.url, link.platform)

          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex cursor-pointer items-center gap-4 p-4 pr-2 transition-colors hover:bg-accent rounded-lg"
            >
              <div className="relative size-12 shrink-0">
                {iconUrl ? (
                  <Image
                    className="rounded-xl select-none"
                    src={iconUrl}
                    alt={title}
                    width={48}
                    height={48}
                    quality={100}
                    unoptimized
                  />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-xl bg-muted text-foreground text-lg font-medium">
                    {title.charAt(0)}
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/15" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="flex items-center font-medium underline-offset-4 group-hover/link:underline">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground truncate">{description}</p>
              </div>

              <ArrowUpRightIcon className="size-4 text-muted-foreground shrink-0" />
            </a>
          )
        })}
      </div>
    </SectionLayout>
  )
}
