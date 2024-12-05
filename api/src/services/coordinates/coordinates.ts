import type {
  QueryResolvers,
  MutationResolvers,
  CoordinateRelationResolvers,
} from 'types/graphql'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { validatePoint, checkPointHit } from 'src/lib/pointCheck'

export const coordinates: QueryResolvers['coordinates'] = () => {
  requireAuth()
  return db.coordinate.findMany({
    where: { userId: context.currentUser.id },
    orderBy: { createdAt: 'desc' },
  })
}

export const coordinate: QueryResolvers['coordinate'] = ({ id }) => {
  requireAuth()
  return db.coordinate.findUnique({
    where: { id },
  })
}

export const createCoordinate: MutationResolvers['createCoordinate'] = ({
  input,
}) => {
  requireAuth()
  validatePoint(input.x, input.y, input.r)
  return db.coordinate.create({
    data: {
      ...input,
      userId: context.currentUser.id,
    },
  })
}

export const updateCoordinate: MutationResolvers['updateCoordinate'] = ({
  id,
  input,
}) => {
  requireAuth()
  if (input.x !== undefined && input.y !== undefined && input.r !== undefined) {
    validatePoint(input.x, input.y, input.r)
  }
  return db.coordinate.update({
    data: input,
    where: { id },
  })
}

export const deleteCoordinate: MutationResolvers['deleteCoordinate'] = ({
  id,
}) => {
  requireAuth()
  return db.coordinate.delete({
    where: { id },
  })
}

export const deleteAllCoordinates: MutationResolvers['deleteAllCoordinates'] = async () => {
  requireAuth()
  await db.coordinate.deleteMany({
    where: { userId: context.currentUser.id },
  })
  return true
}

export const checkPoint: MutationResolvers['checkPoint'] = async ({
  input: { x, y, r },
}) => {
  requireAuth()
  validatePoint(x, y, r)

  const hit = checkPointHit(x, y, r)

  return db.coordinate.create({
    data: {
      x,
      y,
      r,
      hit,
      userId: context.currentUser.id,
    },
  })
}

export const Coordinate: CoordinateRelationResolvers = {
  user: (_obj, { root }) => {
    return db.coordinate.findUnique({ where: { id: root?.id } }).user()
  },
}
