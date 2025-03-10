import { Request, Response } from 'express'

export interface IController {
  add: (req: Request, res: Response) => void
  get: (req: Request, res: Response) => void
  getOne: (req: Request, res: Response) => void
  update: (req: Request, res: Response) => void
  delete: (req: Request, res: Response) => void
}
