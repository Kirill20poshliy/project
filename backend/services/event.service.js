const group = require('../models/group.model')
const type = require('../models/type.model')
const speaker = require('../models/speaker.model')
const event = require('../models/event.model')
const ApiError = require('../errors/api.errors')

class EventService {

    async createEvent(body) {
        if (!body) {
            ApiError.BadRequest('Отсутствует тело запроса!')
        }
        const data = await event.create(body)
        if (!data) {
            ApiError.ServerError()
        }
        return {message: 'Событие создано!', data: data}
    }

    async getEvents(query) {
        const data = await event.findAll()
        if (!data) {
            ApiError.ServerError()
        }
        let result = data
        if (query.year) {
            result = result.filter(event => event.datetime.getFullYear() === Number(query.year))
        }
        if (query.month) {
            result = result.filter(event => event.datetime.getMonth() === Number(query.month))
        }
        if (query.day) {
            result = result.filter(event => event.datetime.getDate() === Number(query.day))
        }
        return {count: result.length, data: result}
    }

    async getEvent(id) {
        if (!id) {
            ApiError.BadRequest(`Отсутствует id запроса!`)
        }
        const data = await event.findByPk(id)
        if (!data) {
            ApiError.ServerError()
        }
        return {data: data}
    }
    
    async updateEvent(id, body) {
        if (!id || !body) {
            ApiError.BadRequest('Ошибка запроса')
        }
        const data = await event.update(body, { where: {id: id} })
            if (!data) {
                ApiError.ServerError()
            }
        return {message: 'Событие обновлено!', data: data}
    }
    
    async deleteEvent(id) {
        if (!id) {
            ApiError.BadRequest(`Отсутствует id запроса!`)
        }
        const result = await event.destroy({ where: {id: id} })
        if (!result) {
            ApiError.ServerError()
        }
        return {message: 'Событие удалено!', data: result}
    }

    async createEventGroup(body) {
        if (!body) {
            ApiError.BadRequest('Отсутствует тело запроса!')
        }
        const data = await group.create({ code: body.code })
        if (!data) {
            ApiError.ServerError()
        }
        return {message: 'Группа создана!', data: data}
    }

    async getEventGroups() {
        const data = await group.findAll()
        if (!data) {
            ApiError.ServerError()
        }
        return {count: data.length, data: data}
    }

    async getEventGroup(id) {
        const data = await group.findByPk(id)
        if (!data) {
            ApiError.ServerError()
        }
        return data
    }

    async deleteEventGroup(id) {
        if (!id) {
            ApiError.BadRequest(`Отсутствует id зпроса!`)
        }
        const result = await group.destroy({ where: {id: id} })
        if (!result) {
            ApiError.ServerError()
        }
        return {message: 'Группа удалена!', data: result}
    }

    async createEventType(body) {
        if (!body) {
            ApiError.BadRequest('Отсутствует тело запроса!')
        }
        const data = await type.create({ name: body.name })
        if (!data) {
            ApiError.ServerError()
        }
        return {message: 'Тип создан!', data: data}
    }

    async getEventTypes() {
        const data = await type.findAll()
        if (!data) {
            ApiError.ServerError()
        }
        return {count: data.length, data: data}
    }

    async getEventType(id) {
        const data = await group.findByPk(id)
        if (!data) {
            ApiError.ServerError()
        }
        return data
    }

    async deleteEventType(id) {
        if (!id) {
            ApiError.BadRequest(`Отсутствует id запроса!`)
        }
        const result = await type.destroy({ where: {id: id} })
        if (!result) {
            ApiError.ServerError()
        }
        return {message: 'Тип удалён!', data: result}
    }

    async createEventSpeaker(body) {
        if (!body) {
            ApiError.BadRequest('Отсутствует тело запроса!')
        }
        const data = await speaker.create({ name: body.name })
        if (!data) {
            ApiError.ServerError()
        }
        return {message: 'Спикер создан!', data: data}
    }

    async getEventSpeakers() {
        const data = await speaker.findAll()
        if (!data) {
            ApiError.ServerError()
        }
        return {count: data.length, data: data}
    }

    async getEventSpeaker(id) {
        const data = await group.findByPk(id)
        if (!data) {
            ApiError.ServerError()
        }
        return data
    }

    async deleteEventSpeaker(id) {
        if (!id) {
            ApiError.BadRequest(`Спикера не существует!`)
        }
        const result = await speaker.destroy({ where: {id: id} })
        if (!result) {
            ApiError.ServerError()
        }
        return {message: 'Спикер удалён!', data: result}
    }

}

module.exports = new EventService()
