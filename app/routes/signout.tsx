import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { commitSession, getSession } from '~/sessions'

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  session.unset('isLoggedIn')
  session.unset('email')
  session.unset('id')
  session.unset('firstName')

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
