import React from 'react'

import type { FormField } from '@/store/form-builder-store'

import {
  DateInputField,
  EmailInputField,
  MultiSelectField,
  NumberInputField,
  SelectField,
  SwitchField,
  TextareaField,
  TextInputField,
} from '../components'
import type { BaseFieldProps } from '../types'

export function createFieldComponent(
  field: FormField,
  value?: any,
  onChange?: (value: any) => void,
  error?: string,
  fieldRef?: React.RefObject<any>,
  disabled?: boolean,
  formId?: string,
  builderMode?: boolean,
): React.ReactElement {
  const props: BaseFieldProps = {
    field,
    value,
    onChange,
    error,
    fieldRef,
    disabled,
    formId,
    builderMode,
  }

  switch (field.type) {
    case 'text':
      return React.createElement(TextInputField, props)
    case 'email':
      return React.createElement(EmailInputField, props)
    case 'number':
      return React.createElement(NumberInputField, props)
    case 'textarea':
      return React.createElement(TextareaField, props)
    case 'select':
      return React.createElement(SelectField, props)
    case 'multi-select':
      return React.createElement(MultiSelectField, props)
    case 'date':
      return React.createElement(DateInputField, props)
    case 'switch':
      return React.createElement(SwitchField, props)
    default:
      return React.createElement('div', {}, 'Unsupported field type')
  }
}
