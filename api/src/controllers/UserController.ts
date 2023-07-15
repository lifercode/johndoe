import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

import formatError from '../utils/formatError'

const prisma = new PrismaClient()

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  cpf: z.string(),
  color: z.string()
})

type User = z.infer<typeof userSchema>

export default {
  async createUser(req: Request<{}, {}, User>, res: Response) {
    try {
      const user = await prisma.user.create({
        data: userSchema.parse(req.body)
      })
      return res.json(user)
    } catch (err) {
      const formatted = formatError(err)
      return res.status(formatted.status).send(formatted.error)
    }
  }
}
