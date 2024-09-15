import { ActionFunctionArgs, json } from '@remix-run/node'
import { Form, Link, MetaFunction, useActionData } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import SuccessCompanyCreate from '~/components/dialogs/SuccessCompanyCreate'
import { LogoLg } from '~/components/shared/icons'
import SubmitButton from '~/components/shared/SubmitButton'
import { Label } from '~/components/ui/label'
import { DonorCompanyDTO } from '~/dto/company.dto'
import { formatZodErrors, IError } from '~/lib/formatZodError'
import { getFormError } from '~/lib/getFormError'
import { createDonor } from '~/server/donorCompany.server'

export const meta: MetaFunction = () => [
  {
    title: 'Big Alliance | Become a force with us.',
  },
  {
    name: 'description',
    content:
      'We make community investment easier, more effective  and more rewarding for our business partners.',
  },
]

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const companyName = formData.get('companyName') ?? ''
  const companyAddress = formData.get('companyAddress') ?? ''
  const contactPersonEmail = formData.get('contactPersonEmail') ?? ''
  const contactPersonName = formData.get('contactPersonName') ?? ''

  try {
    const result = DonorCompanyDTO.parse({
      companyName,
      companyAddress,
      contactPersonEmail,
      contactPersonName,
    })

    const response = await createDonor(result)

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

export default function BecomeADonorCompany() {
  const actionData = useActionData<typeof action>()
  const [showSuccess, setShowSuccess] = useState(false)

  const form = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    if (actionData) {
      if (actionData?.success) {
        form.current?.reset()
        toast.success(actionData.response, {
          richColors: true,
        })
        setShowSuccess(true)
      } else {
        toast.error(actionData.response, {
          richColors: true,
        })
      }
    }
  }, [actionData])

  return (
    <div className="grid h-screen grid-cols-[617px,auto]">
      {showSuccess && <SuccessCompanyCreate />}
      <div className="relative col-start-1 col-end-2 bg-primary">
        <img
          className="absolute left-0 top-0 h-full w-full object-cover"
          src="https://s3-alpha-sig.figma.com/img/4793/ad44/6d333ffae7562ffea8f7c0439316e12e?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mrcX68rJtxqv6E8K4oF~LO4VjINReKRruBG8DRwlo1TMGQe4ZymAHyfM6X5W0pDGg4B-5Lzc6qCjYMzTLlS58un6LkyF86Y-NyB6KVh72qiqc~w0VLxdsZxcWz1~JWqLyy3750XgcKysVkkxbDrQo~ivHXpECjKH1btONM7XAyuFMz2nJqRjmDYjmvH-5qRMyQWck8mz3SNO-OqHnF1eh7Hozpq-yzr07XfvyM6xN14CVQeBfEAfnEftWddwlvxqpBZ2zbLxXtl928nt7965pZgDQ2RA~MaB4i2oQqNshr541zXw2e7ockX0X5sdGcasSANlWdg3gOirnH5OZkyn1A__"
        />
        <div className="absolute h-full w-full bg-black bg-opacity-20" />
        <div className="relative flex h-full flex-col justify-between p-[50px] pb-[100px]">
          <LogoLg className="h-[38px] w-[200px]" />
          <h3 className="text-[36px] font-bold text-white">
            Create positive social change, one donation at a time
          </h3>
        </div>
      </div>
      <div className="flex items-center justify-center py-10">
        <div>
          <h2 className="text-center text-2xl font-bold text-primary">
            Become A Donor Company
          </h2>
          <p className="mt-5 text-center text-base">
            Register and get verified
          </p>

          <Form
            ref={form}
            method="POST"
            className="mt-[60px] flex w-[400px] flex-col gap-[15px]"
          >
            <div className="flex-1">
              <Label htmlFor="name" className="text-right text-base">
                Company Name
              </Label>
              <input
                name="companyName"
                className="rou mt-3 block w-full rounded-[10px] border px-4 py-3 outline-none"
              />
              {getFormError('companyName', actionData?.errors) && (
                <p className="text-xs text-red-500">
                  {getFormError('companyName', actionData?.errors)}
                </p>
              )}
            </div>
            <div className="flex-1">
              <Label htmlFor="name" className="text-right text-base">
                Company Address
              </Label>
              <input
                name="companyAddress"
                className="rou mt-3 block w-full rounded-[10px] border px-4 py-3 outline-none"
              />
              {getFormError('companyAddress', actionData?.errors) && (
                <p className="text-xs text-red-500">
                  {getFormError('companyAddress', actionData?.errors)}
                </p>
              )}
            </div>
            <div className="flex-1">
              <Label htmlFor="name" className="text-right text-base">
                Contact Person Name
              </Label>
              <input
                name="contactPersonName"
                className="rou mt-3 block w-full rounded-[10px] border px-4 py-3 outline-none"
              />
              {getFormError('contactPersonName', actionData?.errors) && (
                <p className="text-xs text-red-500">
                  {getFormError('contactPersonName', actionData?.errors)}
                </p>
              )}
            </div>
            <div className="flex-1">
              <Label htmlFor="name" className="text-right text-base">
                Contact Person Email
              </Label>
              <input
                name="contactPersonEmail"
                className="rou mt-3 block w-full rounded-[10px] border px-4 py-3 outline-none"
              />
              {getFormError('contactPersonEmail', actionData?.errors) && (
                <p className="text-xs text-red-500">
                  {getFormError('contactPersonEmail', actionData?.errors)}
                </p>
              )}
            </div>

            <div className="mt-[40px] flex justify-between">
              <Link to={'/'}>
                <button
                  type="button"
                  className="rounded-full border-2 border-primary px-[54px] py-2 font-bold text-primary"
                >
                  Back
                </button>
              </Link>
              <SubmitButton
                label="Register"
                className="hidden rounded-full border border-primary bg-primary px-[54px] py-2 font-bold text-white lg:block"
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
