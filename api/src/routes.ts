import { Router } from 'express'
import { EventsController } from './controllers/EventsController'
import { EventsService } from './services/EventsService'

const routes = Router()

routes.get('/health', (_, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  }

  res.json({ data })
})

const eventsService = new EventsService()
const eventsController = new EventsController(eventsService)

routes.post('/', async (req, res) => { eventsController.add(req, res) })
routes.get('/', async (req, res) => { eventsController.get(req, res) })
routes.get('/:id', async (req, res) => { eventsController.getOne(req, res) })
routes.put('/:id', async (req, res) => { eventsController.update(req, res) })
routes.delete('/:id', async (req, res) => { eventsController.delete(req, res) })

export { routes }
