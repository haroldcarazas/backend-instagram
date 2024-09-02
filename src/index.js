import express from 'express'
import { PORT } from './config/config.js'
import userRoutes from './routes/users.routes.js'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use('/api/users', userRoutes)

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`))
