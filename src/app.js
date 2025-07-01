import express from 'express'
import authRoutes from './modules/auth/authRoutes.js'
import userRoutes from './modules/users/userRoutes.js'

const app = express()
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)

export default app
