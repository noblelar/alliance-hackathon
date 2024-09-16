import { ActionFunctionArgs, json } from '@remix-run/node'
import axios from 'axios'
import { db } from '~/server/db.server'
import { getAccessToken } from '~/server/paypal.server'

interface IBody {
  fullname: string
  email: string
  amount: number
  companyId: number // Convert to number if exists
  isGiftAided: boolean
  isMyOwnMoney: boolean
  isCompanyMoney: boolean
  address?: string
  donorType: string
  orderID: string
  campaignId: number
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const body = (await request.json()) as IBody
    const accessToken = await getAccessToken()
    const { orderID } = body

    console.log('body:', body)

    const captureResponse = await axios({
      url: `${process.env.PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    // Capture was successful
    if (captureResponse.data.status === 'COMPLETED') {
      const donation = await db.campaignDonations.create({
        data: {
          campaign: {
            connect: {
              id: body.campaignId,
            },
          },
          name: body.fullname,
          amount: body.amount,
          isCompanyDonation: body.donorType == 'company',
          ...(body.donorType == 'company' && {
            DonorCompany: {
              connect: {
                id: body.companyId,
              },
            },
          }),
          agreedCompanyMoney: body.isCompanyMoney,
          agreedPersonalMoney: body.isMyOwnMoney,
          email: body.email,
        },
      })

      await db.payment.create({
        data: {
          amount: body.amount,
          donation: {
            connect: {
              id: donation.id,
            },
          },
          status: 'PAID',
        },
      })
      return json({
        status: 'COMPLETED',
        redirectUrl: `/campaign/thank-you?donationId=${donation.donationId}`,
      })
    } else {
      return json({ status: 'FAILED', message: 'Payment not successful' })
    }
  } catch (err) {
    console.log(err)
    return json({ status: 'FAILED', message: 'Something went wrong' })
  }
}
