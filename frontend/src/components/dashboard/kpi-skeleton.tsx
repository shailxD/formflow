import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function KpiCardSkeleton() {
  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-lg" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-8 w-16" />
    </Card>
  )
}

export function KpiGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <KpiCardSkeleton key={i} />
      ))}
    </div>
  )
}
