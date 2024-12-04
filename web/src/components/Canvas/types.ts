export interface Point {
  x: number
  y: number
  r: number
  hit: boolean
  timestamp: string
}

export interface CanvasProps {
  points: Point[]
  radius: number
  onCanvasClick: (event: React.MouseEvent<HTMLCanvasElement>) => void
}

export interface DrawConfig {
  canvas: HTMLCanvasElement
  radius: number
  points: Point[]
  scale: number
}
