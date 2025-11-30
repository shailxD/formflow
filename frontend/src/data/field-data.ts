import {
  Type,
  Mail,
  Hash,
  type LucideIcon,
  MessageSquare,
  Calendar,
  ChevronDown,
  ListChecks,
  ToggleLeft,
} from 'lucide-react'

export interface FieldTypeConfig {
  type:
    | 'text'
    | 'email'
    | 'textarea'
    | 'number'
    | 'select'
    | 'multi-select'
    | 'date'
    | 'switch'
  label: string
  description: string
  icon: LucideIcon
  category: 'input' | 'selection'
  defaultLabel: string
  defaultPlaceholder?: string
  defaultOptions?: Array<string>
}

export const FIELD_TYPE_CONFIGS: Array<FieldTypeConfig> = [
  {
    type: 'text',
    label: 'Text Input',
    description: 'A single line for short text responses.',
    icon: Type,
    category: 'input',
    defaultLabel: 'Text Field',
    defaultPlaceholder: 'Enter text',
  },
  {
    type: 'email',
    label: 'Email',
    description: 'Collect a valid email address.',
    icon: Mail,
    category: 'input',
    defaultLabel: 'Email Field',
    defaultPlaceholder: 'Enter email address',
  },
  {
    type: 'number',
    label: 'Number',
    description: 'Input for numeric values.',
    icon: Hash,
    category: 'input',
    defaultLabel: 'Number Field',
    defaultPlaceholder: 'Enter number',
  },
  {
    type: 'textarea',
    label: 'Textarea',
    description: 'A multi-line field for longer text.',
    icon: MessageSquare,
    category: 'input',
    defaultLabel: 'Textarea Field',
    defaultPlaceholder: 'Enter text',
  },
  {
    type: 'date',
    label: 'Date',
    description: 'Pick a date from a calendar.',
    icon: Calendar,
    category: 'input',
    defaultLabel: 'Date Field',
  },
  {
    type: 'select',
    label: 'Select Dropdown',
    description: 'Dropdown to choose one option.',
    icon: ChevronDown,
    category: 'selection',
    defaultLabel: 'Select Field',
    defaultOptions: ['Option 1', 'Option 2'],
  },
  {
    type: 'multi-select',
    label: 'Multi-Select',
    description: 'Choose multiple options from a list.',
    icon: ListChecks,
    category: 'selection',
    defaultLabel: 'Multi-Select Field',
    defaultOptions: ['Option 1', 'Option 2', 'Option 3'],
  },
  {
    type: 'switch',
    label: 'Switch',
    description: 'A toggle switch for yes/no or on/off.',
    icon: ToggleLeft,
    category: 'selection',
    defaultLabel: 'Switch Field',
  },
]

export const FIELD_TYPES = FIELD_TYPE_CONFIGS.map((config) => ({
  type: config.type,
  label: config.label,
  description: config.description,
  icon: config.icon,
}))

export const FIELD_CATEGORIES = {
  input: 'Input Fields',
  selection: 'Selection Fields',
  media: 'Media Fields',
  layout: 'Layout Fields',
  advanced: 'Advanced Fields',
} as const
