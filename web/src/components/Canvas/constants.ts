export const CANVAS_SCALES = {
  DESKTOP: 1.5, // >= 1205px
  TABLET: 1, // >= 687px && < 1205px
  MOBILE: 0.5, // < 687px
} as const

export const POINT_SCALES = {
  DESKTOP: 1.25,
  TABLET: 1,
  MOBILE: 0.75,
} as const

export const BASE_CANVAS_SIZE = 400
export const BASE_POINT_RADIUS = 4
