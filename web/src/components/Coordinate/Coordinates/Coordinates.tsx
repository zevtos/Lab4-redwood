import type {
  DeleteCoordinateMutation,
  DeleteCoordinateMutationVariables,
  FindCoordinates,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Coordinate/CoordinatesCell'
import { checkboxInputTag, timeTag, truncate } from 'src/lib/formatters'

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

const CoordinatesList = ({ coordinates }: FindCoordinates) => {
  const [deleteCoordinate] = useMutation(DELETE_COORDINATE_MUTATION, {
    onCompleted: () => {
      toast.success('Coordinate deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteCoordinateMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete coordinate ' + id + '?')) {
      deleteCoordinate({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Hit</th>
            <th>Created at</th>
            <th>User id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {coordinates.map((coordinate) => (
            <tr key={coordinate.id}>
              <td>{truncate(coordinate.id)}</td>
              <td>{truncate(coordinate.x)}</td>
              <td>{truncate(coordinate.y)}</td>
              <td>{truncate(coordinate.r)}</td>
              <td>{checkboxInputTag(coordinate.hit)}</td>
              <td>{timeTag(coordinate.createdAt)}</td>
              <td>{truncate(coordinate.userId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.coordinate({ id: coordinate.id })}
                    title={'Show coordinate ' + coordinate.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCoordinate({ id: coordinate.id })}
                    title={'Edit coordinate ' + coordinate.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete coordinate ' + coordinate.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(coordinate.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CoordinatesList
