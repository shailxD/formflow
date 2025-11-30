import { FormActions } from './form-actions'
import { FormFieldsContainer } from './form-fields-container'
import { FormPreviewHeader } from './header'

export function FormPreview() {
  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="mx-auto flex max-w-full flex-col gap-6 px-6 py-8">
        <FormPreviewHeader />

        <form className="flex flex-col gap-6">
          <FormFieldsContainer />
          <FormActions />
        </form>
      </div>
    </div>
  )
}
