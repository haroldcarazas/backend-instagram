import { pool } from '../config/db.js'

class User {
  /**
   * Buscar un usuario por su ID
   * @param id ID del usuario a buscar
   */
  static async find (id) {
    const [user] = await pool.execute(
      'SELECT f_name, m_name, l_name, username, email, password, image FROM users WHERE user_id = ?',
      [id]
    )
    return user[0]
  }

  /**
   * Crear nuevo usuario
   * @param fName Primer nombre
   * @param mName Segundo nombre
   * @param lName Apellidos
   * @param username
   * @param email
   * @param password
   * @param image Foto de perfil
   */
  static async create ({
    fName,
    lName,
    username,
    email,
    password,
    mName,
    image
  }) {
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
    const placeholders = camposObligatorios.map(() => '?').join(', ')

    const query = `INSERT INTO users(${stringCamposObligatorios}) VALUES (${placeholders})`
    const [resultado] = await pool.execute(query, datosGuardar)
    const user = await this.find(resultado.insertId)

    delete user.password

    return user
  }

  static async delete () {}

  static async read () {}

  static async update () {}
}

export default User
