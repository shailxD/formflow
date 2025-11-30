import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { BaseFieldProps } from '../types'
import { getBuilderMode } from '../utils'

export function SelectField(props: BaseFieldProps) {
  const { field, value, onChange, disabled } = props
  const builderMode = getBuilderMode(props)

  const options = field.defaultOptions || []

  return (
    <div className="flex flex-col gap-2">
      <Select
        disabled={disabled || builderMode}
        onValueChange={onChange}
        value={value || ''}
      >
        <SelectTrigger id={field.id}>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
