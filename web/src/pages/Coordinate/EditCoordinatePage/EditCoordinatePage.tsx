import EditCoordinateCell from 'src/components/Coordinate/EditCoordinateCell'

type CoordinatePageProps = {
  id: number
}

const EditCoordinatePage = ({ id }: CoordinatePageProps) => {
  return <EditCoordinateCell id={id} />
}

export default EditCoordinatePage
