export const validatePoint = (x: number, y: number, r: number): void => {
  if (x < -5 || x > 5) {
    throw new Error('X coordinate must be between -5 and 5')
  }
  if (y < -3 || y > 5) {
    throw new Error('Y coordinate must be between -3 and 5')
  }
  if (r < 0 || r > 5) {
    throw new Error('Radius must be between 0 and 5')
  }
}

export const checkPointHit = (x: number, y: number, r: number): boolean => {
  // Rectangle in second quadrant (x ≥ 0, y ≥ 0)
  if (x <= 0 && x <= r / 2 && y >= 0 && y <= r) {
    return true
  }

  // Triangle in first quadrant (x ≤ 0, y ≤ 0)
  if (x >= 0 && y >= 0 && y <= -2 * x + r) {
    return true
  }

  // Quarter circle in fourth quadrant (x ≥ 0, y ≤ 0)
  if (x >= 0 && y <= 0 && Math.sqrt(x * x + y * y) <= r) {
    return true
  }

  return false
}
