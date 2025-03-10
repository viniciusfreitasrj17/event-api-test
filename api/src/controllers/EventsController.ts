import { Request, Response } from 'express'
import { IController } from '../interfaces/IController'
import { EventsService } from '../services/EventsService'
import { HOST_URL } from '../config/envs'

export class EventsController implements IController {
  constructor (
    private readonly _eventsService: EventsService
  ) {}

  add (req: Request, res: Response) {
    const { text, owner, type } = req.body

    this._eventsService.add({
      text,
      owner,
      type: type || 'notification'
    })

    res.status(201).send()
  }

  get (req: Request, res: Response) {
    const events = this._eventsService.get()
    const limit = req.query.limit
    const page = req.query.page
    const config: { limit?: number, page?: number } = {}

    if (limit) {
      if (typeof Number(limit) !== 'number' || isNaN(Number(limit))) {
        res.status(400).json({ error: 'Query limit invalid' })
        return
      } else {
        config.limit = Number(limit)
      }
    }

    if (page) {
      if (typeof Number(page) !== 'number' || isNaN(Number(page))) {
        res.status(400).json({ error: 'Query page invalid' })
        return
      } else {
        config.page = Number(page)
      }
    }

    res.json({ result: this.serializer(Array.from(events), config) })
  }

  getOne (req: Request, res: Response) {
    const event = this._eventsService.getOne(req.params.id)
    if (!event) {
      res.status(400).json({ erro: 'Not Found' })
    } else {
      res.json({ result: event })
    }
  }

  update (req: Request, res: Response) {
    const event = this._eventsService.getOne(req.params.id)
    if (!event) {
      res.status(400).json({ erro: 'Not Found' })
    } else {
      const { text } = req.body

      this._eventsService.update(req.params.id, String(text))

      res.send()
    }
  }

  delete (req: Request, res: Response) {
    const event = this._eventsService.getOne(req.params.id)
    if (!event) {
      res.status(400).json({ erro: 'Not Found' })
    } else {
      this._eventsService.delete(req.params.id)
      res.send()
    }
  }

  private serializer (data: any[], { limit = 10, page = 1 }: { limit?: number, page?: number }) {
    const size = data.length
    const totalPages = parseInt(String(size / limit)) + (size % limit > 0 ? 1 : 0)

    const prev = (page > 1 && totalPages > 0) ? `${HOST_URL}/events/limit=${limit}&page=${page - 1}` : null
    const next = page < totalPages ? `${HOST_URL}/events/limit=${limit}&page=${page + 1}` : null

    const items = data.slice((page - 1) * limit, page * limit)

    return {
      paginator: {
        total: size,
        total_pages: totalPages,
        current_page: page,
        per_page: limit
      },
      links: {
        prev,
        next
      },
      items
    }
  }
}
