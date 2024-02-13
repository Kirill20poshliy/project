const Router = require('express')
const adminController = require('../controllers/admin.controller')
const router = new Router()

router.post('/registration', adminController.registration)
router.post('/login', adminController.login)
router.post('/logout', adminController.logout)
router.get('/refresh', adminController.refresh)

module.exports = router