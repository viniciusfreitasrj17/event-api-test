import express from 'express'
import cors = require('cors')
import { routes } from './routes/EventsRoutes'
import mqConnection from './queue/connection'
import { swaggerDocs } from './docs/swagger'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors<express.Request>({ origin: '*' }))
app.use('/events', routes)
swaggerDocs(app)
app.use('*', (req, res) => { res.status(404).json({ error: `Not Found page ${req.originalUrl}` }) })

app.listen(port, async () => {
  console.log('Connection to Queue...')
  await mqConnection.connect()
  console.log('Listeing...')
})
