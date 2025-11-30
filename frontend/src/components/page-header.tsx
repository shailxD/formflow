interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl font-semibold sm:text-2xl">{title}</h1>
      <p className="text-xs text-muted-foreground sm:text-sm">{description}</p>
    </div>
  )
}
