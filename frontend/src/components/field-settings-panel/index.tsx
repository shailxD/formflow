import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import type { FormField } from '@/store/form-builder-store'
import {
  BasicSettings,
  EmptyState,
  OptionsSettings,
  SettingsPanelHeader,
} from './components'

interface FieldSettingsPanelProps {
  field: FormField | null
  onClose: () => void
}

export function FieldSettingsPanel({
  field,
  onClose,
}: FieldSettingsPanelProps) {
  if (!field) {
    return <EmptyState onClose={onClose} />
  }

  return (
    <div
      className="flex h-full min-h-0 flex-col border-border bg-background"
      style={{
        overscrollBehavior: 'contain',
      }}
    >
      <SettingsPanelHeader onClose={onClose} />
      <ScrollArea
        className="h-0 min-h-0 flex-1"
        style={{
          overscrollBehavior: 'contain',
        }}
      >
        <div className="flex flex-col gap-4 p-4">
          <BasicSettings field={field} />
          {['select', 'multi-select'].includes(field.type) && (
            <>
              <Separator />
              <OptionsSettings field={field} />
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
