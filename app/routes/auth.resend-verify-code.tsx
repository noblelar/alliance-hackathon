import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import otp from '~/lib/otp'
import { sendTwoFactor } from '~/server/auth.server'
import { db } from '~/server/db.server'
import { getSession } from '~/sessions'

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const email = session.get('email')

  if (!email || email.trim() == '') {
    return redirect('/login')
  }

  let myCode: string

  let code = await db.twoFactor.findFirst({
    where: {
      admin: {
        email,
      },
      used: false,
    },
    orderBy: { createdAt: 'desc' },
    include: {
      admin: true,
    },
  })

  if (!code) {
    const newotp = otp(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    })
    code = await db.twoFactor.create({
      data: {
        admin: {
          connect: {
            email,
          },
        },
        code: newotp,
      },
      include: {
        admin: true,
      },
    })
  }

  myCode = code.code

  await sendTwoFactor(myCode, code.admin.firstName, code.admin.email)

  return json({
    message: 'Successfully resent code',
  })
}
