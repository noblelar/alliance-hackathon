import { createCookieSessionStorage } from '@remix-run/node'

type SessionData = {
  isLoggedIn: boolean
  email: string
  id: number
  firstName: string
}

type SessionFlashData = {
  error: string
  toast: string
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: '__session_big_alliance',
      domain: 'localhost',
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secrets: ['s3cret1'],
      secure: true,
      maxAge: 24 * 60 * 60,
    },
  })

export { commitSession, destroySession, getSession }
