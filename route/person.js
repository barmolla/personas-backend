const express          = require('express')
const PersonController = require('../controller/person')
const router           = express.Router()

router.get('/person/:id', PersonController.getByID)
router.get('/person', PersonController.getAll)
router.post('/person', PersonController.create)
router.delete('/person/:id', PersonController.remove)
router.patch('/person/:id', PersonController.patch)

module.exports = router