import { z } from 'zod'
import { DonorCompanyDTO } from '~/dto/company.dto'
import { db } from './db.server'
import { customizeEmail, sendEmail } from './mail.server'

export const createDonor = async (data: z.infer<typeof DonorCompanyDTO>) => {
  const exist = await db.donorCompany.findFirst({
    where: {
      name: {
        equals: data.companyName,
        mode: 'insensitive',
      },
    },
  })

  if (exist) {
    return {
      status: false,
      message: 'Company with this name already exists',
    }
  }

  await db.donorCompany.create({
    data: {
      name: data.companyName,
      contactPersonEmail: data.contactPersonEmail,
      contactPersonName: data.contactPersonName,
      address: data.companyAddress,
      status: 'UNVERIFIED',
    },
  })

  return {
    status: true,
    message: 'Company has successfully been added',
  }
}

export const verifyDonor = async (donorId: number) => {
  try {
    await db.donorCompany.update({
      where: {
        id: donorId,
      },
      data: {
        status: 'VERIFIED',
      },
    })

    return {
      status: true,
      message: 'Company successfully verified',
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.message,
    }
  }
}

export const rejectDonor = async ({
  donorId,
  message,
}: {
  donorId: number
  message: string
}) => {
  try {
    const company = await db.donorCompany.update({
      where: {
        id: donorId,
      },
      data: {
        status: 'DECLINED',
        declineMessage: message,
      },
    })

    const html = await customizeEmail(
      {
        name: company.contactPersonName,
        rejectionMessage: message,
      },
      'rejected-donor.html'
    )

    await sendEmail(html, company.contactPersonEmail, 'Registration Denied')

    return {
      status: true,
      message: 'Company successfully rejected',
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.message,
    }
  }
}

// TODO: optimize to let backend handle pagination
export const getAllDonor = async (status?: string, search?: string) => {
  const companies = await db.donorCompany.findMany({
    where: {
      ...(status?.length && { status: status as any }),
      ...(search?.length && {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      }),
    },
  })

  return {
    companies,
  }
}

export const getDonorById = async (id: number) => {
  const company = await db.donorCompany.findFirstOrThrow({
    where: {
      id,
    },
  })

  return company
}
