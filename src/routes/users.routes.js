import { Router } from 'express'
import UserController from '../controllers/user.controller.js'

const router = Router()

router.get('/', UserController.index)
router.get('/:id', UserController.getByID)
router.post('/', UserController.store)

export default router
