const Router = require('express')
const router = new Router()
const eventController = require('../controllers/event.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/events', eventController.getEvents)
router.get('/events/:id', eventController.getEvent)
router.post('/events', authMiddleware, eventController.createEvent)
router.patch('/events/:id', authMiddleware, eventController.updateEvent)
router.delete('/events/:id', authMiddleware, eventController.deleteEvent)

router.post('/groups', authMiddleware, eventController.createEventGroup)
router.get('/groups', eventController.getEventGroups)
router.get('/groups/:id', eventController.getEventGroup)
router.patch('/groups/:id', authMiddleware, eventController.updateEventGroup)
router.delete('/groups/:id', authMiddleware, eventController.deleteEventGroup)

router.post('/types', authMiddleware, eventController.createEventType)
router.get('/types', eventController.getEventTypes)
router.get('/types/:id', eventController.getEventType)
router.patch('/types/:id', authMiddleware, eventController.updateEventType)
router.delete('/types/:id', authMiddleware, eventController.deleteEventType)

router.post('/speakers', authMiddleware, eventController.createEventSpeaker)
router.get('/speakers', eventController.getEventSpeakers)
router.get('/speakers/:id', eventController.getEventSpeaker)
router.patch('/speakers/:id', authMiddleware, eventController.updateEventSpeaker)
router.delete('/speakers/:id', authMiddleware, eventController.deleteEventSpeaker)


module.exports = router