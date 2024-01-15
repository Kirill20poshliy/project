const group = require('../models/group.model')
const type = require('../models/type.model')
const speaker = require('../models/speaker.model')
const event = require('../models/event.model')

class EventService {

    async createEvent(body) {
        const data = await event.create(body)
        if (!data) {
            return null
        }
        return data
    }

    async getEvents() {
        const data = await event.findAll()
        if (!data) {
            return null
        }
        return data
    }

    async getEvent(id) {
        const data = await event.findByPk(id)
        if (!data) {
            return null
        }
        return data
    }
    
    async updateEvent(id, body) {
        const data = await event.update(body, { where: {id: id} })
        if (!data) {
            return null
        }
        return data
    }
    
    async deleteEvent(id) {
        const result = await event.destroy({ where: {id: id} })
        if (!result) {
            return null
        }
        return result
    }

    async createEventGroup(body) {
        const data = await group.create({ code: body.code })
        if (!data) {
            return null
        }
        return data
    }

    async getEventGroups() {
        const data = await group.findAll()
        if (!data) {
            return null
        }
        return data
    }

    async deleteEventGroup(id) {
        const result = await group.destroy({ where: {id: id} })
        if (!result) {
            return null
        }
        return result
    }

    async createEventType(body) {
        const data = await type.create({ name: body.name })
        if (!data) {
            return null
        }
        return data
    }

    async getEventTypes() {
        const data = await type.findAll()
        if (!data) {
            return null
        }
        return data
    }

    async deleteEventType(id) {
        const result = await type.destroy({ where: {id: id} })
        if (!result) {
            return null
        }
        return result
    }

    async createEventSpeaker(body) {
        const data = await speaker.create({ name: body.name })
        if (!data) {
            return null
        }
        return data
    }

    async getEventSpeakers() {
        const data = await speaker.findAll()
        if (!data) {
            return null
        }
        return data
    }

    async deleteEventSpeaker(id) {
        const result = await speaker.destroy({ where: {id: id} })
        if (!result) {
            return null
        }
        return result
    }

}

module.exports = new EventService()
