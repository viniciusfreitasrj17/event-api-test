import express from 'express'
import cors = require('cors')
import { routes } from './routes'

const app = express()

app.use(express.json())
app.use(cors<express.Request>({ origin: '*' }))
app.use('/events', routes)
app.use('*', (req, res) => { res.status(404).json({ error: `Not Found page ${req.originalUrl}` }) })

app.listen(3000, () => { console.log('Listeing...') })
