import {
  createPost,
  getPostById,
  getAllPosts,
  getPostsByUserId,
} from './postService.js'
import {} from './postService.js'

export const createNewPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body
    const authorId = req.user.id

    if (!title || !content) {
      return res
        .status(400)
        .json({ error: 'Заголовок и содержание обязательны' })
    }

    const post = await createPost({
      authorId,
      title,
      content,
      tags: tags || [],
    })

    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getPost = async (req, res) => {
  try {
    const { postId } = req.params
    const post = await getPostById(postId)

    if (!post || post.isDeleted) {
      return res.status(404).json({ error: 'Пост не найден' })
    }

    res.json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const listPosts = async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const listPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params
    const posts = await getPostsByUserId(userId)
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
