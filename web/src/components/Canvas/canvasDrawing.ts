import { DrawConfig } from './types'
import { drawAxes, drawShapes, drawPoints } from './utils/drawing'

export const drawCanvas = (
  canvas: HTMLCanvasElement | null,
  radius: number,
  points: Point[],
  scale: number
) => {
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const baseSize = 400
  const scaledSize = baseSize * scale

  // Update canvas size
  canvas.width = scaledSize
  canvas.height = scaledSize

  const width = canvas.width
  const height = canvas.height
  const drawScale = width / 10

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Set center point
  ctx.translate(width / 2, height / 2)

  // Draw all elements
  drawAxes(ctx, width, height)
  drawShapes(ctx, radius, drawScale)
  drawPoints(ctx, points, drawScale, scale)

  // Reset transformation
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}
