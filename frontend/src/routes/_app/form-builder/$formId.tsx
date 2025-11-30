import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { PANEL_SIZES } from '@/constants'
import { FormFields, FormPreview } from '@/components/form-builder'
import { FormDetailsDialog } from '@/components/form-builder/form-details-dialog'
import useFormBuilderStore from '@/store/form-builder-store'
import { FieldSettingsPanel } from '@/components/field-settings-panel'

export const Route = createFileRoute('/_app/form-builder/$formId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { formId: routeFormId } = Route.useParams()
  const {
    hasCompletedSetup,
    selectedFieldId,
    formFields,
    setSelectedField,
    setFormId,
  } = useFormBuilderStore()
  const [showDialog, setShowDialog] = useState(!hasCompletedSetup)

  // Set formId from route param on mount
  useEffect(() => {
    if (routeFormId) {
      setFormId(routeFormId)
    }
  }, [routeFormId, setFormId])

  const selectedField =
    formFields.find((field) => field.id === selectedFieldId) || null

  useEffect(() => {
    setShowDialog(!hasCompletedSetup)
  }, [hasCompletedSetup])

  return (
    <>
      <FormDetailsDialog open={showDialog} onOpenChange={setShowDialog} />
      <div className="flex h-full flex-1 flex-col">
        <ResizablePanelGroup
          className="h-full"
          direction="horizontal"
          style={{
            overscrollBehavior: 'contain',
          }}
        >
          <ResizablePanel
            defaultSize={PANEL_SIZES.LEFT_PANEL.default}
            maxSize={PANEL_SIZES.LEFT_PANEL.max}
            minSize={PANEL_SIZES.LEFT_PANEL.min}
            style={{
              overscrollBehavior: 'contain',
            }}
          >
            <FormFields />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={PANEL_SIZES.PREVIEW_PANEL.default}
            maxSize={PANEL_SIZES.PREVIEW_PANEL.max}
            minSize={PANEL_SIZES.PREVIEW_PANEL.min}
            className="overflow-y-auto"
            style={{
              overscrollBehavior: 'contain',
            }}
          >
            <FormPreview />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={PANEL_SIZES.RIGHT_PANEL.default}
            maxSize={PANEL_SIZES.RIGHT_PANEL.max}
            minSize={PANEL_SIZES.RIGHT_PANEL.min}
            style={{
              overscrollBehavior: 'contain',
            }}
          >
            <div
              className="flex h-full flex-col"
              style={{
                overscrollBehavior: 'contain',
              }}
            >
              <FieldSettingsPanel
                field={selectedField}
                onClose={() => setSelectedField(null)}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  )
}
