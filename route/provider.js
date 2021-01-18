const express            = require('express')
const ProviderController = require('../controller/provider')
const router             = express.Router()

router.get('/provider/:id', ProviderController.getByID)
router.get('/provider', ProviderController.getAll)
router.post('/provider', ProviderController.create)
router.delete('/provider/:id', ProviderController.remove)
router.patch('/provider/:id', ProviderController.patch)

module.exports = router