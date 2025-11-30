import { Button } from '@/components/ui/button'
import useFormBuilderStore from '@/store/form-builder-store'

export function FormActions() {
  const { formFields } = useFormBuilderStore()

  if (formFields.length === 0) return null

  return (
    <div className="flex items-center justify-between gap-4">
      <Button className="w-full sm:w-auto" type="submit">
        Submit
      </Button>
    </div>
  )
}
