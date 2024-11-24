import type {
  QueryResolvers,
  MutationResolvers,
  CoordinateRelationResolvers,
} from 'types/graphql'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

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

export const checkPoint: MutationResolvers['checkPoint'] = async ({
  input: { x, y, r },
}) => {
  requireAuth()

  // Проверка попадания точки в область
  let hit = false

  // Первая четверть: прямоугольник
  if (x >= 0 && y >= 0) {
    hit = x <= r && y <= r
  }
  // Вторая четверть: треугольник
  else if (x <= 0 && y >= 0) {
    hit = y <= -x + r && y <= r && x >= -r
  }
  // Четвёртая четверть: четверть окружности
  else if (x >= 0 && y <= 0) {
    hit = Math.sqrt(x * x + y * y) <= r
  }

  // Сохраняем координату с результатом проверки
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
