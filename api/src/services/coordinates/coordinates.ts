import type {
  QueryResolvers,
  MutationResolvers,
  CoordinateRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const coordinates: QueryResolvers['coordinates'] = () => {
  return db.coordinate.findMany()
}

export const coordinate: QueryResolvers['coordinate'] = ({ id }) => {
  return db.coordinate.findUnique({
    where: { id },
  })
}

export const createCoordinate: MutationResolvers['createCoordinate'] = ({
  input,
}) => {
  return db.coordinate.create({
    data: input,
  })
}

export const updateCoordinate: MutationResolvers['updateCoordinate'] = ({
  id,
  input,
}) => {
  return db.coordinate.update({
    data: input,
    where: { id },
  })
}

export const deleteCoordinate: MutationResolvers['deleteCoordinate'] = ({
  id,
}) => {
  return db.coordinate.delete({
    where: { id },
  })
}

export const Coordinate: CoordinateRelationResolvers = {
  user: (_obj, { root }) => {
    return db.coordinate.findUnique({ where: { id: root?.id } }).user()
  },
}
