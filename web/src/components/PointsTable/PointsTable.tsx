interface Point {
  id: number
  x: number
  y: number
  r: number
  hit: boolean
  createdAt: string
}

interface PointsTableProps {
  points: Point[]
}

const PointsTable = ({ points }: PointsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900">
              X
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Y
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900">
              R
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Hit
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900">
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {points.map((point) => (
            <tr key={point.id}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {point.x.toFixed(2)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {point.y.toFixed(2)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {point.r}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    point.hit
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {point.hit ? 'Hit' : 'Miss'}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {new Date(point.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PointsTable
