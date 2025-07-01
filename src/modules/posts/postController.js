import {
  createPost,
  getPostById,
  getAllPosts,
  getPostsByUserId,
} from './postService.js'
import { parseId } from '../../shared/utils/index.js'

export const createNewPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body
    const authorId = req.user.id

    if (!title?.trim() || !content?.trim()) {
      throw new Error('Заголовок и содержание обязательны')
    }

    const post = await createPost({
      authorId,
      title: title.trim(),
      content: content.trim(),
      tags: Array.isArray(tags) ? tags : [],
    })

    return res.status(201).json(post)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

export const getPost = async (req, res) => {
  try {
    const postId = parseId(req.params.postId, 'ID поста')

    const post = await getPostById(postId)
    if (!post || post.isDeleted) {
      throw new Error('Пост не найден')
    }

    return res.status(200).json(post)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

export const listPosts = async (req, res) => {
  try {
    const posts = await getAllPosts()
    return res.status(200).json(posts)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

export const listPostsByUser = async (req, res) => {
  try {
    const userId = parseId(req.params.userId, 'ID пользователя')

    const posts = await getPostsByUserId(userId)
    return res.status(200).json(posts)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
