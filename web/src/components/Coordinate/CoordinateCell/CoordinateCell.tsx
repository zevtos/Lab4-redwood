import type {
  FindCoordinateById,
  FindCoordinateByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Coordinate from 'src/components/Coordinate/Coordinate'

export const QUERY: TypedDocumentNode<
  FindCoordinateById,
  FindCoordinateByIdVariables
> = gql`
  query FindCoordinateById($id: Int!) {
    coordinate: coordinate(id: $id) {
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

export const Empty = () => <div>Coordinate not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindCoordinateByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  coordinate,
}: CellSuccessProps<FindCoordinateById, FindCoordinateByIdVariables>) => {
  return <Coordinate coordinate={coordinate} />
}
