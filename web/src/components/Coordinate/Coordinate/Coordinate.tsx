import type {
  DeleteCoordinateMutation,
  DeleteCoordinateMutationVariables,
  FindCoordinateById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag } from 'src/lib/formatters'

const DELETE_COORDINATE_MUTATION: TypedDocumentNode<
  DeleteCoordinateMutation,
  DeleteCoordinateMutationVariables
> = gql`
  mutation DeleteCoordinateMutation($id: Int!) {
    deleteCoordinate(id: $id) {
      id
    }
  }
`

interface Props {
  coordinate: NonNullable<FindCoordinateById['coordinate']>
}

const Coordinate = ({ coordinate }: Props) => {
  const [deleteCoordinate] = useMutation(DELETE_COORDINATE_MUTATION, {
    onCompleted: () => {
      toast.success('Coordinate deleted')
      navigate(routes.coordinates())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteCoordinateMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete coordinate ' + id + '?')) {
      deleteCoordinate({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Coordinate {coordinate.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{coordinate.id}</td>
            </tr>
            <tr>
              <th>X</th>
              <td>{coordinate.x}</td>
            </tr>
            <tr>
              <th>Y</th>
              <td>{coordinate.y}</td>
            </tr>
            <tr>
              <th>R</th>
              <td>{coordinate.r}</td>
            </tr>
            <tr>
              <th>Hit</th>
              <td>{checkboxInputTag(coordinate.hit)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(coordinate.createdAt)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{coordinate.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCoordinate({ id: coordinate.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(coordinate.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Coordinate
