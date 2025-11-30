import apiClient from '@/lib/api-client'
import type {
  SaveFormRequest,
  SaveFormResponse,
  DeleteFormResponse,
  GetFormsResponse,
  GetFormBySlugResponse,
  SubmitFormRequest,
  SubmitFormResponse,
  GetSubmissionsResponse,
  GetSubmissionsParams,
} from '@/types/form'

export const getForms = async (): Promise<GetFormsResponse> => {
  const response = await apiClient.get<GetFormsResponse>('/api/form-schema')
  return response.data
}

export const getFormBySlug = async (
  slug: string,
): Promise<GetFormBySlugResponse> => {
  const response = await apiClient.get<GetFormBySlugResponse>(
    `/api/form-schema/${slug}`,
  )
  return response.data
}

export const saveForm = async (
  data: SaveFormRequest,
): Promise<SaveFormResponse> => {
  const response = await apiClient.post<SaveFormResponse>(
    '/api/form-schema',
    data,
  )
  return response.data
}

export const submitForm = async (
  slug: string,
  data: SubmitFormRequest,
): Promise<SubmitFormResponse> => {
  const response = await apiClient.post<SubmitFormResponse>(
    `/api/submissions/${slug}`,
    data,
  )
  return response.data
}

export const getSubmissions = async (
  formId: string,
  params?: GetSubmissionsParams,
): Promise<GetSubmissionsResponse> => {
  const response = await apiClient.get<GetSubmissionsResponse>(
    `/api/submissions/${formId}`,
    { params },
  )
  return response.data
}

export const deleteForm = async (formId: string): Promise<DeleteFormResponse> => {
  const response = await apiClient.delete<DeleteFormResponse>(
    `/api/form-schema/${formId}`,
  )
  return response.data
}
