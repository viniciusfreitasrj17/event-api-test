import client, { Channel, ChannelModel } from 'amqplib'

import { RMQ_USER, RMQ_PASS, RMQ_HOST, RMQ_PORT, MESSAGE_QUEUE } from '../config/envs'

type HandlerCB = (msg: string) => any

class RabbitMQConnection {
  connection!: ChannelModel
  channel!: Channel
  private connected!: boolean

  async connect () {
    if (this.connected && this.channel) return

    try {
      console.log('⌛️ Connecting to Rabbit-MQ Server')
      this.connection = await client.connect(
        `amqp://${RMQ_USER}:${RMQ_PASS}@${RMQ_HOST}:${RMQ_PORT}`
      )

      console.log('✅ Rabbit MQ Connection is ready')

      this.channel = await this.connection.createChannel()

      console.log('🛸 Created RabbitMQ Channel successfully')

      this.connected = true
    } catch (error) {
      console.error(error)
      console.error('Not connected to MQ Server')
    }
  }

  async close () {
    console.error('Closing MQ Server')
    await this.connection.close()
  }

  async consume (handleIncomingNotification: HandlerCB) {
    if (!this.channel) {
      await this.connect()
    }

    await this.channel.assertQueue(MESSAGE_QUEUE, {
      durable: true
    })

    this.channel.consume(
      MESSAGE_QUEUE,
      (msg) => {
        if (!msg) {
          console.error('Invalid incoming message'); return
        }
        handleIncomingNotification(msg?.content?.toString())
        this.channel.ack(msg)
      },
      {
        noAck: false
      }
    )
  }
}

const mqConnection = new RabbitMQConnection()

export default mqConnection
