import { randomUUID } from 'crypto'
import { IEvent } from '../interfaces/IEvent'
import { IService } from '../interfaces/IService'
import { sendMessage } from '../queue/sendMessage'

export class EventsService implements IService {
  constructor (
    private readonly events = new Map<string, IEvent>()
  ) {}

  add (e: IEvent) {
    const id = randomUUID()
    this.events.set(id, e)
    sendMessage(id, e, 'add')
  }

  get () {
    return this.events
  }

  getOne (id: string) {
    if (this.events.has(id)) {
      return this.events.get(id)
    }
    return undefined
  }

  update (id: string, text: string) {
    if (this.events.has(id)) {
      const event = this.events.get(id)
      const newEvent = { ...(event as IEvent), text }
      this.events.set(id, newEvent)
      sendMessage(id, newEvent, 'update')
    }
  }

  delete (id: string) {
    if (this.events.has(id)) {
      const event = this.events.get(id)
      this.events.delete(id)
      sendMessage(id, event as IEvent, 'delete')
    }
  }
}
