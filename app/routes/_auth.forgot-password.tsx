import { Form, Link } from '@remix-run/react'
import { useState } from 'react'
import Input from '~/components/shared/Input'
import SubmitButton from '~/components/shared/SubmitButton'
import { getFormError } from '~/lib/getFormError'

export default function ForgotPassword() {
  const [success, setSuccess] = useState(false)
  return (
    <div className="lg:mx-auto lg:max-w-[400px]">
      <h1 className="text-agreen mt-[110px] text-center text-xl font-bold lg:mt-[83px] lg:text-2xl">
        {success ? 'Reset link sent' : 'Forgot your password?'}
      </h1>
      <h4 className="text-ablack mt-[10px] px-4 text-center text-sm lg:mt-[20px] lg:px-10 lg:text-base">
        {success
          ? 'The reset link has been sent to your email. Click the link to reset your password'
          : 'Enter your account email and we’ll send you a reset link'}
      </h4>

      {success ? (
        <button className="bg-agreen mt-[40px] w-full rounded-full py-[17px] font-bold text-white disabled:opacity-90">
          Return to Login
        </button>
      ) : (
        <>
          <Form className="mt-[30px] flex flex-col gap-5">
            <Input
              label="Email"
              type="text"
              name={'email'}
              error={getFormError('email', [])}
            />
            <div className="mt-[30px] flex justify-end lg:mt-8">
              <SubmitButton
                className="bg-agreen w-full rounded-full py-[17px] font-bold text-white disabled:opacity-90"
                label="Send Link"
              />
            </div>
          </Form>
          <p className="text-ablack mt-[20px] block text-center font-bold">
            <Link to={'/login'}>Return to Login</Link>
          </p>
        </>
      )}
    </div>
  )
}
