import { z } from 'zod'

export const DonorCompanyDTO = z.object({
  contactPersonEmail: z.string().email('Provide a valid email address'),
  contactPersonName: z.string().min(1, 'Provide a name'),
  companyName: z.string().min(1, 'Provide a name'),
  companyAddress: z.string().min(1, 'Provide a name'),
})

export const RejectionDTO = z.object({
  reason: z.string().min(1, 'Provide a reason for the rejection'),
})

export const DonorRefundRequestDTO = z.object({
  email: z.string().email('Provide a valid email address'),
  donorId: z.string().min(1, 'Provide a donor id'),
})
