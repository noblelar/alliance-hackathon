import { z } from 'zod'

const PaymentMethodEnum = z.enum([
  'CARD',
  'PAYPAL',
  'APPLEPAY',
  'GOOGLEPAY',
  'BANKACCOUNT',
])
const CampaignStatusEnum = z.enum(['DRAFT', 'PUBLISHED', 'ENDED'])

const base64Regex =
  /^data:image\/(png|jpeg|jpg|gif|svg\+xml);base64,[A-Za-z0-9+/=]+$/

const campaignBaseSchema = z.object({
  image: z.string().optional(),
  title: z.string(),
  targetAmount: z.number().nonnegative().default(0),
  status: CampaignStatusEnum.default('DRAFT'),
  message: z.string().optional(),
  acceptPaymentMethods: z.array(PaymentMethodEnum).optional(),
})

export const campaignDTO = campaignBaseSchema
  .refine((data) => !!data.title, {
    message: 'Title is required',
    path: ['title'],
  })
  .refine(
    (data) => {
      if (data.status === 'PUBLISHED') {
        return !!data.image && base64Regex.test(data.image)
      }
      return true
    },
    {
      message: 'For PUBLISHED campaigns, image must be a valid Base64 string.',
      path: ['image'],
    }
  )
  .refine(
    (data) => {
      if (data.status === 'PUBLISHED') {
        return data.targetAmount > 0
      }
      return true
    },
    {
      message: 'For PUBLISHED campaigns, targetAmount must be greater than 0.',
      path: ['targetAmount'],
    }
  )
  .refine(
    (data) => {
      if (data.status === 'PUBLISHED') {
        return !!data.message
      }
      return true
    },
    {
      message: 'For PUBLISHED campaigns, message is required.',
      path: ['message'],
    }
  )
  .refine(
    (data) => {
      if (data.status === 'PUBLISHED') {
        return data.acceptPaymentMethods && data.acceptPaymentMethods.length > 0
      }
      return true
    },
    {
      message:
        'For PUBLISHED campaigns, at least one payment method is required.',
      path: ['acceptPaymentMethods'],
    }
  )
