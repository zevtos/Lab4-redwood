import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = async ({
  input,
}) => {
  validate(input.email, 'Email', {
    email: true,
    presence: true,
  })

  validate(input.password, 'Password', {
    presence: true,
    length: { minimum: 8, message: 'must be at least 8 characters' },
  })

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email: input.email },
  })

  if (existingUser) {
    throw new Error('A user with this email already exists')
  }

  const [hashedPassword, salt] = hashPassword(input.password)

  return db.user.create({
    data: {
      email: input.email,
      hashedPassword,
      salt,
      resetToken: input.resetToken,
      resetTokenExpiresAt: input.resetTokenExpiresAt,
    },
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  coordinates: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).coordinates()
  },
}
