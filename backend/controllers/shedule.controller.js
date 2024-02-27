const sheduleService = require('../services/shedule.service')

class SheduleController {

    async registerJob(req, res, next) {
        try {
            const body = req.body
            const data = await sheduleService.registerJob(body)
            res.status(201).json(data)
        } catch (e) {
            next(e)
        }
    }

    async getJob(req, res, next) {
        try {
            const { user } = req.query
            const data = sheduleService.getJob(user)
            res.status(200).json(data)
        } catch (e) {
            next(e)
        }
    }

    async updateJob(req, res, next) {
        try {
            const { user } = req.query
            const body = req.body
            const data = sheduleService.updateJob(user, body)
            res.status(200).json(data)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new SheduleController()