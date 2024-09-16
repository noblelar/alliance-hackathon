import bcrypt from 'bcrypt'
import { db } from '~/server/db.server'

export const loader = async () => {
  const saltRounds = 10
  const hash = await bcrypt.hash('Nobleman1.', saltRounds)

  const user = await db.admin.create({
    data: {
      firstName: 'Noble',
      lastName: 'Ackor',
      email: 'nobleackor@gmail.com',
      password: hash,
    },
  })
  return { user }
}
