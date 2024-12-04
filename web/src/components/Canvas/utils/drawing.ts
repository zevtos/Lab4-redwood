import { POINT_SCALES } from '../constants'
import { Point } from '../types'

export const drawAxes = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.beginPath()
  ctx.moveTo(-width / 2, 0)
  ctx.lineTo(width / 2, 0)
  ctx.moveTo(0, -height / 2)
  ctx.lineTo(0, height / 2)
  ctx.stroke()
}

export const drawShapes = (
  ctx: CanvasRenderingContext2D,
  radius: number,
  drawScale: number
) => {
  ctx.fillStyle = 'rgba(65, 105, 225, 0.3)'
  ctx.beginPath()

  // Rectangle
  ctx.fillRect(0, 0, -(radius * drawScale) / 2, -radius * drawScale)

  // Triangle
  ctx.moveTo(0, 0)
  ctx.lineTo((radius * drawScale) / 2, 0)
  ctx.lineTo(0, -radius * drawScale)
  ctx.closePath()

  // Quarter circle
  ctx.moveTo(0, 0)
  ctx.arc(0, 0, radius * drawScale, 0, Math.PI / 2)

  ctx.fill()
}

export const drawPoints = (
  ctx: CanvasRenderingContext2D,
  points: Point[],
  drawScale: number,
  scale: number
) => {
  // Determine point scale based on canvas scale
  let pointScale
  if (scale === 1.5) {
    pointScale = POINT_SCALES.DESKTOP
  } else if (scale === 1) {
    pointScale = POINT_SCALES.TABLET
  } else {
    pointScale = POINT_SCALES.MOBILE
  }

  points.forEach((point) => {
    ctx.beginPath()
    ctx.arc(
      point.x * drawScale,
      -point.y * drawScale,
      4 * pointScale,
      0,
      2 * Math.PI
    )
    ctx.fillStyle = point.hit ? '#4CAF50' : '#F44336'
    ctx.fill()
  })
}
