const Router = require('express')
const router = new Router()
const sheduleController = require('../controllers/shedule.controller')

router.post('/shedule', sheduleController.registerJob)
router.get('/shedule', sheduleController.getJob)
router.patch('/shedule', sheduleController.updateJob)

module.exports = router