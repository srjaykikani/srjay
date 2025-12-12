import { Suspense } from 'react'

import { getPayload } from 'payload'

import config from '@payload-config'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { GitHubSection, GitHubContributionFallback } from '@/components/sections/GitHubSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { OverviewSection } from '@/components/sections/OverviewSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { SocialLinksSection } from '@/components/sections/SocialLinksSection'
import { TechStackSection } from '@/components/sections/TechStackSection'
import { getGitHubContributions } from '@/lib/github-contributions'
import { SectionLayout } from '@/components/Panel'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Fetch all data in parallel
  const [profile, projects, experiences, skills] = await Promise.all([
    payload.findGlobal({
      slug: 'profile',
      depth: 2,
    }),
    payload.find({
      collection: 'projects',
      where: { featured: { equals: true } },
      sort: '-order',
      depth: 1,
      limit: 10,
    }),
    payload.find({
      collection: 'experiences',
      sort: '-order',
      depth: 1,
      limit: 20,
    }),
    payload.find({
      collection: 'skills',
      sort: '-order',
      depth: 0,
      limit: 100,
    }),
  ])

  const githubUsername = profile.github || 'srjaykikani'
  const contributions = getGitHubContributions(githubUsername)

  return (
    <main className="max-w-screen overflow-x-hidden px-4 sm:px-6 py-4">
      <div className="mx-auto md:max-w-3xl flex flex-col">
        <HeroSection profile={profile} />
        <OverviewSection profile={profile} />
        <AboutSection profile={profile} />
        <SocialLinksSection profile={profile} />
        <SectionLayout title="GitHub" className="scroll-mt-12" id="github">
          <Suspense fallback={<GitHubContributionFallback />}>
            <GitHubSection username={githubUsername} contributions={contributions} />
          </Suspense>
        </SectionLayout>
        <TechStackSection skills={skills.docs} />
        <ExperienceSection experiences={experiences.docs} />
        <ProjectsSection projects={projects.docs} />
        <ContactSection profile={profile} />
      </div>
    </main>
  )
}
