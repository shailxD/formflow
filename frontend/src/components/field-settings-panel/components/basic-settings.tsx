import type React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useFormBuilderStore from '@/store/form-builder-store'

import type { BasicSettingsProps } from '../types'

export const BasicSettings: React.FC<BasicSettingsProps> = ({ field }) => {
  const { updateField } = useFormBuilderStore()

  const handleUpdate = (updates: Partial<typeof field>) => {
    updateField(field.id, updates)
  }

  return (
    <Card className="gap-2 p-4 shadow-none">
      <CardHeader className="p-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          Basic Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium" htmlFor="field-label">
            Field Label
          </Label>
          <Input
            aria-describedby="field-label-help"
            autoComplete="off"
            id="field-label"
            name="field-label"
            onChange={(e) => handleUpdate({ label: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.currentTarget.blur()
              }
            }}
            placeholder="Enter field label"
            type="text"
            value={field.label}
          />
          <p className="text-xs text-muted-foreground" id="field-label-help">
            The label that appears above the field
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium" htmlFor="field-placeholder">
            Placeholder
          </Label>
          <Input
            aria-describedby="field-placeholder-help"
            autoComplete="off"
            id="field-placeholder"
            name="field-placeholder"
            onChange={(e) =>
              handleUpdate({ defaultPlaceholder: e.target.value })
            }
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.currentTarget.blur()
              }
            }}
            placeholder="Enter placeholder text"
            type="text"
            value={field.defaultPlaceholder || ''}
          />
          <p
            className="text-xs text-muted-foreground"
            id="field-placeholder-help"
          >
            Hint text that appears inside the field
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium" htmlFor="field-description">
            Description
          </Label>
          <Textarea
            aria-describedby="field-description-help"
            className="resize-none"
            id="field-description"
            name="field-description"
            onChange={(e) => handleUpdate({ description: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.currentTarget.blur()
              } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                e.currentTarget.blur()
              }
            }}
            placeholder="Enter field description (shown below the field)"
            rows={2}
            value={field.description || ''}
          />
          <p
            className="text-xs text-muted-foreground"
            id="field-description-help"
          >
            Additional help text shown below the field
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
