import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FormDetails {
  internalTitle: string
  publicTitle: string
  description: string
  slug: string
  isPublished?: boolean
}

export interface FormField {
  id: string
  type: string
  label: string
  description: string
  category: string
  defaultLabel: string
  defaultPlaceholder?: string
  defaultOptions?: Array<string>
}

interface FormBuilderStore {
  formDetails: FormDetails | null
  formId: string | null
  hasCompletedSetup: boolean
  formFields: FormField[]
  selectedFieldId: string | null
  selectedField: FormField | null
  isSaved: boolean
  setFormDetails: (details: FormDetails) => void
  setFormId: (id: string) => void
  setIsPublished: (published: boolean) => void
  updateTitle: (title: string) => void
  updateDescription: (description: string) => void
  addField: (field: Omit<FormField, 'id'>) => void
  updateField: (id: string, updates: Partial<FormField>) => void
  setSelectedFieldId: (id: string | null) => void
  setSelectedField: (field: FormField | null) => void
  removeField: (id: string) => void
  reorderFields: (startIndex: number, endIndex: number) => void
  clearFormDetails: () => void
  setIsSaved: (saved: boolean) => void
}

const useFormBuilderStore = create<FormBuilderStore>()(
  persist(
    (set, get) => ({
      formDetails: null,
      formId: null,
      hasCompletedSetup: false,
      formFields: [],
      selectedFieldId: null,
      isSaved: false,
      get selectedField() {
        const state = get()
        return (
          state.formFields.find(
            (field) => field.id === state.selectedFieldId,
          ) || null
        )
      },
      setFormDetails: (details) =>
        set({
          formDetails: details,
          hasCompletedSetup: true,
        }),
      updateTitle: (title) =>
        set((state) => ({
          formDetails: state.formDetails
            ? { ...state.formDetails, internalTitle: title }
            : null,
        })),
      updateDescription: (description) =>
        set((state) => ({
          formDetails: state.formDetails
            ? { ...state.formDetails, description }
            : null,
        })),
      addField: (field) =>
        set((state) => {
          const newField = {
            ...field,
            id: `${field.type}-${Date.now()}-${Math.random()}`,
          }
          return {
            formFields: [...state.formFields, newField],
            selectedFieldId: newField.id,
          }
        }),
      setSelectedFieldId: (id) => set({ selectedFieldId: id }),
      setSelectedField: (field) =>
        set({ selectedFieldId: field ? field.id : null }),
      updateField: (id, updates) =>
        set((state) => ({
          formFields: state.formFields.map((field) =>
            field.id === id ? { ...field, ...updates } : field,
          ),
        })),
      removeField: (id) =>
        set((state) => ({
          formFields: state.formFields.filter((field) => field.id !== id),
          selectedFieldId:
            state.selectedFieldId === id ? null : state.selectedFieldId,
        })),
      reorderFields: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.formFields)
          const [removed] = result.splice(startIndex, 1)
          result.splice(endIndex, 0, removed)
          return { formFields: result }
        }),
      clearFormDetails: () =>
        set({
          formDetails: null,
          formId: null,
          hasCompletedSetup: false,
          formFields: [],
          selectedFieldId: null,
          isSaved: false,
        }),
      setIsSaved: (saved) => set({ isSaved: saved }),
      setFormId: (id) => set({ formId: id }),
      setIsPublished: (published) =>
        set((state) => ({
          formDetails: state.formDetails
            ? { ...state.formDetails, isPublished: published }
            : null,
        })),
    }),
    {
      name: 'form-builder-storage',
    },
  ),
)

export default useFormBuilderStore
