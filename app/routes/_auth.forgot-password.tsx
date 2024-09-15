import { ActionFunctionArgs, json } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import Input from '~/components/shared/Input'
import SubmitButton from '~/components/shared/SubmitButton'
import { ForgotPasswordDTO } from '~/dto/auth.dto'
import { formatZodErrors, IError } from '~/lib/formatZodError'
import { getFormError } from '~/lib/getFormError'
import { requestForgotPassword } from '~/server/auth.server'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const email = formData.get('email') ?? ''

  try {
    const result = ForgotPasswordDTO.parse({ email })

    await requestForgotPassword(result.email)

    return json({
      errors: [] as IError[],
      response: 'Successfully send a reset link to your email',
      status: true,
    })
  } catch (error: any) {
    if (error.errors?.length) {
      return json({
        errors: formatZodErrors(error.errors),
        response: 'Validation Errors',
        status: false,
      })
    }
  }
}

export default function ForgotPassword() {
  const [success, setSuccess] = useState(false)

  const actionData = useActionData<typeof action>()

  useEffect(() => {
    if (actionData) {
      setSuccess(actionData.status)
    }
  }, [actionData])

  return (
    <div className="lg:mx-auto lg:max-w-[400px]">
      <h1 className="mt-[110px] text-center text-xl font-bold text-agreen lg:mt-[83px] lg:text-2xl">
        {success ? 'Reset link sent' : 'Forgot your password?'}
      </h1>
      <h4 className="mt-[10px] px-4 text-center text-sm text-ablack lg:mt-[20px] lg:px-10 lg:text-base">
        {success
          ? 'The reset link has been sent to your email. Click the link to reset your password'
          : 'Enter your account email and we’ll send you a reset link'}
      </h4>

      {success ? (
        <Link to={'/login'}>
          <button className="mt-[40px] w-full rounded-full bg-agreen py-[17px] font-bold text-white disabled:opacity-90">
            Return to Login
          </button>
        </Link>
      ) : (
        <>
          <Form method="POST" className="mt-[30px] flex flex-col gap-5">
            <Input
              label="Email"
              type="text"
              name={'email'}
              error={getFormError('email', actionData?.errors)}
            />
            <div className="mt-[30px] flex justify-end lg:mt-8">
              <SubmitButton
                className="w-full rounded-full bg-agreen py-[17px] font-bold text-white disabled:opacity-90"
                label="Send Link"
              />
            </div>
          </Form>
          <Link to={'/login'}>
            <p className="mt-[20px] block text-center font-bold text-ablack">
              Return to Login
            </p>
          </Link>
        </>
      )}
    </div>
  )
}
