import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { BaseFieldProps } from '../types'
import { getBuilderMode } from '../utils'

export function MultiSelectField(props: BaseFieldProps) {
  const { field, value, onChange, disabled } = props
  const builderMode = getBuilderMode(props)

  const options = field.defaultOptions || []
  const selectedValues: string[] = Array.isArray(value) ? value : []

  const handleSelect = (option: string, checked: boolean | 'indeterminate') => {
    const newValues =
      checked === true
        ? [...selectedValues, option]
        : selectedValues.filter((v) => v !== option)
    onChange?.(newValues)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`${field.id}-${index}`}
              checked={selectedValues.includes(option)}
              onCheckedChange={(checked) => handleSelect(option, checked)}
              disabled={disabled || builderMode}
            />
            <Label
              htmlFor={`${field.id}-${index}`}
              className="text-sm font-normal"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
