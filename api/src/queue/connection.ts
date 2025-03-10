import client, { Channel, ChannelModel } from 'amqplib'

import { RMQ_USER, RMQ_PASS, RMQ_HOST, RMQ_PORT } from '../config/envs'

class RabbitMQConnection {
  connection!: ChannelModel
  channel!: Channel
  private connected!: boolean

  async connect () {
    if (this.connected && this.channel) return
    else this.connected = true

    try {
      console.log('⌛️ Connecting to Rabbit-MQ Server')
      this.connection = await client.connect(
        `amqp://${RMQ_USER}:${RMQ_PASS}@${RMQ_HOST}:${RMQ_PORT}`
      )

      console.log('✅ Rabbit MQ Connection is ready')

      this.channel = await this.connection.createChannel()

      console.log('🛸 Created RabbitMQ Channel successfully')
    } catch (error) {
      console.error(error)
      console.error('Not connected to MQ Server')
    }
  }

  async close () {
    console.error('Closing MQ Server')
    await this.connection.close()
  }

  async sendToQueue (queue: string, message: any) {
    try {
      if (!this.channel) {
        await this.connect()
      }

      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

const mqConnection = new RabbitMQConnection()

export default mqConnection
