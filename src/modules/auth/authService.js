import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../../prisma/client.js'

export const registerUser = async ({ email, password }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    throw new Error('Email уже используется')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      nickname: email,
    },
    select: {
      id: true,
      email: true,
      nickname: true,
    },
  })

  return user
}

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw new Error('Неверные учетные данные')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Неверные учетные данные')
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    },
  }
}
