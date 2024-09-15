import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import {
  Form,
  json,
  Link,
  redirect,
  useActionData,
  useNavigate,
} from '@remix-run/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Close, Mark } from '~/components/shared/icons'
import Input from '~/components/shared/Input'
import SubmitButton from '~/components/shared/SubmitButton'
import { Progress } from '~/components/ui/progress'
import { ResetPasswordDTO } from '~/dto/auth.dto'
import { formatZodErrors, IError } from '~/lib/formatZodError'
import { getFormError } from '~/lib/getFormError'
import { preventLoggedInUser } from '~/lib/preventLoggedInUser'
import { resetPassword } from '~/server/auth.server'

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
export async function loader({ request }: LoaderFunctionArgs) {
  if (await preventLoggedInUser(request)) {
    return redirect('/')
  }

  return json({})
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const password = formData.get('password') ?? ''
  const confirm_password = formData.get('confirm_password') ?? ''

  try {
    const result = ResetPasswordDTO.parse({
      confirm_password,
      password,
      user: parseInt(params?.uid as string),
      token: params?.token,
    })

    const response = await resetPassword(
      result.user,
      result.password,
      result.token
    )

    return json({
      errors: [] as IError[],
      response: response.message,
      success: response.status,
    })
  } catch (error: any) {
    if (error.errors?.length) {
      return json({
        errors: formatZodErrors(error.errors),
        response: 'Validation Errors',
        success: false,
      })
    }
  }
}

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

  const actionData = useActionData<typeof action>()
  const router = useNavigate()

  useEffect(() => {
    if (actionData?.success) {
      toast.success(actionData.response)
      router('/login')
    } else if (actionData) {
      toast.error(actionData.response)
    }
  }, [actionData])

  return (
    <div className="lg:mx-auto lg:max-w-[400px]">
      <h1 className="mt-[110px] text-center text-xl font-bold text-agreen lg:mt-[83px] lg:text-2xl">
        Create new password
      </h1>
      <h4 className="mt-[10px] text-center text-sm text-ablack lg:mt-[20px] lg:text-base">
        Create a new password for your account
      </h4>

      <Form method="POST" className="mt-[30px] flex flex-col gap-5">
        <Input
          label="Password"
          type="password"
          name={'password'}
          error={getFormError('password', actionData?.errors)}
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
            name={'confirm_password'}
            error={getFormError('confirm_password', actionData?.errors)}
          />

          <div className="mt-[30px] flex justify-end lg:mt-8">
            <SubmitButton
              className="w-full rounded-full bg-agreen py-[17px] font-bold text-white disabled:opacity-90"
              label="Reset Password"
            />
          </div>
        </div>
      </Form>
      <p className="mt-[20px] block text-center font-bold text-ablack">
        <Link to={'/login'}>Return to Login</Link>
      </p>
    </div>
  )
}
