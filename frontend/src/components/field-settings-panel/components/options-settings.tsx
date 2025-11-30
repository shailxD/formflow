import { Plus, X } from 'lucide-react'
import type React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import useFormBuilderStore from '@/store/form-builder-store'

import type { BasicSettingsProps } from '../types'

export const OptionsSettings: React.FC<BasicSettingsProps> = ({ field }) => {
  const { updateField } = useFormBuilderStore()

  const handleUpdate = (updates: Partial<typeof field>) => {
    updateField(field.id, updates)
  }

  const addOption = () => {
    const currentOptions = field.defaultOptions || []
    handleUpdate({
      defaultOptions: [
        ...currentOptions,
        `Option ${currentOptions.length + 1}`,
      ],
    })
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(field.defaultOptions || [])]
    newOptions[index] = value || `Option ${index + 1}`
    handleUpdate({ defaultOptions: newOptions })
  }

  const removeOption = (index: number) => {
    const newOptions = [...(field.defaultOptions || [])]
    newOptions.splice(index, 1)
    handleUpdate({ defaultOptions: newOptions })
  }

  return (
    <Card className="gap-2 p-4 shadow-none">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            Options
          </CardTitle>
          <Button
            aria-label="Add new option"
            className="flex gap-2"
            onClick={addOption}
            size="sm"
            variant="outline"
          >
            <Plus aria-hidden="true" className="size-4" />
            Add Option
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        <div className="flex flex-col gap-2">
          {(field.defaultOptions || []).map((option, index) => (
            <div className="flex items-center gap-2" key={index}>
              <Input
                aria-describedby={`option-${index}-help`}
                autoComplete="off"
                id={`option-${index}`}
                name={`option-${index}`}
                onChange={(e) => updateOption(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    e.currentTarget.blur()
                  }
                }}
                placeholder={`Option ${index + 1}`}
                type="text"
                value={option}
              />
              <Button
                aria-label={`Remove option ${index + 1}`}
                className="flex gap-2"
                onClick={() => removeOption(index)}
                size="icon"
                variant="destructive"
              >
                <X aria-hidden="true" className="size-4" />
              </Button>
            </div>
          ))}
          {(field.defaultOptions || []).length === 0 && (
            <p
              aria-live="polite"
              className="text-sm text-muted-foreground"
              role="status"
            >
              No options added yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
