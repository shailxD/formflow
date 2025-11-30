import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import type { BaseFieldProps } from '../types'

import { applyBuilderMode, getBaseClasses, getBuilderMode } from '../utils'

export function DateInputField(props: BaseFieldProps) {
  const { field, value, onChange, error, disabled } = props
  const baseClasses = getBaseClasses(error)
  const builderMode = getBuilderMode(props)
  const [timeZone, setTimeZone] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      setTimeZone(tz)
    } catch {
      setTimeZone(undefined)
    }
  }, [])

  const getDateValue = () => (value ? new Date(value) : undefined)

  const getDatePlaceholder = () => field.defaultPlaceholder || 'Pick a date'

  const getFormattedDate = (date: Date) => format(date, 'PPP')

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      onChange?.(selectedDate.toISOString().slice(0, 10))
    } else {
      onChange?.('')
    }
  }

  const handleDateInputKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (e.key === 'Escape') {
      e.currentTarget.blur()
    }
  }

  const dateValue = getDateValue()
  const placeholder = getDatePlaceholder()

  const buttonProps = applyBuilderMode(
    {
      className: `w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground ${baseClasses}`,
      'data-empty': !dateValue,
      disabled,
      onKeyDown: handleDateInputKeyDown,
      variant: 'outline' as const,
    },
    builderMode,
  )

  return (
    <div className="flex flex-col gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button {...buttonProps}>
            <CalendarIcon className="h-4 w-4" />
            {dateValue ? (
              getFormattedDate(dateValue)
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            captionLayout="dropdown"
            disabled={disabled || builderMode}
            mode="single"
            onSelect={handleDateSelect}
            selected={dateValue}
            timeZone={timeZone}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
