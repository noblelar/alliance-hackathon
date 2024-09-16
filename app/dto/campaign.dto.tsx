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

export const donateDTO = z
  .object({
    fullname: z.string().min(1, 'Fullname is required'),
    email: z.string().email('Invalid email address'),
    amount: z.number().min(1).nonnegative('Amount must be non-negative'),
    companyId: z.number().nonnegative().optional(), // companyId is optional, conditionally required
    isGiftAided: z.boolean().default(false),
    isMyOwnMoney: z.boolean().default(false), // Required conditionally
    isCompanyMoney: z.boolean().default(false), // Required conditionally
    address: z.string().optional().default(''), // Required conditionally
    donorType: z.enum(['individual', 'company']),
  })
  .refine((data) => !data.isGiftAided || !!data.address, {
    message: 'Address is required when Gift Aid is enabled',
    path: ['address'], // Set the path for the error
  })
  .refine(
    (data) => data.donorType !== 'company' || data.companyId !== undefined,
    {
      message: 'Company ID is required when donor type is company',
      path: ['companyId'], // Set the path for the error
    }
  )
  .refine((data) => data.donorType !== 'company' || data.isCompanyMoney, {
    message: 'isCompanyMoney must be true when donor type is company',
    path: ['isCompanyMoney'], // Set the path for the error
  })
  .refine((data) => data.donorType !== 'individual' || data.isMyOwnMoney, {
    message: 'isMyOwnMoney is required when donor type is individual',
    path: ['isMyOwnMoney'], // Set the path for the error
  })
