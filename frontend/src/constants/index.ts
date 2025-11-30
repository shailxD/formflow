export const PANEL_SIZES = {
  LEFT_PANEL: {
    default: 30,
    min: 20,
    max: 40,
  },
  PREVIEW_PANEL: {
    default: 40,
    min: 35,
    max: 70,
  },
  RIGHT_PANEL: {
    default: 30,
    min: 20,
    max: 45,
  },
} as const

export const FORM_FIELD_CONFIG = {
  COMPACT_GRID_COLS: 2,
  COMPACT_MAX_HEIGHT: 'max-h-64',

  HEADER: {
    TITLE: 'Form Fields',
    DESCRIPTION: 'Click to add fields to your form',
  },
} as const
