import { randomUUID } from 'crypto'
import { IEvent } from '../interfaces/IEvent'
import { IService } from '../interfaces/IService'

export class EventsService implements IService {
  constructor (
    private readonly events = new Map<string, IEvent>()
  ) {}

  add (e: IEvent) {
    this.events.set(randomUUID(), e)
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
      this.events.set(id, { ...(event as IEvent), text })
    }
  }

  delete (id: string) {
    this.events.delete(id)
  }
}
