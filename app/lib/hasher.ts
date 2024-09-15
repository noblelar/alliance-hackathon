import bcrypt from 'bcrypt'

export async function hashPassword(password: string) {
  const saltRounds = 10
  const hash = await bcrypt.hash(password, saltRounds)
  return hash
}
