import User from '../models/User.js'

class UserController {
  static async index (req, res) {
    try {
      const users = await User.all()
      res.json(users)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getByID (req, res) {
    try {
      const { id } = req.params
      const user = await User.find(id)

      if (!user) return res.status(404).json({ message: 'No se encontró el usuario' })

      delete user.password
      res.json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async store (req, res) {
    try {
      const { fName, lName, username, email, password, mName, image } = req.body
      if (!fName || !lName || !username || !email || !password) return res.status(400).json({ message: 'Faltan datos' })

      const user = await User.create({
        fName,
        lName,
        username,
        email,
        password,
        mName,
        image
      })

      res.status(201).json({ message: 'Usuario creado', data: user })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async delete (req, res) {

  }
}

export default UserController
