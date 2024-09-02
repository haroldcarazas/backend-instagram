import User from '../models/User.js'

class UserController {
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
}

export default UserController
