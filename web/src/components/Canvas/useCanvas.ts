import { useEffect, useRef, useState } from 'react'

import { drawCanvas } from './canvasDrawing'
import { CANVAS_SCALES } from './constants'
import { Point } from './types'

export const useCanvas = (points: Point[], radius: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scale, setScale] = useState(CANVAS_SCALES.DESKTOP)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= 1205) {
        setScale(CANVAS_SCALES.DESKTOP)
      } else if (width >= 687) {
        setScale(CANVAS_SCALES.TABLET)
      } else {
        setScale(CANVAS_SCALES.MOBILE)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    drawCanvas(canvasRef.current, radius, points, scale)
  }, [radius, points, scale])

  return { canvasRef, scale }
}
