import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import * as React from 'react'

import useFormBuilderStore from '@/store/form-builder-store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { FIELD_TYPE_CONFIGS } from '@/data/field-data'
import { useCallback, useRef } from 'react'
import { FormFieldRenderer } from '../form-field-renderer'

export function FormFieldsContainer() {
  const itemRefs = React.useRef<Record<string, HTMLDivElement | null>>({})
  const addButtonRef = React.useRef<HTMLButtonElement | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const {
    formFields,
    addField,
    selectedFieldId,
    setSelectedFieldId,
    removeField,
    reorderFields,
  } = useFormBuilderStore()

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    if (sourceIndex === destinationIndex) {
      return
    }

    reorderFields(sourceIndex, destinationIndex)
  }

  const handleAddField = useCallback(
    (fieldType: (typeof FIELD_TYPE_CONFIGS)[number]) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      debounceTimerRef.current = setTimeout(() => {
        addField({
          type: fieldType.type,
          label: fieldType.label,
          description: '',
          category: fieldType.category,
          defaultLabel: fieldType.defaultLabel,
          defaultPlaceholder: fieldType.defaultPlaceholder,
          defaultOptions: fieldType.defaultOptions,
        })
      }, 300)
    },
    [addField],
  )

  const AddFieldButton = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Add field to form"
          className="h-42 w-full border-2 border-dashed transition-colors hover:border-primary/50 hover:bg-accent/10"
          onClick={() => {}}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
            }
          }}
          ref={addButtonRef}
          variant="outline"
        >
          <Plus aria-hidden="true" className="size-4" />
          Add Field
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="h-42 w-48"
        style={{
          overscrollBehavior: 'contain',
        }}
      >
        <ScrollArea type="always">
          {FIELD_TYPE_CONFIGS.map((fieldType) => (
            <DropdownMenuItem
              aria-label={`Add ${fieldType.label} field`}
              className="cursor-pointer"
              key={fieldType.type}
              onClick={() => handleAddField(fieldType)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleAddField(fieldType)
                }
              }}
            >
              {fieldType.label}
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  if (formFields.length === 0)
    return (
      <section
        aria-labelledby="form-fields-empty-heading"
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
        role="region"
      >
        <h2 className="sr-only" id="form-fields-empty-heading">
          Form fields
        </h2>
        <div className="flex size-16 items-center justify-center rounded-2xl bg-accent">
          <div aria-hidden="true" className="size-8 rounded-2xl bg-muted" />
        </div>
        <p className="text-lg font-medium text-foreground">
          No fields added yet
        </p>
        <p className="text-sm text-muted-foreground">
          Add fields from the left panel to start building your form
        </p>
        <AddFieldButton />
      </section>
    )

  return (
    <section
      aria-labelledby="form-fields-heading"
      className="flex flex-col gap-4"
      role="region"
    >
      <h2 className="sr-only" id="form-fields-heading">
        Form fields
      </h2>
      <div aria-live="polite" className="sr-only">
        {formFields.length} {formFields.length === 1 ? 'field' : 'fields'}
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <ul
              className="flex flex-col gap-4"
              ref={provided.innerRef}
              role="list"
              {...provided.droppableProps}
            >
              {formFields.map((field, index) => {
                return (
                  <Draggable
                    draggableId={field.id}
                    index={index}
                    key={field.id}
                  >
                    {(provided, snapshot) => (
                      <li
                        className="group relative"
                        ref={provided.innerRef}
                        role="listitem"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          aria-selected={selectedFieldId === field.id}
                          className="group relative"
                          onClick={() => setSelectedFieldId(field.id)}
                          onKeyDown={(e) => {
                            if (
                              (e.key === 'Enter' ||
                                e.key === 'Backspace' ||
                                e.key === 'Delete') &&
                              (e.target instanceof HTMLInputElement ||
                                e.target instanceof HTMLTextAreaElement)
                            ) {
                              e.stopPropagation()
                            }
                            if (e.key === 'Delete' || e.key === 'Backspace') {
                              e.preventDefault()
                              const next =
                                formFields[index + 1]?.id ??
                                formFields[index - 1]?.id
                              removeField(field.id)
                              requestAnimationFrame(() => {
                                if (next && itemRefs.current[next]) {
                                  itemRefs.current[next]?.focus()
                                } else {
                                  addButtonRef.current?.focus()
                                }
                              })
                            }
                          }}
                        >
                          <Card
                            aria-label={`${field.type} field`}
                            className={`p-4 shadow-none transition-all duration-200 ${
                              selectedFieldId === field.id
                                ? 'border-primary bg-accent/10 ring-2 ring-primary/20'
                                : 'border-border hover:bg-accent/5'
                            } ${
                              snapshot.isDragging
                                ? 'rotate-2 shadow-lg ring-2 ring-primary/50'
                                : ''
                            }`}
                            role="button"
                            tabIndex={0}
                          >
                            <div className="absolute top-2 left-2 z-10 flex items-center gap-1 opacity-100 transition-opacity group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                              <div className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing">
                                <GripVertical className="size-4" />
                              </div>
                            </div>
                            <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-100 transition-opacity group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    aria-label={`Delete ${field.type} field`}
                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive-foreground"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      removeField(field.id)
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        removeField(field.id)
                                        const next =
                                          formFields[index + 1]?.id ??
                                          formFields[index - 1]?.id

                                        requestAnimationFrame(() => {
                                          if (next && itemRefs.current[next]) {
                                            itemRefs.current[next]?.focus()
                                          } else {
                                            addButtonRef.current?.focus()
                                          }
                                        })
                                      }
                                    }}
                                    size="icon-sm"
                                    variant="ghost"
                                  >
                                    <Trash2
                                      aria-hidden="true"
                                      className="size-4"
                                    />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent align="center" side="top">
                                  Delete field
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <FormFieldRenderer field={field} disabled={true} />
                          </Card>
                        </div>
                      </li>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
              <AddFieldButton />
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  )
}
