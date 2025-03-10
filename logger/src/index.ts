import mqConnection from './queue/connection'
import { handleIncomingNotification } from './queue/listenMessage'

mqConnection.connect().then(_ => {
  console.log('Listeing Queue...')

  mqConnection.consume(handleIncomingNotification)
})
