const Router = require('express')
const router = new Router()
const eventController = require('../controllers/event.controller')

router.get('/events', eventController.getEvents)
router.get('/events/:id', eventController.getEvent)
router.post('/events', eventController.createEvent)
router.patch('/events/:id', eventController.updateEvent)
router.delete('/events/:id', eventController.deleteEvent)

router.post('/groups', eventController.createEventGroup)
router.get('/groups', eventController.getEventGroups)
router.get('/groups/:id', eventController.getEventGroup)
router.delete('/groups/:id', eventController.deleteEventGroup)

router.post('/types', eventController.createEventType)
router.get('/types', eventController.getEventTypes)
router.get('/types/:id', eventController.getEventType)
router.delete('/types/:id', eventController.deleteEventType)

router.post('/speakers', eventController.createEventSpeaker)
router.get('/speakers', eventController.getEventSpeakers)
router.get('/speakers/:id', eventController.getEventSpeaker)
router.delete('/speakers/:id', eventController.deleteEventSpeaker)


module.exports = router