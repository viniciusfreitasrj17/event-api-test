import { IEvent } from './IEvent'

export interface IService {
  add: (e: IEvent) => void
  get: () => Map<string, IEvent>
  getOne: (id: string) => IEvent | undefined
  update: (id: string, text: string) => void
  delete: (id: string) => void
}
