import { IBase } from './IBase'

export interface IEvent extends IBase {
  text: string
  owner: string
  type?: string
}
