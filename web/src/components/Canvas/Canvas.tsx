import { useRef, useEffect } from 'react'

interface Point {
  x: number
  y: number
  r: number
  hit: boolean
  timestamp: string
}

interface CanvasProps {
  points: Point[]
  radius: number
  onCanvasClick: (event: React.MouseEvent<HTMLCanvasElement>) => void
}

const Canvas = ({ points, radius, onCanvasClick }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawCanvas = (r: number, points: Point[]) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const scale = width / 10

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Set center point
    ctx.translate(width / 2, height / 2)

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(-width / 2, 0)
    ctx.lineTo(width / 2, 0)
    ctx.moveTo(0, -height / 2)
    ctx.lineTo(0, height / 2)
    ctx.stroke()

    // Draw shape
    ctx.fillStyle = 'rgba(65, 105, 225, 0.3)'
    ctx.beginPath()

    // Rectangle
    ctx.fillRect(0, 0, -(r * scale) / 2, -r * scale)

    // Triangle
    ctx.moveTo(0, 0)
    ctx.lineTo((r * scale) / 2, 0)
    ctx.lineTo(0, -r * scale)
    ctx.closePath()

    // Quarter circle
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, r * scale, 0, Math.PI / 2)

    ctx.fill()

    // Draw points
    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x * scale, -point.y * scale, 4, 0, 2 * Math.PI)
      ctx.fillStyle = point.hit ? '#4CAF50' : '#F44336'
      ctx.fill()
    })

    // Reset transformation
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  useEffect(() => {
    drawCanvas(radius, points)
  }, [radius, points])

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      onClick={onCanvasClick}
      className="cursor-crosshair rounded-lg border border-gray-200"
    />
  )
}

export default Canvas
