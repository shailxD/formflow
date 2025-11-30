import { useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import type { FieldTypeConfig } from '@/data/field-data'
import useFormBuilderStore from '@/store/form-builder-store'

interface FieldItemProps {
  fieldType: FieldTypeConfig
}

export function FieldItem({ fieldType }: FieldItemProps) {
  const IconComponent = fieldType.icon
  const { addField } = useFormBuilderStore()
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      addField({
        type: fieldType.type,
        label: fieldType.label,
        description: '',
        category: fieldType.category,
        defaultLabel: fieldType.defaultLabel,
        defaultPlaceholder: fieldType.defaultPlaceholder,
        defaultOptions: fieldType.defaultOptions,
      })
    }, 300)
  }, [fieldType, addField])

  return (
    <Button
      aria-label={`Add ${fieldType.label} field`}
      className="group h-auto min-h-11 w-full justify-start p-4 text-left"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      variant="outline"
    >
      <div className="flex w-full items-center gap-3">
        <div className="flex shrink-0 items-center justify-center rounded-lg bg-primary/10 p-2 group-hover:bg-primary/20">
          <IconComponent aria-hidden="true" className="size-4 text-primary" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-wrap text-foreground">
              {fieldType.label}
            </h3>
          </div>
          <p className="text-xs text-wrap text-muted-foreground">
            {fieldType.description}
          </p>
        </div>
      </div>
    </Button>
  )
}
