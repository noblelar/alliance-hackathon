import otpGenerator from 'otp-generator'

export default function otp(
  length: number,
  options: {
    upperCaseAlphabets?: boolean
    specialChars?: boolean
    lowerCaseAlphabets?: boolean
    digits?: boolean
  }
) {
  return otpGenerator.generate(length, options)
}
