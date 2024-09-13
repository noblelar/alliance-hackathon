import { Form, Link } from '@remix-run/react'
import { Google } from '~/components/shared/icons'
import Input from '~/components/shared/Input'
import SubmitButton from '~/components/shared/SubmitButton'
import { getFormError } from '~/lib/getFormError'

export default function Login() {
  return (
    <div className="lg:mx-auto lg:max-w-[400px]">
      <h1 className="text-agreen mt-[110px] text-center text-xl font-bold lg:mt-[83px] lg:text-2xl">
        Welcome to Alliance Donate
      </h1>
      <h4 className="text-ablack mt-[10px] text-center text-sm lg:mt-[20px] lg:text-base">
        Login to your account
      </h4>

      <Form className="mt-[30px] flex flex-col gap-5">
        <Input
          label="Email"
          type="text"
          name={'email'}
          error={getFormError('email', [])}
        />
        <div>
          <Input
            label="Password"
            type="password"
            name={'password'}
            error={getFormError('password', [])}
          />
          <Link
            to={'/forgot-password'}
            className="font-montserrat mt-2 text-xs font-medium text-[#0085FF]"
          >
            I’ve forgotten my password
          </Link>
          <div className="mt-[30px] flex justify-end lg:mt-8">
            <SubmitButton
              className="bg-agreen w-full rounded-full py-[17px] font-bold text-white disabled:opacity-90"
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
