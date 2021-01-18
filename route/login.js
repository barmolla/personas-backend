import { Router } from 'express'

const LoginController = require('../controller/login')
const router = Router()

router.post('/login', LoginController.login)

export default router