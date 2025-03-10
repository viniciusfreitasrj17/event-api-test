import { MESSAGE_QUEUE } from '../config/envs'
import { IEvent } from '../interfaces/IEvent'
import mqConnection from './connection'

export const sendMessage = async (eventId: string, event: IEvent, typeMessage: 'add' | 'update' | 'delete') => {
  const typesMessages = {
    add: 'Novo evento registrado',
    update: 'Evento editado',
    delete: 'Remoção de um evento'
  }

  const message = {
    date: new Date(),
    action: typeMessage,
    id: eventId,
    content: event.text,
    type: event.type,
    event: typesMessages[typeMessage]
  }

  await mqConnection.sendToQueue(MESSAGE_QUEUE, message)

  console.log('Sent the message to consumer')
}
