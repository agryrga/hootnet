import express from 'express'
import { getUserById, listUsers } from './userController.js'
import { authenticateToken } from '../../shared/middleware/auth.js'

const router = express.Router()

router.get('/:userId', getUserById)
router.get('/', authenticateToken, listUsers)

export default router
