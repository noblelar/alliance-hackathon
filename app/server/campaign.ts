import {
  Campaign,
  CampaignDonations,
  CampaignStatus,
  Payment,
  Prisma,
} from '@prisma/client'
import { uploadCloudinary } from './cloudinary.server'
import { db } from './db.server'

function isBase64(str?: string) {
  if (!str) return false

  const base64Regex =
    /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/

  return str.length % 4 === 0 && base64Regex.test(str)
}

export const createCampaign = async (data: Prisma.CampaignCreateInput) => {
  if (data.image && isBase64(data.image)) {
    data.image = await uploadCloudinary(data.image)
  }
}

export const endCampaign = async (id: number) => {
  try {
    await db.campaign.update({
      where: {
        id,
        status: 'PUBLISHED',
      },
      data: {
        status: 'ENDED',
      },
    })

    return {
      status: true,
      message: 'Successfully ended campaign',
    }
  } catch (error: any) {
    return {
      status: false,
      message: error?.message ?? 'Unexpected error occurred',
    }
  }
}

export const publishCampaign = async (id: number) => {
  try {
    await db.campaign.update({
      where: {
        id,
      },
      data: {
        status: 'PUBLISHED',
      },
    })

    return {
      status: true,
      message: 'Successfully published campaign',
    }
  } catch (error: any) {
    return {
      status: false,
      message: error?.message ?? 'Unexpected error occurred',
    }
  }
}

export const updateCampaign = async () => {}

export const getAllCampaigns = async (
  status?: CampaignStatus,
  search?: string
) => {
  const campaigns = await db.campaign.findMany({
    where: {
      ...(status?.length && { status }),
      ...(search?.length && {
        title: { contains: search, mode: 'insensitive' },
      }),
    },
    include: {
      donations: {
        include: {
          payments: true,
        },
      },
    },
  })

  const campaignsWithTotalPayments = campaigns.map((campaign) => {
    const totalPaymentsRaised = calculateAmountRaised(campaign)

    return {
      ...campaign,
      totalPaymentsRaised,
    }
  })

  return {
    campaigns: campaignsWithTotalPayments,
  }
}

export const getCampaign = async (id: number, isAdmin: boolean = false) => {
  const campaign = await db.campaign.findFirstOrThrow({
    where: {
      id,
      ...(!isAdmin && { status: 'PUBLISHED' }),
    },
    include: {
      donations: {
        include: {
          payments: true,
        },
      },
    },
  })

  const campaignWithTotalPayment = {
    ...campaign,
    totalPaymentsRaised: calculateAmountRaised(campaign),
  }

  return {
    campaign: campaignWithTotalPayment,
  }
}

const calculateAmountRaised = (
  campaign: Campaign & {
    donations: (CampaignDonations & { payments: Payment | null })[]
  }
) => {
  const totalPaymentsRaised = campaign?.donations?.reduce((total, donation) => {
    return total + (donation.payments?.amount ?? 0)
  }, 0)

  return totalPaymentsRaised
}
