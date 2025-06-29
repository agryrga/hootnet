export const userBaseSelect = {
  id: true,
  email: true,
  nickname: true,
  name: true,
  avatarUrl: true,
  bio: true,
}

export const userProfileSelect = {
  ...userBaseSelect,
  posts: { select: { id: true } },
  subscriptions: { select: { id: true } },
  likes: true,
  dislikes: true,
}
