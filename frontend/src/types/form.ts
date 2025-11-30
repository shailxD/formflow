import type { FormField } from '@/store/form-builder-store'

export interface FormDetails {
  internalTitle: string
  publicTitle: string | null
  description: string | null
  slug: string
  isPublished?: boolean
}

export interface FormSchema {
  formId: string
  formDetails: FormDetails
  formFields: FormField[]
  createdAt: string
  updatedAt: string
}

export interface GetFormsResponse {
  success: boolean
  data: FormSchema[]
}

export interface GetFormBySlugResponse {
  success: boolean
  data: FormSchema
}

export interface SaveFormRequest {
  formId: string
  formDetails: FormDetails
  formFields: FormField[]
}

export interface SaveFormResponse {
  success: boolean
  message: string
  data: {
    createdAt: string
    updatedAt: string
  }
}

export interface DeleteFormResponse {
  success: boolean
  message: string
  data: {
    formId: string
  }
}

export interface SubmitFormRequest {
  data: Record<string, any>
}

export interface SubmitFormResponse {
  success: boolean
  message: string
}

export interface Submission {
  submissionId: string
  formId: string
  data: Record<string, any>
  submittedAt: string
}

export interface PaginationInfo {
  page: number
  limit: number
  totalCount: number
  totalPages: number
}

export interface GetSubmissionsParams {
  page?: number
  limit?: number
  sortBy?: 'submittedAt'
  sortOrder?: 'asc' | 'desc'
}

export interface GetSubmissionsResponse {
  success: boolean
  data: Submission[]
  pagination: PaginationInfo
}

// Dashboard types
export interface DashboardStats {
  totalSubmissions: number
  totalForms: number
  totalFormFields: number
  last30DaysSubmissions: number
  avgDailySubmissions: number
}

export interface GetDashboardStatsResponse {
  success: boolean
  data: DashboardStats
}

export interface TrendDataPoint {
  date: string
  submissions: number
}

export interface GetDashboardTrendsParams {
  days?: number
}

export interface GetDashboardTrendsResponse {
  success: boolean
  data: TrendDataPoint[]
}
