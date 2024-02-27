const ApiError = require('../errors/api.errors')
const shedule = require('../models/shedule.model')

class SheduleService {

    async registerJob(body) {
        if (!body) {
            throw ApiError.BadRequest('Отсутствует тело запроса!')
        }
        const data = await shedule.create(body)
        if (!data) {
            throw ApiError.ServerError()
        }
        return {message: 'Зарегистрировано расписание!', data: data}
    }

    async getJob(user) {
        if (!user) {
            throw ApiError.BadRequest('User не указан!')
        }
        const data = await shedule.findOne({where: {user: user}})
        if (!data) {
            throw ApiError.ServerError()
        }
        return {data: data}
    }

    async updateJob(user, body) {
        if (!user || !body) {
            throw ApiError.BadRequest('Ошибка запроса')
        }
        const data = await shedule.update(body, { where: {user: user} })
        if (!data) {
            throw ApiError.ServerError()
        }
        return {message: 'Расписание обновлено!', data: data}
    }

}

module.exports = new SheduleService()