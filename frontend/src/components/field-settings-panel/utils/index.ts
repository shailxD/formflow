import type { FormField } from '@/store/form-builder-store'

import { FIELD_TYPES } from '../constants'

export const getFieldHelpers = (field: FormField) => ({
  hasOptions: FIELD_TYPES.OPTION_TYPES.includes(field.type as any),
  isTextType: FIELD_TYPES.TEXT_TYPES.includes(field.type as any),
  isNumberType: field.type === FIELD_TYPES.NUMBER_TYPE,
  isTextareaType: field.type === FIELD_TYPES.TEXTAREA_TYPE,
  isSliderType: field.type === FIELD_TYPES.SLIDER_TYPE,
  isTagsType: field.type === FIELD_TYPES.TAGS_TYPE,
  isSocialType: field.type === FIELD_TYPES.SOCIAL_TYPE,
  isSelectType: field.type === FIELD_TYPES.SELECT_TYPE,
})

export const useFieldUpdates = (
  field: FormField | null,
  onFieldUpdate: (field: FormField) => void,
) => {
  if (!field) {
    return {
      updateField: () => {},
    }
  }

  return {
    updateField: (updates: Partial<FormField>) => {
      onFieldUpdate({ ...field, ...updates })
    },
  }
}

export const createFieldUpdater = (
  field: FormField,
  onFieldUpdate: (field: FormField) => void,
) => ({
  updateField: (updates: Partial<FormField>) => {
    onFieldUpdate({ ...field, ...updates })
  },
})

export const createOptionHandlers = (
  field: FormField,
  updateField: (updates: Partial<FormField>) => void,
) => ({
  addOption: () => {
    const currentOptions = field.defaultOptions || []
    updateField({
      defaultOptions: [
        ...currentOptions,
        `Option ${currentOptions.length + 1}`,
      ],
    })
  },

  updateOption: (index: number, value: string) => {
    const newOptions = [...(field.defaultOptions || [])]
    const trimmedValue = value.trim()
    newOptions[index] = trimmedValue || `Option ${index + 1}`
    updateField({ defaultOptions: newOptions })
  },

  removeOption: (index: number) => {
    const newOptions = [...(field.defaultOptions || [])]
    newOptions.splice(index, 1)
    updateField({ defaultOptions: newOptions })
  },
})

export const formatFieldType = (type: string): string =>
  type.charAt(0).toUpperCase() + type.slice(1)

export const getPlaceholderText = (
  _field: FormField,
  _validationType: string,
): string => {
  // Since validation properties don't exist on FormField yet,
  // return empty string for now
  return ''
}
