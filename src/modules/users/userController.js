import { findUserById, getAllUsers } from './userService.js'
import { parseId } from '../../shared/utils/index.js'

export const getUserById = async (req, res) => {
  try {
    const userId = parseId(req.params.userId, 'ID пользователя')

    const user = await findUserById(userId)

    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

export const listUsers = async (req, res) => {
  try {
    const users = await getAllUsers(req.user.id)
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ error: 'Что-то пошло не так' })
  }
}
