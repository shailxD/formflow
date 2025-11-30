import { useSuspenseQuery } from '@tanstack/react-query'
import { getDashboardStats, getDashboardTrends } from '@/api/dashboard-api'
import type { GetDashboardTrendsParams } from '@/types/form'

export const dashboardStatsQueryOptions = () => ({
  queryKey: ['dashboard', 'stats'],
  queryFn: getDashboardStats,
})

export const useSuspenseDashboardStats = () => {
  return useSuspenseQuery(dashboardStatsQueryOptions())
}

export const dashboardTrendsQueryOptions = (params?: GetDashboardTrendsParams) => ({
  queryKey: ['dashboard', 'trends', params],
  queryFn: () => getDashboardTrends(params),
})

export const useSuspenseDashboardTrends = (params?: GetDashboardTrendsParams) => {
  return useSuspenseQuery(dashboardTrendsQueryOptions(params))
}
