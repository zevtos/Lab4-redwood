import type { Prisma, Coordinate } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CoordinateCreateArgs>({
  coordinate: {
    one: {
      data: {
        x: 2138340.530842107,
        y: 4315044.343118457,
        r: 6373266.583877042,
        hit: true,
        user: {
          create: {
            email: 'String5603897',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2024-11-24T10:04:19.768Z',
          },
        },
      },
    },
    two: {
      data: {
        x: 6624648.74229437,
        y: 8150922.580558595,
        r: 2835853.009873064,
        hit: true,
        user: {
          create: {
            email: 'String9340823',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2024-11-24T10:04:19.768Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Coordinate, 'coordinate'>
