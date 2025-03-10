import { MESSAGE_QUEUE } from '../config/envs'
import { IEvent } from '../interfaces/IEvent'
import mqConnection from './connection'

export const sendMessage = async (eventId: string, event: IEvent, typeMessage: 'add' | 'update' | 'delete') => {
  const typesMessages = {
    add: `Novo evento registrado, id ${eventId}, conteúdo: ${event.text}`,
    update: `Evento editado, id ${eventId}, conteúdo: ${event.text}`,
    delete: `Remoção de um evneto, id ${eventId}0, conteúdo: ${event.text}`
  }

  const message = {
    date: new Date(),
    action: typeMessage,
    id: eventId,
    event: event.text,
    type: event.type,
    message: typesMessages[typeMessage]
  }

  await mqConnection.sendToQueue(MESSAGE_QUEUE, message)

  console.log('Sent the message to consumer')
}
