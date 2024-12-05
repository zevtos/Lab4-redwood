import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_ALL_COORDINATES_MUTATION = gql`
  mutation DeleteAllCoordinatesMutation {
    deleteAllCoordinates
  }
`

interface DeleteAllButtonProps {
  onSuccess: () => void
}

const DeleteAllButton = ({ onSuccess }: DeleteAllButtonProps) => {
  const [deleteAllCoordinates] = useMutation(DELETE_ALL_COORDINATES_MUTATION, {
    onCompleted: () => {
      onSuccess()
      toast.success('All points deleted successfully!')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleDeleteAll = async () => {
    try {
      await deleteAllCoordinates()
    } catch (error) {
      console.error('Error deleting points:', error)
    }
  }

  return (
    <button
      onClick={handleDeleteAll}
      className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      Delete All Points
    </button>
  )
}

export default DeleteAllButton
