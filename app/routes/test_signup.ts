import bcrypt from 'bcrypt'
import { db } from '~/server/db.server'

export const loader = async () => {
  const saltRounds = 10
  const hash = await bcrypt.hash('Oliver054.', saltRounds)

  const user = await db.admin.create({
    data: {
      firstName: 'Oliver',
      lastName: 'Otchere',
      email: 'oliverotchere3@gmail.com',
      password: hash,
    },
  })
  return { user }
}
