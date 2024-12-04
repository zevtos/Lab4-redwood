import { BASE_CANVAS_SIZE } from './constants'
import type { CanvasProps } from './types'
import { useCanvas } from './useCanvas'

const Canvas = ({ points, radius, onCanvasClick }: CanvasProps) => {
  const { canvasRef, scale } = useCanvas(points, radius)

  return (
    <div className="flex w-full items-center justify-center">
      <canvas
        ref={canvasRef}
        width={BASE_CANVAS_SIZE * scale}
        height={BASE_CANVAS_SIZE * scale}
        onClick={onCanvasClick}
        className="cursor-crosshair rounded-lg border border-gray-200"
        style={{
          width: `${BASE_CANVAS_SIZE * scale}px`,
          height: `${BASE_CANVAS_SIZE * scale}px`,
        }}
      />
    </div>
  )
}

export default Canvas
