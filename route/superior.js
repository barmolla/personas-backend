const express        = require('express')
const SuperiorController = require('../controller/superior')
const router         = express.Router()

router.get('/superior/:id', SuperiorController.getByID)
router.get('/superior', SuperiorController.getAll)
router.post('/superior', SuperiorController.create)
router.delete('/superior/:id', SuperiorController.remove)
router.patch('/superior/:id', SuperiorController.patch)

module.exports = router