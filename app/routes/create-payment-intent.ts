import { ActionFunctionArgs } from '@remix-run/node'
import { json } from 'react-router'
import { createPaymentOrder } from '~/server/paypal.server'

interface IBody {
  fullname: string
  email: string
  amount: number
  companyId: number // Convert to number if exists
  isGiftAided: boolean
  isMyOwnMoney: boolean
  isCompanyMoney: boolean
  address?: string
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = (await request.json()) as IBody

  const order = await createPaymentOrder(body.amount)

  return json(order)
}
