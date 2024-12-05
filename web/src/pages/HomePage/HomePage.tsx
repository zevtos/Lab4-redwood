import { useState } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useMutation, useQuery } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Canvas from 'src/components/Canvas/Canvas'
import DeleteAllButton from 'src/components/DeleteAllButton/DeleteAllButton'
import Header from 'src/components/Header/Header'
import PointForm from 'src/components/PointForm/PointForm'
import PointsTable from 'src/components/PointsTable/PointsTable'

const QUERY_COORDINATES = gql`
  query CoordinatesQuery {
    coordinates {
      id
      x
      y
      r
      hit
      createdAt
    }
  }
`

const CHECK_POINT_MUTATION = gql`
  mutation CheckPointMutation($input: CheckPointInput!) {
    checkPoint(input: $input) {
      id
      x
      y
      r
      hit
      createdAt
    }
  }
`

const HomePage = () => {
  const { isAuthenticated } = useAuth()
  const [radius, setRadius] = useState(2)

  const { data, loading, error, refetch } = useQuery(QUERY_COORDINATES)
  const [checkPoint] = useMutation(CHECK_POINT_MUTATION, {
    onCompleted: () => {
      refetch()
    },
  })

  const handleCanvasClick = async (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget
    const rect = canvas.getBoundingClientRect()
    const scale = canvas.width / 10

    const x = (event.clientX - rect.left - canvas.width / 2) / scale
    const y = -(event.clientY - rect.top - canvas.height / 2) / scale

    try {
      await checkPoint({
        variables: {
          input: {
            x: parseFloat(x.toFixed(2)),
            y: parseFloat(y.toFixed(2)),
            r: radius,
          },
        },
      })
    } catch (error) {
      console.error('Error checking point:', error)
    }
  }

  const handleFormSubmit = async (data: { x: number; y: number; r: number }) => {
    try {
      await checkPoint({
        variables: {
          input: {
            x: parseFloat(data.x.toFixed(2)),
            y: parseFloat(data.y.toFixed(2)),
            r: data.r,
          },
        },
      })
    } catch (error) {
      console.error('Error checking point:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-6">
        <div className="text-red-600">Error loading points: {error.message}</div>
        <div className="space-y-4">
          <Link
            to={routes.signup()}
            className="block w-full rounded-md bg-blue-600 px-4 py-3 font-medium text-white transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign up
          </Link>
          <Link
            to={routes.login()}
            className="block w-full rounded-md border-2 border-blue-600 px-4 py-3 font-medium text-blue-600 transition duration-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <MetaTags title="Home" description="Point checking dashboard" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Header />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <PointForm
            radius={radius}
            onRadiusChange={setRadius}
            onSubmit={handleFormSubmit}
          />
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
          <Canvas
            points={data?.coordinates || []}
            radius={radius}
            onCanvasClick={handleCanvasClick}
          />
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5">
            <div className="flex justify-end p-4">
              <DeleteAllButton onSuccess={refetch} />
            </div>
            <PointsTable points={data?.coordinates || []} />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
