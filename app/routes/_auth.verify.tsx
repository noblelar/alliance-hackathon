import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node'
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
} from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { InputOTP, InputOTPSlot } from '~/components/ui/input-otp'
import { verifyCode } from '~/server/auth.server'
import { commitSession, getSession } from '~/sessions'
import { action as VerifyCode } from './auth.resend-verify-code'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const firstName = session.get('firstName')
  const email = session.get('email')

  if (!email || email == '') {
    return redirect('/login')
  }

  return json({
    firstName,
    email,
  })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const otp = formData.get('otp') as string
  const session = await getSession(request.headers.get('Cookie'))
  const email = session.get('email') as string

  let redirectUrl = '/admin'

  try {
    const response = await verifyCode(otp, email)

    if (response.status) {
      session.set('id', response.code?.admin.id!)
      session.set('email', response.code?.admin.email!)
      session.set('firstName', response.code?.admin.firstName!)
      session.set('isLoggedIn', true)

      session.flash('toast', 'Successfully logged in')

      return redirect(redirectUrl, {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      })
    } else {
      return json({
        message: response.message,
      })
    }
  } catch (error: any) {
    return json({
      message: error.message || 'An unexpected error occurred',
    })
  }
}

export default function Verify() {
  const fetcher = useFetcher<typeof VerifyCode>()
  const { email } = useLoaderData<typeof loader>()

  const [value, setValue] = useState('')
  const ref = useRef<HTMLButtonElement | null>(null)

  const actionData = useActionData<typeof action>()

  useEffect(() => {
    if (fetcher.data) {
      toast.success(fetcher.data.message)
    }
  }, [fetcher.data])

  useEffect(() => {
    if (value.length == 6) {
      ref.current?.click()
    }
  }, [value])

  useEffect(() => {
    if (actionData?.message) {
      toast.error(actionData.message)
    }
  }, [actionData])
  return (
    <div className="lg:mx-auto lg:max-w-[400px]">
      <h1 className="mt-[110px] text-center text-xl font-bold text-agreen lg:mt-[83px] lg:text-2xl">
        We sent you a code
      </h1>
      <h4 className="mt-[10px] text-center text-sm text-ablack lg:mt-[20px] lg:text-base">
        Enter the 6-digit verification code sent to <br />
        <strong>{email}</strong>
      </h4>

      <Form method="POST" className="mt-[30px] flex flex-col gap-5">
        <InputOTP
          onChange={(value) => setValue(value)}
          name="otp"
          maxLength={6}
          className="mx-auto justify-center"
        >
          <InputOTPSlot
            className="h-[45px] w-[45px] !rounded-[10px] border lg:h-[50px] lg:w-[50px]"
            index={0}
          />
          <InputOTPSlot
            className="h-[45px] w-[45px] rounded-[10px] border lg:h-[50px] lg:w-[50px]"
            index={1}
          />
          <InputOTPSlot
            className="h-[45px] w-[45px] rounded-[10px] border lg:h-[50px] lg:w-[50px]"
            index={2}
          />
          <InputOTPSlot
            className="h-[45px] w-[45px] !rounded-[10px] border lg:h-[50px] lg:w-[50px]"
            index={3}
          />
          <InputOTPSlot
            className="h-[45px] w-[45px] rounded-[10px] border lg:h-[50px] lg:w-[50px]"
            index={4}
          />
          <InputOTPSlot
            className="h-[45px] w-[45px] !rounded-[10px] border lg:h-[50px] lg:w-[50px]"
            index={5}
          />
        </InputOTP>
        <button ref={ref} className="hidden">
          Submit
        </button>
      </Form>

      <p className="my-[20px] text-center text-xs">
        Didn’t get your code?{' '}
        <fetcher.Form
          className="inline"
          method="POST"
          action="/auth/resend-verify-code"
        >
          <button className="font-bold">Send a new code</button>
        </fetcher.Form>
      </p>
    </div>
  )
}
