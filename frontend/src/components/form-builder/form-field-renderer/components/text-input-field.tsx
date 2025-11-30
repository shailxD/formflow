import type React from 'react'

import { Input } from '@/components/ui/input'
import type { BaseFieldProps } from '../types'
import { applyBuilderMode, getBaseClasses, getBuilderMode } from '../utils'

export function TextInputField(props: BaseFieldProps) {
  const { field, value, onChange, error, fieldRef, disabled } = props
  const baseClasses = getBaseClasses(error)

  const builderMode = getBuilderMode(props)

  const inputProps = applyBuilderMode(
    {
      className: baseClasses,
      disabled,
      id: field.id,
      name: field.id,
      autoComplete: 'off',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        onChange?.(e.target.value),
      onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
          e.currentTarget.blur()
        }
      },
      placeholder: field.defaultPlaceholder || '',
      ref: fieldRef,
      type: 'text',
      value: value || '',
    },
    builderMode,
  )

  return (
    <div className="flex flex-col gap-2">
      <Input {...inputProps} />
    </div>
  )
}
