import { ZodError } from 'zod'

export interface IError {
  path: string
  message: string
}

export function formatZodErrors(errors: ZodError[]): IError[] {
  return errors.map((err) => ({
    path: (err as any)?.path[0],
    message: err.message,
  }))
}
