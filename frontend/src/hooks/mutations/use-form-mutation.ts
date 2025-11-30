import { useMutation, useQueryClient } from '@tanstack/react-query'
import { saveForm, submitForm, deleteForm } from '@/api/form-api'
import useFormBuilderStore from '@/store/form-builder-store'
import type { SubmitFormRequest } from '@/types/form'

export const useSaveForm = () => {
  const { setIsSaved } = useFormBuilderStore()

  return useMutation({
    mutationFn: saveForm,
    onSuccess: () => {
      setIsSaved(true)
    },
  })
}

export const usePublishForm = () => {
  const { setIsPublished } = useFormBuilderStore()

  return useMutation({
    mutationFn: saveForm,
    onSuccess: () => {
      setIsPublished(true)
    },
  })
}

export const useSubmitForm = (slug: string) => {
  return useMutation({
    mutationFn: (data: SubmitFormRequest) => submitForm(slug, data),
  })
}

export const useDeleteForm = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}
