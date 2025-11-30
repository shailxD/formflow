import { Switch } from '@/components/ui/switch'
import type { BaseFieldProps } from '../types'
import { getBuilderMode } from '../utils'

export function SwitchField(props: BaseFieldProps) {
  const { field, value, onChange, disabled } = props
  const builderMode = getBuilderMode(props)

  return (
    <div className="flex flex-col gap-2">
      <Switch
        id={field.id}
        checked={value || false}
        onCheckedChange={onChange}
        disabled={disabled || builderMode}
      />
    </div>
  )
}
