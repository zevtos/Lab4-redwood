
import { useRef, useEffect, useState } from 'react'
import { useAuth } from 'src/auth'
import { navigate, routes } from '@redwoodjs/router'
import { Form, Label, NumberField, Submit } from '@redwoodjs/forms'
import { LogOut } from 'lucide-react'

interface Point {
  x: number
  y: number
  r: number
  hit: boolean
  timestamp: string
}

const HomePage = () => {
  const { logOut, currentUser } = useAuth()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [points, setPoints] = useState<Point[]>([])
  const [radius, setRadius] = useState(2)

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
    ctx.fillRect(0, 0, r * scale, r * scale / 2)

    // Triangle
    ctx.moveTo(0, 0)
    ctx.lineTo(-r * scale / 2, 0)
    ctx.lineTo(0, -r * scale)
    ctx.closePath()

    // Quarter circle
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, r * scale, 0, Math.PI/2)

    ctx.fill()

    // Draw points
    points.forEach(point => {
      ctx.beginPath()
      ctx.arc(
        point.x * scale,
        -point.y * scale,
        4,
        0,
        2 * Math.PI
      )
      ctx.fillStyle = point.hit ? '#4CAF50' : '#F44336'
      ctx.fill()
    })

    // Reset transformation
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  useEffect(() => {
    drawCanvas(radius, points)
  }, [radius, points])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scale = canvas.width / 10

    const x = ((event.clientX - rect.left) - canvas.width / 2) / scale
    const y = -((event.clientY - rect.top) - canvas.height / 2) / scale

    // Add point check logic here
    const newPoint: Point = {
      x,
      y,
      r: radius,
      hit: checkHit(x, y, radius),
      timestamp: new Date().toISOString()
    }

    setPoints([...points, newPoint])
  }

  const checkHit = (x: number, y: number, r: number): boolean => {
    // Rectangle
    if (x >= 0 && x <= r && y >= 0 && y <= r/2) return true

    // Triangle
    if (x <= 0 && y <= 0 && y >= -2*x - r) return true

    // Quarter circle
    if (x >= 0 && y <= 0 && (x*x + y*y) <= r*r) return true

    return false
  }

  const handleLogout = async () => {
    await logOut()
    navigate(routes.login())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Point Checker</h1>
            </div>
            <div className="flex items-center">
              {/* <span className="mr-4">Welcome, {currentUser?.email}</span> */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white shadow rounded-lg p-6">
            <Form className="space-y-4">
              <div>
                <Label name="x" className="block text-sm font-medium text-gray-700">
                  X Coordinate (-5 to 5)
                </Label>
                <NumberField
                  name="x"
                  validation={{
                    required: true,
                    min: -5,
                    max: 5
                  }}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <Label name="y" className="block text-sm font-medium text-gray-700">
                  Y Coordinate (-3 to 5)
                </Label>
                <NumberField
                  name="y"
                  validation={{
                    required: true,
                    min: -3,
                    max: 5
                  }}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <Label name="r" className="block text-sm font-medium text-gray-700">
                  Radius (-5 to 5)
                </Label>
                <NumberField
                  name="r"
                  value={radius}
                  onChange={(e) => setRadius(parseFloat(e.target.value))}
                  validation={{
                    required: true,
                    min: -5,
                    max: 5
                  }}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <Submit className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Check Point
              </Submit>
            </Form>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              onClick={handleCanvasClick}
              className="border border-gray-200 rounded-lg cursor-crosshair"
            />
          </div>

          <div className="lg:col-span-2 bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">X</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Y</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">R</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {points.map((point, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{point.x.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{point.y.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{point.r}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${point.hit ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {point.hit ? 'Hit' : 'Miss'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(point.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
