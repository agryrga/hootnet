import express from 'express'
import { getUserById, updateUser } from './userController.js'
import { authenticateToken } from '../../shared/middleware/auth.js'

const router = express.Router()

router.get('/:userId', getUserById)
router.put('/:userId', authenticateToken, updateUser)

export default router
