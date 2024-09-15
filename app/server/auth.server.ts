import bcrypt from 'bcrypt'
import { z } from 'zod'
import { LoginDTO } from '~/dto/auth.dto'
import { hashPassword } from '~/lib/hasher'
import otp from '~/lib/otp'
import { db } from './db.server'
import { customizeEmail, sendEmail } from './mail.server'

export async function login(data: z.infer<typeof LoginDTO>) {
  try {
    const user = await db.admin.findFirst({
      where: {
        email: { equals: data.email, mode: 'insensitive' },
        isDeleted: false,
        isBlocked: false,
      },
    })

    if (!user) {
      return {
        status: false,
        user,
      }
    }

    const match = bcrypt.compareSync(data.password, user.password)

    if (!match) {
      return {
        status: false,
        user,
      }
    }

    const code = otp(6, {
      upperCaseAlphabets: false,
      digits: true,
      specialChars: false,
      lowerCaseAlphabets: false,
    })

    await db.twoFactor.create({
      data: {
        admin: {
          connect: {
            id: user.id,
          },
        },
        code,
      },
      include: {
        admin: true,
      },
    })

    await sendTwoFactor(code, user.firstName, user.email)

    return {
      status: true,
      user,
    }
  } catch (error) {
    return {
      status: false,
      user: null,
    }
  }
}

export async function sendTwoFactor(code: string, name: string, email: string) {
  const html = await customizeEmail(
    {
      name: name,
      otp1: code[0],
      otp2: code[1],
      otp3: code[2],
      otp4: code[3],
      otp5: code[4],
      otp6: code[5],
    },
    'two-factor.html'
  )

  await sendEmail(html, email, 'Two Factor for Login')
}

export async function verifyCode(code: string, email: string) {
  const exists = await db.twoFactor.findFirst({
    where: {
      admin: {
        email,
      },
      code,
      used: false,
    },
    include: {
      admin: true,
    },
  })

  if (!exists) {
    return {
      status: false,
      message: 'Incorrect otp or your otp has expired',
      code: null,
    }
  }

  await db.twoFactor.update({
    where: {
      id: exists.id,
    },
    data: {
      used: true,
    },
  })

  return {
    status: true,
    message: 'Successfully logged in',
    code: exists,
  }
}

export async function requestForgotPassword(email: string) {
  try {
    const user = await db.admin.findFirst({
      where: {
        email,
        isBlocked: false,
        isDeleted: false,
      },
    })

    if (!user) {
      return true
    }

    const newLink = otp(20, { specialChars: false })
    const request = await db.resetPasswordRequest.create({
      data: {
        token: newLink,
        email,
        userId: user.id,
      },
    })

    const html = await customizeEmail(
      {
        name: user.firstName,
        link:
          process.env.FRONTEND_URL +
          `/reset-password/${user.id}/${request.token}`,
      },
      'forgot-password.html'
    )

    await sendEmail(html, user.email, 'Forgot Password')

    return true
  } catch (error) {
    console.log(error)
    return true
  }
}

export async function resetPassword(
  userId: number,
  password: string,
  token: string
) {
  try {
    const request = await db.resetPasswordRequest.findFirst({
      where: {
        userId: userId,
        token,
        isUsed: false,
      },
    })

    if (!request) {
      throw new Error('Incorrect verification link')
    }

    const hash = await hashPassword(password)
    await db.admin.update({
      where: {
        isBlocked: false,
        isDeleted: false,
        id: userId,
      },

      data: {
        password: hash,
      },
    })

    await db.resetPasswordRequest.update({
      where: {
        id: request.id,
      },
      data: {
        isUsed: false,
      },
    })

    return {
      status: true,
      message: 'Successfully updated your password',
    }
  } catch (error: any) {
    return {
      status: false,
      message:
        error.message ?? 'There was an unexpected error changing your password',
    }
  }
}
