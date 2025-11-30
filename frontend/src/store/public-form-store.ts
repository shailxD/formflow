import { create } from 'zustand'
import type { FormSchema } from '@/types/form'

interface PublicFormStore {
  form: FormSchema | null
  setForm: (form: FormSchema) => void
  clearForm: () => void
}

const usePublicFormStore = create<PublicFormStore>()((set) => ({
  form: null,
  setForm: (form) => set({ form }),
  clearForm: () => set({ form: null }),
}))

export default usePublicFormStore
