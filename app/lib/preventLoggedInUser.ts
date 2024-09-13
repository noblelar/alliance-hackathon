import { redirect } from '@remix-run/node'
import { getSession } from '~/sessions'

export async function preventLoggedInUser(request: Request) {
  const session = await getSession(request.headers.get('Cookie'))
  const accessToken = session.get('accessToken')

  if (accessToken?.length) {
    return redirect('/dashboard')
  }
}
