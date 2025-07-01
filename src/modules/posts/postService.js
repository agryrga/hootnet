import prisma from '../../../prisma/client.js'

export const createPost = async ({ authorId, title, content, tags }) => {
  const post = await prisma.post.create({
    data: {
      authorId,
      title,
      content,
      tags,
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

  return post
}

export const getPostById = async (postId) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
    include: {
      author: { select: { id: true, nickname: true, avatarUrl: true } },
      comments: true,
      likes: true,
      dislikes: true,
    },
  })

  return post
}

export const getAllPosts = async () => {
  return await prisma.post.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { id: true, nickname: true, avatarUrl: true } },
    },
  })
}

export const getPostsByUserId = async (userId) => {
  return await prisma.post.findMany({
    where: {
      authorId: Number(userId),
      isDeleted: false,
    },
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { id: true, nickname: true, avatarUrl: true } },
    },
  })
}
