import { Label } from '@/components/ui/label'

import type { FieldWrapperProps } from '../types'

export function FieldWrapper({
  field,
  error,
  children,
  builderMode = false,
}: FieldWrapperProps) {
  const isStatementField = field.type === 'statement'
  const shouldShowLabel = !isStatementField
  const shouldShowError = !isStatementField && error

  const getFieldLabel = () => (field.label ? field.label.replace('*', '') : '')

  const getFieldDescription = () => field.description

  const getContainerClassName = () => {
    const baseClasses = 'flex flex-col gap-2'
    const widthClass = 'flex-1 basis-full'
    const marginClass = field.label ? '' : ''

    return `${baseClasses} ${widthClass} ${marginClass}`.trim()
  }

  const renderFieldLabel = () => {
    if (!(shouldShowLabel && field.label)) return null

    return (
      <Label
        className="gap-1 text-sm font-medium text-foreground"
        htmlFor={field.id}
      >
        {getFieldLabel()}
      </Label>
    )
  }

  const renderFieldDescription = () => {
    const description = getFieldDescription()
    if (!(shouldShowLabel && description)) return null

    return (
      <p className="form-description text-sm text-muted-foreground opacity-80">
        {description}
      </p>
    )
  }

  const renderFieldError = () => {
    if (!(shouldShowError && error)) return null

    return (
      <p
        aria-live="polite"
        className="flex items-start gap-1 text-sm text-destructive"
        role="alert"
      >
        {error}
      </p>
    )
  }

  return (
    <div
      className={getContainerClassName()}
      data-builder-mode={builderMode ? 'true' : undefined}
      onClick={
        builderMode
          ? (e) => {
              e.stopPropagation()
              const card =
                (e.currentTarget.closest('[role="button"]') as HTMLElement) ??
                undefined
              card?.click()
            }
          : undefined
      }
      role={builderMode ? 'group' : undefined}
    >
      {renderFieldLabel()}
      {renderFieldDescription()}
      {children}

      {renderFieldError()}
    </div>
  )
}
