import CoordinateCell from 'src/components/Coordinate/CoordinateCell'

type CoordinatePageProps = {
  id: number
}

const CoordinatePage = ({ id }: CoordinatePageProps) => {
  return <CoordinateCell id={id} />
}

export default CoordinatePage
