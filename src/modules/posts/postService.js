import prisma from '../../../prisma/client.js'

export const createPost = async ({ authorId, title, content, tags }) => {
  if (!title?.trim() || !content?.trim()) {
    throw new Error('Заголовок и содержание обязательны')
  }

  return prisma.post.create({
    data: {
      authorId,
      title: title.trim(),
      content: content.trim(),
      tags: Array.isArray(tags) ? tags : [],
    },
    select: {
      id: true,
      title: true,
      content: true,
      tags: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export const getPostById = async (postId) => {
  if (!postId || isNaN(postId)) {
    throw new Error('Некорректный ID поста')
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
    include: {
      author: { select: { id: true, nickname: true, avatarUrl: true } },
      comments: true,
      likes: true,
      dislikes: true,
    },
  })

  if (!post || post.isDeleted) {
    throw new Error('Пост не найден')
  }

  return post
}

export const getAllPosts = async () => {
  return prisma.post.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { id: true, nickname: true, avatarUrl: true } },
    },
  })
}

export const getPostsByUserId = async (userId) => {
  if (!userId || isNaN(userId)) {
    throw new Error('Некорректный User ID')
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: Number(userId),
      isDeleted: false,
    },
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { id: true, nickname: true, avatarUrl: true } },
    },
  })

  if (!posts.length) {
    throw new Error('Посты пользователя не найдены')
  }

  return posts
}
