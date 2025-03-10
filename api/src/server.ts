import express from 'express'
import cors = require('cors')
import { routes } from './routes'
import mqConnection from './queue/connection'

const app = express()

app.use(express.json())
app.use(cors<express.Request>({ origin: '*' }))
app.use('/events', routes)
app.use('*', (req, res) => { res.status(404).json({ error: `Not Found page ${req.originalUrl}` }) })

app.listen(3000, async () => {
  console.log('Connection to Queue...')
  await mqConnection.connect()
  console.log('Listeing...')
})
