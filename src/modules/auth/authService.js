import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../../prisma/client.js'

export const registerUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Email and password required')
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    throw new Error('Email already in use')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, nickname: email },
    select: { id: true, email: true },
  })

  return user
}

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw new Error('Invalid credentials')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return {
    token,
    user: { id: user.id, email: user.email, nickname: user.nickname },
  }
}
