import { findUserById, updateUserProfile } from '../services/userService.js'

export const getUserById = async (req, res) => {
  const { userId } = req.params

  const user = await findUserById(userId)
  if (!user) return res.status(404).json({ error: 'User not found' })

  res.json(user)
}

export const updateUser = async (req, res) => {
  const { userId } = req.params
  const { nickname, name, avatarUrl, bio } = req.body

  if (Number(userId) !== req.user.id)
    return res.status(403).json({ error: 'Unauthorized' })

  const updated = await updateUserProfile(userId, {
    nickname,
    name,
    avatarUrl,
    bio,
  })

  res.json(updated)
}
