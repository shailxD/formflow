import type { LucideIcon } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface KpiCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  iconColor: string
  iconBgColor: string
}

export function KpiCard({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBgColor,
}: KpiCardProps) {
  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <div className={cn('flex size-10 items-center justify-center rounded-lg', iconBgColor)}>
          <Icon className={cn('size-5', iconColor)} />
        </div>
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
      </div>
      <span className="text-2xl font-bold">{value}</span>
    </Card>
  )
}
