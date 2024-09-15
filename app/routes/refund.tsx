import { ActionFunctionArgs, json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import RefundReceivedModal from '~/components/dialogs/RefundReceived'
import ImageBox from '~/components/ui/imagebox'
import { Label } from '~/components/ui/label'
import NavBar from '~/components/ui/NavBar'
import { DonorRefundRequestDTO } from '~/dto/company.dto'
import { formatZodErrors, IError } from '~/lib/formatZodError'
import { getFormError } from '~/lib/getFormError'
import { createRefund } from '~/server/refund.server'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const donorId = formData.get('donorId') ?? ''
  const email = formData.get('email') ?? ''

  try {
    const result = DonorRefundRequestDTO.parse({
      email,
      donorId,
    })

    const response = await createRefund(result)

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

    return {
      errors: [] as IError[],
      response: error.message || 'Unexpected Errors',
      success: false,
    }
  }
}

export default function Home() {
  const [open, setOpen] = useState(false)
  const actionData = useActionData<typeof action>()

  const form = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    if (actionData) {
      if (actionData?.success) {
        form.current?.reset()
        toast.success(actionData.response, {
          richColors: true,
        })
        setOpen(true)
      } else {
        toast.error(actionData.response, {
          richColors: true,
        })
      }
    }
  }, [actionData])

  return (
    <>
      <NavBar />

      <div className="m-auto max-h-screen">
        <div className="mx-auto mt-5 flex w-full max-w-[1440px] items-center justify-center py-[7rem]">
          <div className="h-[784px] w-[517px]">
            <ImageBox />
          </div>
          <div className="flex w-[50%] items-center justify-center">
            <div>
              <h2 className="text-center text-2xl font-bold text-primary">
                Request Donation Refund
              </h2>
              <p className="mx-auto mt-5 w-[70%] text-center text-base">
                Enter your donation ID and the email you used when making the
                donation
              </p>

              <Form
                ref={form}
                method="POST"
                className="mt-[60px] flex w-full flex-col items-center justify-center gap-[15px]"
              >
                <div className="w-[70%] flex-1">
                  <Label htmlFor="name" className="text-right text-base">
                    Donation ID
                  </Label>
                  <input
                    className="rou mt-3 block w-full rounded-[10px] border px-4 py-3 outline-none"
                    placeholder="D123445665"
                    name="donorId"
                  />
                  <p className="text-xs text-red-500">
                    {getFormError('donorId', actionData?.errors)}
                  </p>
                </div>

                <div className="w-[70%] flex-1">
                  <Label htmlFor="name" className="text-right text-base">
                    Email
                  </Label>
                  <input
                    className="rou mt-3 block w-full rounded-[10px] border px-4 py-3 outline-none"
                    placeholder="someone@email.com"
                    name="email"
                  />
                  <p className="text-xs text-red-500">
                    {getFormError('email', actionData?.errors)}
                  </p>
                </div>

                <div className="mt-[40px] flex w-[70%] justify-center">
                  <button className="hidden w-full rounded-full border border-primary bg-primary px-[54px] py-2 font-bold text-white lg:block">
                    Request Refund
                  </button>
                </div>
              </Form>
              <RefundReceivedModal open={open} setOpen={setOpen} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
