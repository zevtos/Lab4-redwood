import type {
  EditCoordinateById,
  UpdateCoordinateInput,
  UpdateCoordinateMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CoordinateForm from 'src/components/Coordinate/CoordinateForm'

export const QUERY: TypedDocumentNode<EditCoordinateById> = gql`
  query EditCoordinateById($id: Int!) {
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

const UPDATE_COORDINATE_MUTATION: TypedDocumentNode<
  EditCoordinateById,
  UpdateCoordinateMutationVariables
> = gql`
  mutation UpdateCoordinateMutation($id: Int!, $input: UpdateCoordinateInput!) {
    updateCoordinate(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  coordinate,
}: CellSuccessProps<EditCoordinateById>) => {
  const [updateCoordinate, { loading, error }] = useMutation(
    UPDATE_COORDINATE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Coordinate updated')
        navigate(routes.coordinates())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateCoordinateInput,
    id: EditCoordinateById['coordinate']['id']
  ) => {
    updateCoordinate({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Coordinate {coordinate?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CoordinateForm
          coordinate={coordinate}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
