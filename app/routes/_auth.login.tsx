import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Google } from '~/components/shared/icons'
import Input from '~/components/shared/Input'
import SubmitButton from '~/components/shared/SubmitButton'
import { LoginDTO } from '~/dto/auth.dto'
import { formatZodErrors, IError } from '~/lib/formatZodError'
import { getFormError } from '~/lib/getFormError'
import { login } from '~/server/auth.server'
import { commitSession, getSession } from '~/sessions'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const email = formData.get('email') ?? ''
  const password = formData.get('password') ?? ''
  const session = await getSession(request.headers.get('Cookie'))

  let redirectUrl = '/verify'

  try {
    const result = LoginDTO.parse({ email, password })

    const response = await login(result)

    if (response.status && response.user) {
      session.set('id', response.user.id)
      session.set('email', response.user.email)
      session.set('firstName', response.user.firstName)

      session.flash('toast', 'Successfully logged in')

      return redirect(redirectUrl, {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      })
    } else {
      return json({
        errors: [] as IError[],
        response: 'Incorrect credentials',
      })
    }
  } catch (error: any) {
    if (error.errors?.length) {
      return json({
        errors: formatZodErrors(error.errors),
        response: 'Validation Errors',
      })
    }
  }
}

export default function Login() {
  const loaderData = useActionData<typeof action>()

  useEffect(() => {
    if (loaderData?.response) {
      toast.error(loaderData?.response)
    }
  }, [loaderData])

  return (
    <div className="lg:mx-auto lg:max-w-[400px]">
      <h1 className="mt-[110px] text-center text-xl font-bold text-agreen lg:mt-[83px] lg:text-2xl">
        Welcome to Alliance Donate
      </h1>
      <h4 className="mt-[10px] text-center text-sm text-ablack lg:mt-[20px] lg:text-base">
        Login to your account
      </h4>

      <Form method="POST" className="mt-[30px] flex flex-col gap-5">
        <Input
          label="Email"
          type="text"
          name={'email'}
          error={getFormError('email', loaderData?.errors)}
        />
        <div>
          <Input
            label="Password"
            type="password"
            name={'password'}
            error={getFormError('password', loaderData?.errors)}
          />
          <Link
            to={'/forgot-password'}
            className="font-montserrat mt-2 text-xs font-medium text-[#0085FF]"
          >
            I’ve forgotten my password
          </Link>
          <div className="mt-[30px] flex justify-end lg:mt-8">
            <SubmitButton
              className="w-full rounded-full bg-agreen py-[17px] font-bold text-white disabled:opacity-90"
              label="Log in"
            />
          </div>
        </div>
      </Form>

      <p className="my-[30px] text-center text-sm font-bold">OR</p>
      <button className="flex w-full items-center justify-center gap-3 rounded-full border border-[#979797] py-[17px]">
        <Google className="h-[16px] w-[16px]" />
        <p className="text-sm text-[#333] lg:text-base">Continue with Google</p>
      </button>
    </div>
  )
}
