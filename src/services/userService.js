import prisma from '../../prisma/client.js'
import { userBaseSelect, userProfileSelect } from '../../prisma/selectors.js'

export const findUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: userBaseSelect,
  })

  if (!user) return null

  return {
    ...user,
    postsCount: user.posts.length,
  }
}

export const updateUserProfile = async (userId, data) => {
  const updated = await prisma.user.update({
    where: { id: Number(userId) },
    data: {
      nickname: data.nickname,
      name: data.name,
      avatarUrl: data.avatarUrl,
      bio: data.bio,
    },
    select: userProfileSelect,
  })

  return updated
}
