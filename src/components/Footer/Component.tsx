import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto px-4 py-8 md:py-12">
      <div className="mx-auto flex flex-col items-center gap-6 max-w-3xl">
        {/* Links row */}
        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="flex items-center hover:text-foreground transition-colors">
            <Logo className="text-sm" />
          </Link>

          {navItems.map(({ link }, i) => (
            <CMSLink key={i} className="hover:text-foreground transition-colors" {...link} />
          ))}
        </div>

        {/* Attribution text */}
        <div className="text-center space-y-2 text-sm text-muted-foreground/60">
          <p>Built with Next.js, Payload CMS & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
