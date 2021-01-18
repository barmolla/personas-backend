const express           = require('express')
const ProjectController = require('../controller/project')
const router            = express.Router()

router.get('/project/:id', ProjectController.getByID)
router.get('/project', ProjectController.getAll)
router.post('/project', ProjectController.create)
router.delete('/project/:id', ProjectController.remove)
router.patch('/project/:id', ProjectController.patch)

module.exports = router