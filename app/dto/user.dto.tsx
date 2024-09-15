import { z } from 'zod'

export const UserDTO = z.object({
  email: z.string().email('Provide a valid email address'),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
})
