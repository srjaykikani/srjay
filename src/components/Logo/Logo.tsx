import { cn } from '@/lib/utils'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <span
      className={cn(
        'font-mono text-lg font-semibold tracking-tight select-none',
        className,
      )}
    >
      S R Jay
    </span>
  )
}
