import type { FindCoordinates, FindCoordinatesVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Coordinates from 'src/components/Coordinate/Coordinates'

export const QUERY: TypedDocumentNode<
  FindCoordinates,
  FindCoordinatesVariables
> = gql`
  query FindCoordinates {
    coordinates {
      id
      x
      y
      r
      hit
      createdAt
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No coordinates yet.{' '}
      <Link to={routes.newCoordinate()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindCoordinates>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  coordinates,
}: CellSuccessProps<FindCoordinates, FindCoordinatesVariables>) => {
  return <Coordinates coordinates={coordinates} />
}
