import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { generateUniqueSlug } from '@/lib/utils/slug'
import useFormBuilderStore from '@/store/form-builder-store'

const formDetailsSchema = z.object({
  internalTitle: z
    .string()
    .min(1, 'Internal title is required')
    .max(100, 'Internal title must be less than 100 characters'),
  publicTitle: z
    .string()
    .max(100, 'Public title must be less than 100 characters')
    .optional(),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
})

interface FormDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FormDetailsDialog({
  open,
  onOpenChange,
}: FormDetailsDialogProps) {
  const { setFormDetails } = useFormBuilderStore()

  const form = useForm({
    defaultValues: {
      internalTitle: '',
      publicTitle: '',
      description: '',
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = formDetailsSchema.safeParse(value)
        if (!result.success) {
          return {
            form: result.error.format()._errors.join(', '),
            fields: Object.fromEntries(
              Object.entries(result.error.format()).map(([key, value]) => [
                key,
                (value as any)?._errors?.join(', ') || '',
              ]),
            ),
          }
        }
        return undefined
      },
    },
    onSubmit: async ({ value }) => {
      const titleForSlug = value.publicTitle || value.internalTitle
      const slug = generateUniqueSlug(titleForSlug)

      setFormDetails({
        internalTitle: value.internalTitle,
        publicTitle: value.publicTitle || '',
        description: value.description || '',
        slug,
      })
      onOpenChange(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>Form details</DialogTitle>
          <DialogDescription>
            Set the internal and public information for your form.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field name="internalTitle">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Internal Title <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter internal title for your reference..."
                      aria-invalid={isInvalid}
                    />
                    <p className="text-xs text-muted-foreground">
                      Only visible in the Forms and builder.
                    </p>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="publicTitle">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Public Title</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter title to display to users..."
                      aria-invalid={isInvalid}
                    />
                    <p className="text-xs text-muted-foreground">
                      Shown to users on the form. Leave empty to reuse the
                      internal title.
                    </p>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Form Description
                    </FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter a short description to guide users..."
                      rows={4}
                      aria-invalid={isInvalid}
                    />
                    <p className="text-xs text-muted-foreground">
                      Optional. Helps users understand the form's purpose.
                    </p>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>

          <div className="mt-6 flex justify-end gap-3">
            <form.Subscribe
              selector={(state) => ({
                internalTitle: state.values.internalTitle,
                isSubmitting: state.isSubmitting,
              })}
            >
              {(state) => (
                <Button
                  type="submit"
                  disabled={
                    state.isSubmitting ||
                    !state.internalTitle ||
                    !state.internalTitle.trim()
                  }
                >
                  {state.isSubmitting ? 'Creating...' : 'Create Form'}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
