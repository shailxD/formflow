import { Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import {
  ChartSkeleton,
  KpiGrid,
  KpiGridSkeleton,
  SubmissionTrendsChart,
} from '@/components/dashboard'
import {
  useSuspenseDashboardStats,
  useSuspenseDashboardTrends,
} from '@/hooks/queries/use-dashboard'

export const Route = createFileRoute('/_app/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your forms and submissions
        </p>
      </div>

      <Suspense fallback={<KpiGridSkeleton />}>
        <DashboardStats />
      </Suspense>

      <Suspense fallback={<ChartSkeleton />}>
        <DashboardTrends />
      </Suspense>
    </div>
  )
}

function DashboardStats() {
  const { data } = useSuspenseDashboardStats()
  return <KpiGrid stats={data.data} />
}

function DashboardTrends() {
  const { data } = useSuspenseDashboardTrends({ days: 7 })
  return <SubmissionTrendsChart data={data.data} />
}
