import { cn } from '@/lib/utils'

interface PanelProps extends React.ComponentProps<'section'> {
  children: React.ReactNode
}

export function Panel({ className, ...props }: PanelProps) {
  return <section data-slot="panel" className={cn(className)} {...props} />
}

interface PanelHeaderProps extends React.ComponentProps<'header'> {
  children: React.ReactNode
}

export function PanelHeader({ className, ...props }: PanelHeaderProps) {
  return <header data-slot="panel-header" className={cn('px-4 py-4', className)} {...props} />
}

interface PanelTitleProps extends React.ComponentProps<'h2'> {
  children: React.ReactNode
}

export function PanelTitle({ className, ...props }: PanelTitleProps) {
  return (
    <h2 data-slot="panel-title" className={cn('text-3xl font-semibold', className)} {...props} />
  )
}

interface PanelTitleSupProps extends React.ComponentProps<'sup'> {
  children: React.ReactNode
}

export function PanelTitleSup({ className, ...props }: PanelTitleSupProps) {
  return (
    <sup
      className={cn(
        '-top-[0.75em] ml-1 text-sm font-medium text-muted-foreground select-none',
        className,
      )}
      {...props}
    />
  )
}

interface PanelContentProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
}

export function PanelContent({ className, ...props }: PanelContentProps) {
  return <div data-slot="panel-body" className={cn('p-4', className)} {...props} />
}

export function Separator({ className }: { className?: string }) {
  return <div className={cn('h-16 w-full', className)} />
}

export function SectionLayout({
  title,
  children,
  className,
  ...props
}: {
  title: string
  children: React.ReactNode
  className?: string
} & React.ComponentProps<'section'>) {
  return (
    <section className={cn('flex flex-col md:flex-row gap-4 md:gap-8 py-6', className)} {...props}>
      <div className="md:w-48 shrink-0">
        <h2 className="text-lg md:text-xl font-medium text-muted-foreground">{title}</h2>
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </section>
  )
}
