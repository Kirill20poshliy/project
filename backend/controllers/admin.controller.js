const adminService = require('../services/admin.service')
const ApiError = require('../errors/api.errors')

class AdminController {

    async registration(req, res, next) {
        try {
            const body = req.body
            const regData = await adminService.registration(body)
            res.status(201).json(regData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const body = req.body
            const adminData = await adminService.login(body)
            res.cookie('refreshToken', adminData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            res.status(200).json(adminData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            if (!refreshToken) {
                ApiError.UnauthtorizedError()
            }
            const token = await adminService.logout(refreshToken)
            res.clearCookie('refreshToken')
            res.status(200).json('Выполнен выход')
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const refresh = await adminService.refresh(refreshToken)
            res.cookie('refreshToken', refresh.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            res.status(200).json(refresh)
        } catch (e) {
            next(e)           
        }
    }

}

module.exports = new AdminController