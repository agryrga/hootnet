import { subscribeToUser, unsubscribeFromUser } from './subscriptionService.js'
import { parseId } from '../../shared/utils/index.js'

export const subscribe = async (req, res) => {
  try {
    const subscriberId = req.user.id
    const subscribedToId = parseId(req.params.userId, 'User ID')

    const subscription = await subscribeToUser({ subscriberId, subscribedToId })

    return res.status(201).json(subscription)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

export const unsubscribe = async (req, res) => {
  try {
    const subscriberId = req.user.id
    const subscribedToId = parseId(req.params.userId, 'User ID')

    await unsubscribeFromUser({ subscriberId, subscribedToId })

    return res.status(200).json({ message: 'Подписка удалена' })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
