import apiClient from '@/lib/api-client'
import type {
  GetDashboardStatsResponse,
  GetDashboardTrendsParams,
  GetDashboardTrendsResponse,
} from '@/types/form'

export const getDashboardStats = async (): Promise<GetDashboardStatsResponse> => {
  const response = await apiClient.get<GetDashboardStatsResponse>(
    '/api/dashboard/stats',
  )
  return response.data
}

export const getDashboardTrends = async (
  params?: GetDashboardTrendsParams,
): Promise<GetDashboardTrendsResponse> => {
  const response = await apiClient.get<GetDashboardTrendsResponse>(
    '/api/dashboard/trends',
    { params },
  )
  return response.data
}
