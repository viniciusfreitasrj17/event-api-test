import { Request, Response, Application } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Events API',
      description: 'API de Gerenciamento de eventos',
      contact: {
        name: 'Marcos Vinicius Nunes de Freitas',
        email: 'viniciusfreitasrj17@gmail.com',
        url: 'https://github.com/viniciusfreitasrj17'
      },
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Local server'
      }
    ]
  },

  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
}
const swaggerSpec = swaggerJsdoc(options)

export function swaggerDocs (app: Application) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}
