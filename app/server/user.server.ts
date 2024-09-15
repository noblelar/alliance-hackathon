import { z } from 'zod'
import { UserDTO } from '~/dto/user.dto'
import otp from '~/lib/otp'
import { db } from './db.server'
import { customizeEmail, sendEmail } from './mail.server'

export async function addUser(data: z.infer<typeof UserDTO>) {
  const exist = await db.admin.findFirst({
    where: {
      email: data.email,
      isDeleted: false,
    },
  })

  if (exist) {
    return {
      status: false,
      message: 'User with this email already exists',
    }
  }

  await db.admin.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: '',
    },
  })

  //   TODO: send email to user that they have been invited
  return {
    status: true,
    message: 'User has successfully been added',
  }
}

export async function blockUser(userId: number) {
  try {
    await db.admin.update({
      where: {
        id: userId,
      },
      data: {
        isBlocked: true,
      },
    })

    return {
      status: true,
      message: 'Successfully blocked user',
    }
  } catch (error: any) {
    return {
      status: false,
      message: error?.message || 'There was an unexpected error blocking user',
    }
  }
}

export async function unBlockUser(userId: number) {
  try {
    await db.admin.update({
      where: {
        id: userId,
      },
      data: {
        isBlocked: false,
      },
    })

    return {
      status: true,
      message: 'Successfully unblocked user',
    }
  } catch (error: any) {
    return {
      status: false,
      message:
        error?.message || 'There was an unexpected error unblocking user',
    }
  }
}

export async function removeUser(userId: number) {
  try {
    await db.admin.update({
      where: {
        id: userId,
      },
      data: {
        isDeleted: true,
      },
    })

    return {
      status: true,
      message: 'Successfully deleted user',
    }
  } catch (error: any) {
    return {
      status: false,
      message: error?.message || 'There was an unexpected error deleting user',
    }
  }
}

export async function resetAdminPassword(userId: number) {
  try {
    const user = await db.admin.findFirst({
      where: {
        id: userId,
        isBlocked: false,
        isDeleted: false,
      },
    })

    if (!user) {
      return {
        status: false,
        message: 'Unexpected error occured',
      }
    }

    const newLink = otp(20, { specialChars: false })
    const request = await db.resetPasswordRequest.create({
      data: {
        token: newLink,
        email: user.email,
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

    return {
      status: true,
      message: 'Successfully sent a reset link to user email',
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.message || 'Unexpected error occured',
    }
  }
}

export async function getAllUser(search?: string) {
  const admins = await db.admin.findMany({
    where: {
      ...(search?.length && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
        ],
      }),
      isDeleted: false,
    },
  })

  return admins
}
