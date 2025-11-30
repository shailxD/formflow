import { FORM_FIELD_CONFIG } from '@/constants'

export function FormFieldsHeader() {
  return (
    <header className="flex flex-col gap-1">
      <h1 className="text-lg font-semibold">
        {FORM_FIELD_CONFIG.HEADER.TITLE}
      </h1>
      <p className="text-xs text-muted-foreground">
        {FORM_FIELD_CONFIG.HEADER.DESCRIPTION}
      </p>
    </header>
  )
}
