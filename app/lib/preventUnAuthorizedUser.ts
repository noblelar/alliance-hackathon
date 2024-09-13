import { getSession } from '~/sessions'

export async function preventUnAuthorizedUser(request: Request) {
  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')

  if (!accessToken?.length) {
    return true
  }
}
