import { registerUser, loginUser } from './authService.js'

export const validateEmailAndPass = (email, password) => {
  if (!email || !password) throw new Error('Email и пароль обязательны')
}

export const register = async (req, res) => {
  try {
    const { email, password } = req.body
    validateEmailAndPass(email, password)
    const user = await registerUser({ email, password })
    return res.status(201).json(user)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    validateEmailAndPass(email, password)
    const data = await loginUser({ email, password })
    return res.json(data)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
