import { pool } from '../config/db.js'

class User {
  static async create ({
    fName,
    lName,
    username,
    email,
    password,
    mName,
    image
  }) {
    if (!fName || !lName || !username || !email || !password) {
      throw new Error('Faltan datos para el usuario')
    }

    const camposObligatorios = [
      'f_name',
      'l_name',
      'username',
      'email',
      'password'
    ]
    const datosGuardar = [fName, lName, username, email, password]

    if (mName) {
      camposObligatorios.push('m_name')
      datosGuardar.push(mName)
    }

    if (image) {
      camposObligatorios.push('image')
      datosGuardar.push(image)
    }

    const stringCamposObligatorios = camposObligatorios.join(', ')
    const placeholders = camposObligatorios.map(() => '?')
    const stringPlaceholders = placeholders.join(', ')
    const user = await pool.execute(
      `INSER INTO users(${stringCamposObligatorios}) VALUES (${stringPlaceholders})`,
      datosGuardar
    )

    return user
  }

  static async delete () {}

  static async read () {}

  static async update () {}
}

export default User
