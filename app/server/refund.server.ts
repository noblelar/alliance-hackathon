import { db } from './db.server'

export const createRefund = async (data: {
  email: string
  donorId: string
}) => {
  try {
    const donation = await db.campaignDonations.findFirstOrThrow({
      where: {
        email: data.email,
        donationId: data.donorId,
      },
    })

    await db.donationRefund.create({
      data: {
        donation: {
          connect: {
            id: donation.id,
          },
        },
        email: data.email,
      },
    })

    return {
      status: true,
      message: 'Your request has been logged successfully',
    }
  } catch (error: any) {
    return {
      status: false,
      message: error?.message || 'An unexpected error occured',
    }
  }
}

export const getAllRefund = async (status?: boolean, search?: string) => {
  const refunds = await db.donationRefund.findMany({
    where: {
      ...(status != undefined && { fulfilled: status }),
      ...(search?.length && {
        donation: {
          email: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }),
    },
    include: {
      donation: true,
    },
  })

  return {
    refunds,
  }
}

export const markRefund = async (requestId: number) => {
  try {
    await db.donationRefund.update({
      where: {
        id: requestId,
      },
      data: {
        fulfilled: true,
      },
    })

    return {
      status: true,
      message: 'Successfully marked as completed',
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.message ?? 'An unexpected error occured',
    }
  }
}
