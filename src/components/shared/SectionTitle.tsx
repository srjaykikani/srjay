import { cn } from '@/lib/utils'

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function SectionTitle({ children, className, id }: SectionTitleProps) {
  return (
    <h2
      id={id}
      className={cn('text-lg font-semibold text-foreground mb-6', className)}
    >
      {children}
    </h2>
  )
}
