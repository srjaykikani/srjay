'use client'

import { ScrollSpy, type ScrollSpySection } from './index'

interface HomeScrollSpyProps {
  sections: ScrollSpySection[]
}

export function HomeScrollSpy({ sections }: HomeScrollSpyProps) {
  return (
    <div
      className="fixed left-0 top-1/2 -translate-y-1/2 pl-6 hidden lg:block z-50"
      style={{ whiteSpace: 'nowrap' }}
    >
      <ScrollSpy sections={sections} />
    </div>
  )
}
