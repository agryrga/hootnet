import prisma from '../../../prisma/client.js'

export const subscribeToUser = async ({ subscriberId, subscribedToId }) => {
  if (subscriberId === subscribedToId) {
    throw new Error('Нельзя подписаться на самого себя')
  }

  const userExists = await prisma.user.findUnique({
    where: { id: subscribedToId },
    select: { id: true },
  })

  if (!userExists) {
    throw new Error('Пользователь не найден')
  }

  const existing = await prisma.subscription.findUnique({
    where: {
      subscriberId_subscribedToId: {
        subscriberId,
        subscribedToId,
      },
    },
  })

  if (existing) {
    throw new Error('Вы уже подписаны на этого пользователя')
  }

  return prisma.subscription.create({
    data: { subscriberId, subscribedToId },
  })
}

export const unsubscribeFromUser = async ({ subscriberId, subscribedToId }) => {
  const deleted = await prisma.subscription.deleteMany({
    where: { subscriberId, subscribedToId },
  })

  if (deleted.count === 0) {
    throw new Error('Подписка не найдена')
  }

  return deleted
}
