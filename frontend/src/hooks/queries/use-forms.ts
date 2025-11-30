import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { getForms, getFormBySlug, getSubmissions } from '@/api/form-api'
import type { GetSubmissionsParams } from '@/types/form'

export const useForms = () => {
  return useQuery({
    queryKey: ['forms'],
    queryFn: getForms,
  })
}

export const useFormBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['form', slug],
    queryFn: () => getFormBySlug(slug),
    enabled: !!slug,
  })
}

export const formBySlugQueryOptions = (slug: string) => ({
  queryKey: ['form', slug],
  queryFn: () => getFormBySlug(slug),
})

export const useSuspenseFormBySlug = (slug: string) => {
  return useSuspenseQuery(formBySlugQueryOptions(slug))
}

export const submissionsQueryOptions = (
  formId: string,
  params?: GetSubmissionsParams,
) => ({
  queryKey: ['submissions', formId, params],
  queryFn: () => getSubmissions(formId, params),
})

export const useSubmissions = (formId: string, params?: GetSubmissionsParams) => {
  return useQuery({
    ...submissionsQueryOptions(formId, params),
    enabled: !!formId,
  })
}
