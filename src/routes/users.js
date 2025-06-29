import express from 'express'
import { getUserById, updateUser } from '../controllers/userController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/:userId', getUserById)
router.put('/:userId', authenticateToken, updateUser)

export default router
