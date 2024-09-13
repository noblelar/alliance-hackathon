import { Form } from '@remix-run/react'
import { InputOTP, InputOTPSlot } from '~/components/ui/input-otp'

export default function Verify() {
  return (
    <div className="lg:mx-auto lg:max-w-[400px]">
      <h1 className="text-agreen mt-[110px] text-center text-xl font-bold lg:mt-[83px] lg:text-2xl">
        We sent you a code
      </h1>
      <h4 className="text-ablack mt-[10px] text-center text-sm lg:mt-[20px] lg:text-base">
        Enter the 6-digit verification code sent to <br />
        <strong>nessa.aidoo@gmail.com</strong>
      </h4>

      <Form className="mt-[30px] flex flex-col gap-5">
        <InputOTP maxLength={6} className="mx-auto justify-center">
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
      </Form>

      <p className="my-[20px] text-center text-xs">
        Didn’t get your code?{' '}
        <button className="font-bold">Send a new code</button>
      </p>
    </div>
  )
}
