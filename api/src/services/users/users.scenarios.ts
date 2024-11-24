import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String473949',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2024-11-24T10:03:49.669Z',
      },
    },
    two: {
      data: {
        email: 'String4575605',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2024-11-24T10:03:49.669Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
