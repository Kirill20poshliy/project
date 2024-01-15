const eventService = require('../services/event.service')

class EventController {

    async createEvent(req, res) {
        try {
            const body = req.body
            if (!body) {
                throw new Error('Отсутствует тело запроса!')
            }
            const data = await eventService.createEvent(body)
            if (!data) {
                throw new Error('Что-то пошло не так!')
            }
            res.status(201).json(data)
        } catch (e) {
            res.status(400).json(e.message)
            console.log(e.message)
        }
    }

    async getEvents(req, res) {
        try {
            const data = await eventService.getEvents()
            if (!data) {
                throw new Error('Что-то пошло не так!')
            }
            res.status(200).json(data)
        } catch (e) {
            res.status(400).json(e.message)
            console.log(e.message)
        }
    }

    async getEvent(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                throw new Error(`События не существует!`)
            }
            const data = await eventService.getEvent(id)
            if (!data) {
                throw new Error('Что-то пошло не так!')
            }
            res.status(200).json(data)
        } catch (e) {
            res.status(400).json(e.message)
            console.log(e.message)
        }
    }

    async updateEvent(req, res) {
        try {
            const id = req.params.id
            const body = req.body
            if (!id || !body) {
                throw new Error('Ошибка запроса')
            }
            const data = eventService.updateEvent(id, body)
            if (!data) {
                throw new Error('Что-то пошло не так!')
            }
            res.status(200).json('Событие обновлено!')
        } catch (e) {
            res.status(400).json(e.message)
            console.log(e.message)
        }
    }

    async deleteEvent(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                throw new Error(`События не существует!`) 
            }
            const data = await eventService.deleteEvent(id)
            if (!data) {
                throw new Error('Что-то пошло не так!')
            }
            res.status(200).json('Событие удалено!')
        } catch (e) {
            res.status(400).json(e.message)
            console.log(e.message)            
        }
    }

    async createEventGroup(req, res) {
        try {
            const body = req.body
            if (!body) {
                throw new Error('Отсутствует тело запроса!')
            }
            const data = await eventService.createEventGroup(body)
            if (!data) {
                throw new Error('Что-то пошло не так!')
            }
            res.status(201).json(data)
        } catch (e) {
            res.status(400).json(e.message)
            console.log(e.message)
        }
    }

    async getEventGroups(req, res) {
        try {
            const data = await eventService.getEventGroups()
            if (!data) {
                throw new Error('Что-то пошло не так!')
            }
            res.status(200).json(data)
        } catch (e) {
            res.status(400).json(e.message)
            console.log(e.message)
        }       
    }

    async deleteEventGroup(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                throw new Error(`Группы не существует!`) 
            }
            const data = await eventService.deleteEventGroup(id)
            if (!data) {
                throw new Error('Что-то пошло не так!')
            }
            res.status(200).json('Группа удалена!')
        } catch (e) {
            res.status(400).json(e.message)
            console.log(e.message)            
        }
    }

    async createEventType(req, res) {
        try {
            const body = req.body
            if (!body) {
                throw new Error('Отсутствует тело запроса!')
            }
            const data = await eventService.createEventType(body)
            if (!data) {
                throw new Error('Что-то пошло не так!')
            }
            res.status(201).json(data)
        } catch (e) {
            res.status(400).json(e.message)
            console.log(e.message)
        }
    }

    async getEventTypes(req, res) {
        try {
            const data = await eventService.getEventTypes()
            if (!data) {
                throw new Error('Что-то пошло не так!')
            }
            res.status(200).json(data)
        } catch (e) {
            res.status(400).json(e.message)
            console.log(e.message)
        }      
    }

    async deleteEventType(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                throw new Error(`Типа не существует!`) 
            }
            const data = await eventService.deleteEventType(id)
            if (!data) {
                throw new Error('Что-то пошло не так!')
            }
            res.status(200).json('Тип удален!')
        } catch (e) {
            res.status(400).json(e.message)
            console.log(e.message)            
        }
    }
    
    async createEventSpeaker(req, res) {
        try {
            const body = req.body
            if (!body) {
                throw new Error('Отсутствует тело запроса!')
            }
            const data = await eventService.createEventSpeaker(body)
            if (!data) {
                throw new Error('Что-то пошло не так!')
            }
            res.status(201).json(data)
        } catch (e) {
            res.status(400).json(e.message)
            console.log(e.message)
        }
    }

    async getEventSpeakers(req, res) {
        try {
            const data = await eventService.getEventSpeakers()
            if (!data) {
                throw new Error('Что-то пошло не так!')
            }
            res.status(200).json(data)
        } catch (e) {
            res.status(400).json(e.message)
            console.log(e.message)
        }      
    }

    async deleteEventSpeaker(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                throw new Error(`Спикера не существует!`) 
            }
            const data = await eventService.deleteEvent(id)
            if (!data) {
                throw new Error('Что-то пошло не так!')
            }
            res.status(200).json('Спикер удален!')
        } catch (e) {
            res.status(400).json(e.message)
            console.log(e.message)            
        }
    }

}

module.exports = new EventController()