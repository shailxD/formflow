import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormFieldRenderer } from '@/components/form-builder/form-field-renderer'
import { useSubmitForm } from '@/hooks/mutations/use-form-mutation'
import type { FormSchema } from '@/types/form'

interface PublicFormProps {
  form: FormSchema
  slug: string
}

function FormSuccess({
  title,
  onSubmitAnother,
}: {
  title: string
  onSubmitAnother: () => void
}) {
  return (
    <div className="mx-auto w-full max-w-xl p-4">
      <Card className="flex flex-col items-center gap-6 p-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 className="size-8 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Thank You!</h2>
          <p className="text-muted-foreground">
            Your response to <span className="font-medium">{title}</span> has
            been submitted successfully.
          </p>
        </div>
        <Button variant="outline" onClick={onSubmitAnother}>
          Submit Another Response
        </Button>
      </Card>
    </div>
  )
}

export function PublicForm({ form, slug }: PublicFormProps) {
  const { formDetails, formFields } = form
  const [isSubmitted, setIsSubmitted] = useState(false)
  const submitFormMutation = useSubmitForm(slug)

  // Create a mapping from index to field ID to avoid dots in field names
  const fieldIdMap = formFields.reduce(
    (acc, field, index) => {
      acc[`field_${index}`] = field.id
      return acc
    },
    {} as Record<string, string>,
  )

  const tanstackForm = useForm({
    defaultValues: formFields.reduce(
      (acc, _, index) => {
        acc[`field_${index}`] = ''
        return acc
      },
      {} as Record<string, any>,
    ),
    onSubmit: async ({ value }) => {
      // Transform index-based keys back to original field IDs
      const data = Object.entries(value).reduce(
        (acc, [key, val]) => {
          const originalId = fieldIdMap[key]
          if (originalId) {
            acc[originalId] = val
          }
          return acc
        },
        {} as Record<string, any>,
      )
      try {
        await submitFormMutation.mutateAsync({ data })
        setIsSubmitted(true)
      } catch {
        toast.error('Failed to submit form. Please try again.')
      }
    },
  })

  const handleSubmitAnother = () => {
    tanstackForm.reset()
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <FormSuccess
        title={formDetails.publicTitle || formDetails.internalTitle}
        onSubmitAnother={handleSubmitAnother}
      />
    )
  }

  return (
    <div className="mx-auto w-full max-w-xl p-4">
      <Card className="p-6">
        {/* Form Header */}
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">
            {formDetails.publicTitle || formDetails.internalTitle}
          </h1>
          {formDetails.description && (
            <p className="text-muted-foreground">{formDetails.description}</p>
          )}
        </div>

        {/* Form Fields */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            tanstackForm.handleSubmit()
          }}
          className="flex flex-col gap-6"
        >
          {formFields.map((field, index) => (
            <tanstackForm.Field key={field.id} name={`field_${index}`}>
              {(fieldApi) => (
                <FormFieldRenderer
                  field={field}
                  value={fieldApi.state.value}
                  onChange={(value) => fieldApi.handleChange(value)}
                  error={
                    fieldApi.state.meta.isTouched &&
                    fieldApi.state.meta.errors.length > 0
                      ? fieldApi.state.meta.errors.join(', ')
                      : undefined
                  }
                  disabled={false}
                  builderMode={false}
                />
              )}
            </tanstackForm.Field>
          ))}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={tanstackForm.state.isSubmitting}
          >
            {tanstackForm.state.isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
