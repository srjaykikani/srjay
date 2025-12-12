import { unstable_cache } from 'next/cache'

import type { Activity } from '@/components/kibo-ui/contribution-graph'

type GitHubContributionsResponse = {
  contributions: Activity[]
}

export const getGitHubContributions = (username: string) =>
  unstable_cache(
    async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
        )

        if (!res.ok) {
          console.error(`GitHub contributions API returned ${res.status}`)
          return []
        }

        const data = (await res.json()) as unknown

        // Validate response structure
        if (
          data &&
          typeof data === 'object' &&
          'contributions' in data &&
          Array.isArray((data as GitHubContributionsResponse).contributions)
        ) {
          return (data as GitHubContributionsResponse).contributions
        }

        return []
      } catch (error) {
        console.error('Failed to fetch GitHub contributions:', error)
        return []
      }
    },
    [`github-contributions-${username}`],
    { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
  )()
