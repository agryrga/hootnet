import express from 'express'
import {
  createNewPost,
  getPost,
  listPosts,
  listPostsByUser,
} from './postController.js'
import { authenticateToken } from '../../shared/middleware/auth.js'

const router = express.Router()

router.post('/', authenticateToken, createNewPost)
router.get('/', listPosts)
router.get('/user/:userId', listPostsByUser)
router.get('/:postId', getPost)

export default router
