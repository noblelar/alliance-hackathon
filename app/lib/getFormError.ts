import { IError } from './formatZodError'

export function getFormError(
  name: string,
  errors?: IError[]
): string | undefined {
  const error = errors?.find((errors) => errors.path == name)

  if (error) {
    return error.message
  }

  return undefined
}
