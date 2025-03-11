import { Router } from 'express'
import { EventsController } from '../controllers/EventsController'
import { EventsService } from '../services/EventsService'

const routes = Router()

routes.get('/health', (_, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  }

  res.json({ data })
})

const eventsService = new EventsService()
const eventsController = new EventsController(eventsService)

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Obter todos os eventos.
 *     description: Retorna uma lista de todos os eventos disponíveis.
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Quantidade de Eventos por página, por padrão 10.
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número da página, por padrão 1.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito. Retorna a lista de eventos.
 *       400:
 *         description: A requisição está incorreta ou incompleta.
 *       500:
 *         description: Error interno no servidor.
 */
routes.get('/', async (req, res) => { eventsController.get(req, res) })

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Cria um novo evento.
 *     description: Cria um novo evento com os dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - owner
 *             properties:
 *               text:
 *                 type: string
 *                 description: Conteúdo do evento (texto).
 *               owner:
 *                 type: string
 *                 description: Nome do usuário que está registrando esse evento.
 *               type:
 *                 type: string
 *                 description: Tipo do evento, como por exemplos notification, alert, error, warning, info ...
 *
 *     responses:
 *       201:
 *         description: Evento criado com sucesso.
 *       400:
 *         description: A requisição está incorreta ou incompleta.
 *       500:
 *         description: Error interno no servidor.
 */
routes.post('/', async (req, res) => { eventsController.add(req, res) })

/**
 * @swagger
 * /events/{id}:
 *   patch:
 *     summary: Retorna um evento.
 *     description: Retorna um evento com seus dados.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Evento.
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Éxito. Retorna o evento.
 *       400:
 *         description: A requisição está incorreta ou incompleta.
 *       404:
 *         description: Evento não encontrado.
 *       500:
 *         description: Error interno no servidor.
 */
routes.get('/:id', async (req, res) => { eventsController.getOne(req, res) })

/**
 * @swagger
 * /events/{id}:
 *   patch:
 *     summary: Atualiza um evento.
 *     description: Atualiza um evento com o texto fornecidos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Evento.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 description: Conteúdo do evento (texto).
 *
 *     responses:
 *       204:
 *         description: Éxito. Evento atualizado.
 *       400:
 *         description: A requisição está incorreta ou incompleta.
 *       404:
 *         description: Evento não encontrado.
 *       500:
 *         description: Error interno no servidor.
 */
routes.patch('/:id', async (req, res) => { eventsController.update(req, res) })

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Remove um evento.
 *     description: Remove um evento pelo seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Evento.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Éxito. Evento removido.
 *       404:
 *         description: Evento não encontrado.
 *       500:
*          description: Error interno no servidor.
 */
routes.delete('/:id', async (req, res) => { eventsController.delete(req, res) })

export { routes }
