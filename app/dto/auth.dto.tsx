import { z } from 'zod'

const SignupDTO = z
  .object({
    email: z.string().email('Provide a valid email address'),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
        'Provide a strong password'
      ),
    confirm_password: z.string(),
    full_name: z.string().min(3, { message: 'Full name is required' }),
    phone_number: z
      .string()
      .regex(/^\+?[1-9]\d{8,14}$/, { message: 'Phone number is required' }),
    dob: z.string().date('Select a valid date of birth'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

const LoginDTO = z.object({
  email: z.string().email('Provide a valid email address'),
  password: z.string().min(1, 'Provide a password'),
})

const ForgotPasswordDTO = z.object({
  email: z.string().email('Provide a valid email'),
})

export const ResetPasswordDTO = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
        'Provide a strong password'
      ),
    confirm_password: z.string(),
    user: z.number(),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

export const BioDataDTO = z.object({
  avatar: z.string(),
  height: z.number({ message: 'Provide a height' }),
  height_metric: z.string(),
  weight: z.number({ message: 'Provide a weight' }),
  weight_metric: z.string(),
})

export const HealthDetailDTO = z.object({
  allergies: z.array(z.number()),
  health_conditions: z.array(z.number()),
  remove_allergies: z.array(z.number()),
  remove_health_conditions: z.array(z.number()),
})

export const LocationDTO = z.object({
  city: z.string().optional(),
  country: z.string().min(1, { message: 'Country is required' }),
  name: z.string().min(5, { message: 'Emergency contact name is required' }),
  phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{8,14}$/, { message: 'Phone number is required' }),
  region: z.string().min(1, { message: 'Region is required' }),
  street: z.string().optional(),
})

type SignupDTOType = z.infer<typeof SignupDTO>
type LoginDTOType = z.infer<typeof LoginDTO>
type ForgotPasswordDTOType = z.infer<typeof ForgotPasswordDTO>
type BioDataDTOType = z.infer<typeof BioDataDTO>
type HealthDetailDTOType = z.infer<typeof HealthDetailDTO>
type LocationDTOType = z.infer<typeof LocationDTO>

export { ForgotPasswordDTO, LoginDTO, SignupDTO }
export type {
  BioDataDTOType,
  ForgotPasswordDTOType,
  HealthDetailDTOType,
  LocationDTOType,
  LoginDTOType,
  SignupDTOType,
}
