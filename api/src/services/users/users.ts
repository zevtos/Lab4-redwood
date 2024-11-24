import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

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
