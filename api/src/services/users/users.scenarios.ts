import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String4699490',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2024-11-24T10:30:24.358Z',
      },
    },
    two: {
      data: {
        email: 'String2928769',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2024-11-24T10:30:24.358Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
