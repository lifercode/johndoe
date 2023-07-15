import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'

export default function formatError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return {
        status: 409,
        error:  {
          message: `Este ${error.meta?.target} já foi cadastrado.`
        }
      }
    }
  }

  if (error instanceof ZodError) {
    return {
      status: 400,
      error: {
        message: `${error.issues[0].message} - ${error.issues[0].path[0]}`
      }
    }
  }

  return {
    status: 500,
    error
  }
}
