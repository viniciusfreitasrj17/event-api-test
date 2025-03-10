interface IMessage {
  id: string
  date: string
  action: 'add' | 'update' | 'delete'
  content: string
  type: string
  event: string
}

const colors = {
  add: '\x1b[32m%s\x1b[0m',
  update: '\x1b[34m%s\x1b[0m',
  delete: '\x1b[31m%s\x1b[0m'
}

export const handleIncomingNotification = (msg: string) => {
  try {
    const parsedMessage: IMessage = JSON.parse(msg)

    if (parsedMessage) {
      console.log(
        colors[parsedMessage.action],
       `[Received Message ID: ${parsedMessage.id}]\n[Event: ${parsedMessage.event}]\n[Date: ${parsedMessage.date}]\n[Type: ${parsedMessage.type.toUpperCase()}]\n[Content: ${parsedMessage.content}]\n`
      )
    }
  } catch (error) {
    console.error('Error While Parsing the message')
  }
}
