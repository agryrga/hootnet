import express from 'express'
import { subscribe, unsubscribe } from './subscriptionController.js'
import { authenticateToken } from '../../shared/middleware/auth.js'

const router = express.Router()

router.post('/:userId', authenticateToken, subscribe)
router.delete('/:userId', authenticateToken, unsubscribe)

export default router
