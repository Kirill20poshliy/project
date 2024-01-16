const eventService = require('../services/event.service')

class EventController {

    async createEvent(req, res, next) {
        try {
            const body = req.body
            const data = await eventService.createEvent(body)
            res.status(201).json(data)
        } catch (e) {
            next(e)
        }
    }

    async getEvents(req, res, next) {
        try {
            const query = req.query
            const data = await eventService.getEvents(query)
            res.status(200).json(data)
        } catch (e) {
            next(e)
        }
    }

    async getEvent(req, res, next) {
        try {
            const id = req.params.id
            const data = await eventService.getEvent(id)
            res.status(200).json(data)
        } catch (e) {
            next(e)
        }
    }

    async updateEvent(req, res, next) {
        try {
            const id = req.params.id
            const body = req.body
            const data = await eventService.updateEvent(id, body)
            res.status(200).json(data)
        } catch (e) {
            next(e)
        }
    }

    async deleteEvent(req, res, next) {
        try {
            const id = req.params.id
            const data = await eventService.deleteEvent(id)
            res.status(200).json(data)
        } catch (e) {
            next(e)           
        }
    }

    async createEventGroup(req, res, next) {
        try {
            const body = req.body
            const data = await eventService.createEventGroup(body)
            res.status(201).json(data)
        } catch (e) {
            next(e)
        }
    }

    async getEventGroups(req, res, next) {
        try {
            const data = await eventService.getEventGroups()
            res.status(200).json(data)
        } catch (e) {
            next(e)
        }       
    }

    async deleteEventGroup(req, res, next) {
        try {
            const id = req.params.id
            const data = await eventService.deleteEventGroup(id)
            res.status(200).json('Группа удалена!')
        } catch (e) {
            next(e)           
        }
    }

    async createEventType(req, res, next) {
        try {
            const body = req.body
            const data = await eventService.createEventType(body)
            res.status(201).json(data)
        } catch (e) {
            next(e)
        }
    }

    async getEventTypes(req, res, next) {
        try {
            const data = await eventService.getEventTypes()
            res.status(200).json(data)
        } catch (e) {
            next(e)
        }      
    }

    async deleteEventType(req, res, next) {
        try {
            const id = req.params.id
            const data = await eventService.deleteEventType(id)
            res.status(200).json('Тип удален!')
        } catch (e) {
            next(e)          
        }
    }
    
    async createEventSpeaker(req, res, next) {
        try {
            const body = req.body
            const data = await eventService.createEventSpeaker(body)
            res.status(201).json(data)
        } catch (e) {
            next(e)
        }
    }

    async getEventSpeakers(req, res, next) {
        try {
            const data = await eventService.getEventSpeakers()
            res.status(200).json(data)
        } catch (e) {
            next(e)
        }      
    }

    async deleteEventSpeaker(req, res, next) {
        try {
            const id = req.params.id
            const data = await eventService.deleteEvent(id)
            res.status(200).json('Спикер удален!')
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new EventController()