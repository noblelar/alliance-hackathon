import { Form, Link } from '@remix-run/react'
import { useState } from 'react'
import { Close, Mark } from '~/components/shared/icons'
import Input from '~/components/shared/Input'
import SubmitButton from '~/components/shared/SubmitButton'
import { Progress } from '~/components/ui/progress'
import { getFormError } from '~/lib/getFormError'

export const PasswordChecks = [
  {
    key: 'length',
    message: 'At least 8 characters',
  },
  {
    key: 'lower',
    message: 'Lowercase letters',
  },
  {
    key: 'upper',
    message: 'Uppercase letters',
  },
  {
    key: 'number',
    message: 'Numbers',
  },
  {
    key: 'special',
    message: 'Special characters',
  },
]

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [percentPassword, setPercentPassword] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ])

  function checkPasswordRequirements(requirement: string) {
    let answer: boolean

    switch (requirement) {
      case 'length':
        answer = password.length >= 8
        // updatePasswordReq(0, answer)
        return answer
      case 'lower':
        answer = /[a-z]/.test(password)
        // setPercentPassword((curr) => {
        //   //   const val = [...curr]
        //   //   val[0] = answer
        //   return curr
        // })
        return answer
      case 'upper':
        answer = /[A-Z]/.test(password)
        // updatePasswordReq(2, answer)
        return answer
      case 'number':
        answer = /\d/.test(password)
        // updatePasswordReq(3, answer)
        return answer
      case 'special':
        answer = /[!@#\$%\^&\*]/.test(password)
        // updatePasswordReq(4, answer)
        return answer
      default:
        return false
    }
  }

  function updatePasswordReq(idx: number, res: boolean) {
    console.log(res)
    setPercentPassword((curr) => {
      const val = [...curr]
      val[idx] = res
      return val
    })
  }

  function calPercentage() {
    return percentPassword.reduce(
      (prev, curr) => (curr ? prev + 20 : prev + 0),
      0
    )
  }

  return (
    <div className="lg:mx-auto lg:max-w-[400px]">
      <h1 className="text-agreen mt-[110px] text-center text-xl font-bold lg:mt-[83px] lg:text-2xl">
        Create new password
      </h1>
      <h4 className="text-ablack mt-[10px] text-center text-sm lg:mt-[20px] lg:text-base">
        Create a new password for your account
      </h4>

      <Form className="mt-[30px] flex flex-col gap-5">
        <Input
          label="Password"
          type="password"
          name={'password'}
          error={getFormError('password', [])}
          callback={setPassword}
        />
        <div className="">
          <div className="mb-4 flex items-center gap-1">
            <p className="text-sm text-gray-500">Strenght:</p>
            <Progress
              className="h-[11px] bg-[#e7eaee]"
              //   value={calPercentage()}
            />
          </div>
          <p className="font-montserrat text-xs font-medium text-[#191919]">
            Your password must include:
          </p>
          <div className="mt-2 grid w-[400px] grid-cols-2 gap-3">
            {PasswordChecks.map((check) => (
              <div key={check.key} className="flex items-center gap-1">
                {checkPasswordRequirements(check.key) ? (
                  <Mark />
                ) : (
                  <Close color="#DC2626" />
                )}
                <p className="text-xs text-[#667085]">{check.message}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Input
            label="Confirm New Password"
            type="password"
            name={'confirm-password'}
            error={getFormError('confirm-password', [])}
          />

          <div className="mt-[30px] flex justify-end lg:mt-8">
            <SubmitButton
              className="bg-agreen w-full rounded-full py-[17px] font-bold text-white disabled:opacity-90"
              label="Reset Password"
            />
          </div>
        </div>
      </Form>
      <p className="text-ablack mt-[20px] block text-center font-bold">
        <Link to={'/login'}>Return to Login</Link>
      </p>
    </div>
  )
}
