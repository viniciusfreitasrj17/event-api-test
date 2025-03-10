import 'dotenv/config'

export const HOST_URL = process.env.HOST_URL as string
export const RMQ_USER = process.env.RMQ_USER as string
export const RMQ_PASS = process.env.RMQ_PASS as string
export const RMQ_HOST = process.env.RMQ_HOST as string
export const RMQ_PORT = process.env.RMQ_PORT as string
export const MESSAGE_QUEUE = process.env.MESSAGE_QUEUE as string
