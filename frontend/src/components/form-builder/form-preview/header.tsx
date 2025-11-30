import useFormBuilderStore from '@/store/form-builder-store'
import { EditableField } from './editable-field'

export function FormPreviewHeader() {
  const { formDetails, updateTitle, updateDescription } = useFormBuilderStore()

  const handleTitleUpdate = (title: string) => {
    updateTitle(title)
  }

  const handleDescriptionUpdate = (description: string) => {
    updateDescription(description)
  }

  const hasPublicTitle =
    formDetails?.publicTitle &&
    formDetails.publicTitle !== formDetails?.internalTitle

  return (
    <div className="flex flex-col">
      <EditableField
        className="flex items-center gap-2"
        inputClassName="text-3xl font-bold bg-background w-full"
        onSave={handleTitleUpdate}
        placeholder="Click to add title..."
        value={formDetails?.internalTitle || ''}
      >
        <div className="flex flex-col gap-1">
          <h1 className="truncate text-3xl font-bold text-foreground">
            {formDetails?.internalTitle}
          </h1>
          {hasPublicTitle && (
            <p className="text-sm text-muted-foreground">
              Public title: "{formDetails?.publicTitle}"
            </p>
          )}
        </div>
      </EditableField>
      <EditableField
        className="flex items-start gap-2"
        component="textarea"
        inputClassName="bg-background w-full"
        onSave={handleDescriptionUpdate}
        placeholder="Click to add a description..."
        rows={Math.max(
          (formDetails?.description || '').split('\n').length || 1,
          1,
        )}
        value={formDetails?.description || ''}
      >
        {formDetails?.description ? (
          <p className="whitespace-pre-wrap text-muted-foreground">
            {formDetails?.description}
          </p>
        ) : (
          <p className="text-muted-foreground italic">
            Click to add a description...
          </p>
        )}
      </EditableField>
    </div>
  )
}
