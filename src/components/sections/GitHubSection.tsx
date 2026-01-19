'use client'

import { LoaderIcon } from 'lucide-react'
import { use } from 'react'

import type { Activity } from '@/components/kibo-ui/contribution-graph'
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from '@/components/kibo-ui/contribution-graph'

interface GitHubSectionProps {
  username: string
  contributions: Promise<Activity[]>
}

export function GitHubContributionFallback() {
  return (
    <div className="flex h-[162px] w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  )
}

export function GitHubSection({ username, contributions }: GitHubSectionProps) {
  const data = use(contributions)

  if (!username) return null

  // Use smaller blocks to fit within container without horizontal scroll
  // Container max-width is ~768px (md:max-w-3xl)
  // For 53 weeks: 53 * (blockSize + blockMargin) - blockMargin should fit
  // With blockSize=10, blockMargin=3: 53 * 13 - 3 = 686px (fits well)
  return (
    <ContributionGraph
      className=""
      data={data}
      blockSize={10}
      blockMargin={3}
      blockRadius={2}
      fontSize={11}
    >
      <ContributionGraphCalendar className="no-scrollbar" title="GitHub Contributions">
        {({ activity, dayIndex, weekIndex }) => (
          <ContributionGraphBlock activity={activity} dayIndex={dayIndex} weekIndex={weekIndex} />
        )}
      </ContributionGraphCalendar>

      <ContributionGraphFooter>
        <ContributionGraphTotalCount>
          {({ totalCount }) => (
            <div className="text-muted-foreground text-xs">
              {totalCount.toLocaleString('en')} contributions in the last year on{' '}
              <a
                className="font-medium underline underline-offset-4"
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </div>
          )}
        </ContributionGraphTotalCount>

        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  )
}
