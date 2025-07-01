import prisma from '../../../prisma/client.js'
import { userBaseSelect } from '../../../prisma/selectors.js'

export const findUserById = async (userId) => {
  if (!userId || isNaN(userId)) {
    throw new Error('Некорректный ID пользователя')
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: {
      ...userBaseSelect,
      posts: { select: { id: true } },
    },
  })

  if (!user) {
    throw new Error('Пользователь не найден')
  }

  return {
    ...user,
    postsCount: user.posts?.length ?? 0,
  }
}

export const getAllUsers = async (currentUserId) => {
  return prisma.user.findMany({
    where: {
      isBanned: false,
      ...(currentUserId ? { NOT: { id: Number(currentUserId) } } : {}),
    },
    select: userBaseSelect,
  })
}
