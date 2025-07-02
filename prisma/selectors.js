export const userBaseSelect = {
  id: true,
  email: true,
  nickname: true,
  name: true,
  avatarUrl: true,
  bio: true,
  posts: { select: { id: true } },
  subscriptions: { select: { id: true } },
  likes: { select: { id: true } },
  dislikes: { select: { id: true } },
}
