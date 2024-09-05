import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'

class AuthController {
  static async login (req, res) {
    try {
      const { username, password } = req.body

      const user = await User.findOne('username', username)
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

      const esValida = await bcrypt.compare(password, user.password)
      if (!esValida) return res.status(401).json({ message: 'Credenciales inválidas' })

      const token = jwt.sign({ userId: user.user_id }, SECRET_KEY, { expiresIn: '1h' })
      res.json({ message: 'Inicio de sesión exitoso', token })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async me (req, res) {
    try {
      const { authorization } = req.headers
      const decodificado = jwt.verify(authorization, SECRET_KEY)

      const user = await User.findById(decodificado.userId)
      delete user.password

      res.json(user)
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) return res.status(400).json({ message: 'Token expirado' })

      if (error instanceof jwt.JsonWebTokenError) return res.status(400).json({ message: 'Token inválido' })

      res.status(500).json({ message: error.message })
    }
  }
}

export default AuthController
