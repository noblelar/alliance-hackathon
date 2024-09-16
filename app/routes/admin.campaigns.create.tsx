import { ActionFunctionArgs, json } from '@remix-run/node'
import {
  Form,
  Link,
  MetaFunction,
  useActionData,
  useNavigate,
} from '@remix-run/react'
import { ChevronDown, ChevronLeftCircle, Landmark } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import EditorArea from '~/components/campaigns/EditorArea'
import PaymentOption from '~/components/campaigns/PaymentOption'
import DraftCampaignConfirm from '~/components/dialogs/DraftCampaign'
import {
  ApplePay,
  Card,
  Google,
  Paypal,
  Upload,
} from '~/components/shared/icons'
import Input from '~/components/shared/Input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { campaignDTO } from '~/dto/campaign.dto'
import { formatZodErrors, IError } from '~/lib/formatZodError'
import { getFormError } from '~/lib/getFormError'
import { createCampaign } from '~/server/campaign'

export const meta: MetaFunction = () => [
  {
    title:
      'Big Alliance | Create Campaign | Empowering Communities, Elevating Partnerships.',
  },
  {
    name: 'description',
    content:
      'We make community investment easier, more effective  and more rewarding for our business partners.',
  },
]

export const PaymentMethod = [
  {
    name: 'Credit/Debit Card',
    Icon: Card,
    value: 'CARD',
  },
  {
    name: 'Paypal',
    Icon: Paypal,
    value: 'PAYPAL',
  },
  {
    name: 'Apple Pay',
    Icon: ApplePay,
    value: 'APPLEPAY',
  },
  {
    name: 'Google pay',
    Icon: Google,
    value: 'GOOGLEPAY',
  },
  {
    name: 'Bank Account',
    Icon: Landmark,
    value: 'BANKACCOUNT',
  },
]

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const title = formData.get('title') ?? ''
  const image = formData.get('image') ?? ''
  const message = formData.get('message') ?? ''
  const targetAmount = (formData.get('targetAmount') as string) ?? ''
  const status = formData.get('status')
  const acceptPaymentMethods = formData.getAll('acceptPaymentMethods')

  try {
    const result = campaignDTO.parse({
      title,
      image,
      message,
      targetAmount: isNaN(parseFloat(targetAmount))
        ? 0
        : parseFloat(targetAmount),
      status,
      acceptPaymentMethods,
    })

    const response = await createCampaign(result)

    return {
      errors: [] as IError[],
      response: response.message,
      success: response.status,
    }
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
      response: error.message ?? 'An unexpected error occured',
      success: false,
    }
  }
}

export default function CreateCampaign() {
  const [step, setStep] = useState(1)
  const [campaignMessage, setCampaignMessage] = useState('')
  const [campaignImage, setCampaignImage] = useState('')

  const actionData = useActionData<typeof action>()
  const router = useNavigate()

  const draftBtn = useRef<HTMLButtonElement | null>(null)
  const publishBtn = useRef<HTMLButtonElement | null>(null)

  const [openDraft, setOpenDraft] = useState(false)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]

      if (file) {
        const reader = new FileReader()
        reader.onloadend = function () {
          if (reader.result) {
            setCampaignImage(() => reader.result as string)
          }
        }

        reader.readAsDataURL(file)
      }
    }
  }

  useEffect(() => {
    if (actionData) {
      if (actionData?.success) {
        toast.success(actionData.response, {
          richColors: true,
        })
        router('/admin/campaigns')
      } else {
        toast.error(actionData.response, {
          richColors: true,
        })

        if (
          [
            getFormError('title', actionData.errors),
            getFormError('image', actionData.errors),
            getFormError('message', actionData.errors),
          ].some((error) => error !== undefined && error !== '')
        ) {
          setStep(1)
          setOpenDraft(false)
        } else if (
          [
            getFormError('targetAmount', actionData.errors),
            getFormError('acceptPaymentMethods', actionData.errors),
          ].some((error) => error !== undefined && error !== '')
        ) {
          setStep(2)
          setOpenDraft(false)
        }
      }
    }
  }, [actionData])

  return (
    <main className="w-full overflow-y-hidden bg-white p-6 lg:grid lg:h-screen lg:grid-cols-[minmax(34%,483px),minmax(66%,auto)] lg:bg-[#fbf8f6] lg:p-0">
      <div className="lg:flex-shrink-0 lg:bg-[#fbf8f6] lg:pl-16 lg:pt-16">
        <Link to="/admin/campaigns">
          <ChevronLeftCircle className="size-[35px]" />
        </Link>

        <div className="lg:mt-[65px]">
          <h4 className="font-bold lg:text-2xl">Create Campaign</h4>
          <div className="mt-[40px]">
            <div
              onClick={() => setStep(1)}
              className="flex cursor-pointer items-center gap-3"
            >
              <div className="flex size-[30px] items-center justify-center rounded-full border-2 border-abgreen font-semibold text-abgreen">
                1
              </div>
              <h1 className="font-bold text-abgreen">Campaign Details</h1>
            </div>
            <div
              onClick={() => setStep(2)}
              className="mt-[30px] flex cursor-pointer items-center gap-3"
            >
              <div
                className={`flex size-[30px] items-center justify-center rounded-full border ${step > 1 ? 'border-2 border-abgreen font-semibold text-abgreen' : 'border-black'}`}
              >
                2
              </div>
              <h1 className={step > 1 ? `font-bold text-abgreen` : ''}>
                Target Amount
              </h1>
            </div>
            {/* <div className="mt-[30px] flex items-center gap-3">
              <div
                className={`flex size-[30px] items-center justify-center rounded-full border ${step > 2 ? 'border-2 border-abgreen font-semibold text-abgreen' : 'border-black'}`}
              >
                3
              </div>
              <h1 className={step > 2 ? `font-bold text-abgreen` : ''}>
                Review and Publish
              </h1>
            </div> */}
          </div>
        </div>
      </div>

      <Form
        method="POST"
        className="relative lg:h-full lg:flex-shrink-0 lg:overflow-y-scroll lg:bg-white lg:shadow-lg"
      >
        <div
          className={`mx-auto mt-[150px] h-full max-w-[760px] ${step == 1 ? 'block' : 'hidden'}`}
        >
          <h3 className="text-center text-2xl font-bold">Campaign Details</h3>
          <p className="mx-auto mt-[15px] max-w-[284px] text-center">
            Enter the details of the campaign you want to publish
          </p>

          <div className="mx-auto mt-[30px] max-w-[530px]">
            <div>
              <p className="mb-5">
                Campaign Title <span className="text-red-400">*</span>
              </p>
              <Input
                label="Title"
                type="text"
                name={'title'}
                error={getFormError('title', actionData?.errors)}
              />
            </div>

            <div className="mt-10">
              <p className="mb-5">
                Campaign Title <span className="text-red-400">*</span>
              </p>

              {campaignImage?.length != 0 ? (
                <div>
                  <img
                    src={campaignImage}
                    className="h-[250px] w-full rounded-[10px] object-cover"
                  />
                  <button className="text-xs font-bold text-red-500 underline">
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative flex h-[150px] flex-col items-center justify-center gap-5 rounded-[10px] border border-dashed border-agreen">
                    <Upload />
                    <p className="cursor-pointer text-center text-xs font-bold text-agreen">
                      click to upload
                    </p>

                    <input
                      className="absolute top-0 z-0 h-full w-full cursor-pointer opacity-0"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImage}
                    />
                  </div>
                  {getFormError('image', actionData?.errors) && (
                    <p className="text-xs text-red-500">
                      {getFormError('image', actionData?.errors)}
                    </p>
                  )}
                </>
              )}
            </div>

            <input value={campaignImage} name="image" className="hidden" />

            <div className="mt-10">
              <p className="mb-5">
                Campaign Message <span className="text-red-400">*</span>
              </p>
              <input
                name="message"
                className="hidden"
                value={campaignMessage}
              />
              <EditorArea
                initialData={campaignMessage}
                onChange={(v) => setCampaignMessage(v)}
              />
              {getFormError('message', actionData?.errors) && (
                <p className="text-xs text-red-500">
                  {getFormError('message', actionData?.errors)}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between lg:pb-[50px] lg:pt-[117px]">
            <Link to="/admin/campaigns">
              <button
                type="button"
                className="rounded-full border-2 border-gray-500 px-[54px] py-3 font-bold text-gray-500"
              >
                Back
              </button>
            </Link>

            <button
              onClick={() => setStep(2)}
              type="button"
              className="rounded-full border-2 border-abgreen bg-abgreen px-[54px] py-3 font-bold text-white"
            >
              Next
            </button>
          </div>
        </div>

        <div
          className={`mx-auto mt-[150px] h-full max-w-[760px] ${step == 2 ? 'block' : 'hidden'}`}
        >
          <h3 className="text-center text-2xl font-bold">Target Amount</h3>
          <p className="mx-auto mt-[15px] max-w-[284px] text-center">
            Set the amount for the donations to this campaign
          </p>

          <div className="mx-auto mt-[30px] max-w-[530px]">
            <div>
              <p className="mb-5">
                Target Amount <span className="text-red-400">*</span>
              </p>

              <div className="flex overflow-hidden rounded-[10px] border">
                <div className="bg-[#D0D5DD4D] py-4 pl-5 pr-4">
                  <p>GBP</p>
                </div>
                <input
                  type="number"
                  placeholder="0.00"
                  className="flex-1 px-4 outline-none"
                  name="targetAmount"
                />
              </div>
              {getFormError('targetAmount', actionData?.errors) && (
                <p className="text-xs text-red-500">
                  {getFormError('targetAmount', actionData?.errors)}
                </p>
              )}
            </div>

            <div className="mt-10">
              <p className="mb-5">
                Accepted Payment Methods <span className="text-red-400">*</span>
              </p>

              <div className="mt-6 flex flex-col gap-5">
                {PaymentMethod.map(({ name, Icon, value }) => (
                  <PaymentOption value={value} name={name} Icon={Icon} />
                ))}
              </div>
              {getFormError('acceptPaymentMethods', actionData?.errors) && (
                <p className="text-xs text-red-500">
                  {getFormError('acceptPaymentMethods', actionData?.errors)}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            name="status"
            className="hidden"
            value="DRAFT"
            ref={draftBtn}
          ></button>
          <button
            type="submit"
            name="status"
            className="hidden"
            value="PUBLISHED"
            ref={publishBtn}
          ></button>

          <div className="flex items-center justify-between lg:pb-[50px] lg:pt-[117px]">
            <button
              onClick={() => setStep(1)}
              type="button"
              className="rounded-full border-2 px-[54px] py-3 font-bold text-gray-500"
            >
              Back
            </button>

            <Popover>
              <PopoverTrigger type="button">
                <button
                  type="button"
                  className="flex items-center rounded-full border-abgreen bg-abgreen font-bold text-white"
                >
                  <div className="flex-1 border-r border-white px-5 py-3">
                    Publish
                  </div>
                  <div className="px-4 py-3">
                    <ChevronDown />
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="flex w-[160px] flex-col space-y-1 rounded-[8px] px-0 py-[5px]">
                <button
                  onClick={() => {
                    publishBtn.current?.click()
                  }}
                  type="button"
                  key="active"
                  className="px-[14px] py-[10px] text-base hover:bg-gray-100"
                >
                  Save as active
                </button>
                <hr className="mx-auto w-[80%]" />
                <button
                  onClick={() => setOpenDraft(true)}
                  className="px-[14px] py-[10px] text-base hover:bg-gray-100"
                >
                  Save as draft
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </Form>
      <DraftCampaignConfirm
        onClick={() => {
          draftBtn.current?.click()
        }}
        isOpen={openDraft}
        setOpen={setOpenDraft}
      />
    </main>
  )
}
