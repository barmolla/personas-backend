const express        = require('express')
const RoleController = require('../controller/role')
const router         = express.Router()

router.get('/role/:id', RoleController.getByID)
router.get('/role', RoleController.getAll)
router.post('/role', RoleController.create)
router.delete('/role/:id', RoleController.remove)
router.patch('/role/:id', RoleController.patch)

module.exports = router