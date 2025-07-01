import express from 'express'
import authRoutes from './modules/auth/authRoutes.js'
import userRoutes from './modules/users/userRoutes.js'
import postRoutes from './modules/posts/postRoutes.js '

const app = express()
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

export default app
