import type {
  CreateCoordinateMutation,
  CreateCoordinateInput,
  CreateCoordinateMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CoordinateForm from 'src/components/Coordinate/CoordinateForm'

const CREATE_COORDINATE_MUTATION: TypedDocumentNode<
  CreateCoordinateMutation,
  CreateCoordinateMutationVariables
> = gql`
  mutation CreateCoordinateMutation($input: CreateCoordinateInput!) {
    createCoordinate(input: $input) {
      id
    }
  }
`

const NewCoordinate = () => {
  const [createCoordinate, { loading, error }] = useMutation(
    CREATE_COORDINATE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Coordinate created')
        navigate(routes.coordinates())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateCoordinateInput) => {
    createCoordinate({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Coordinate</h2>
      </header>
      <div className="rw-segment-main">
        <CoordinateForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCoordinate
