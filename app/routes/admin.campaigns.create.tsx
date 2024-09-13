import { Link } from '@remix-run/react'
import { ChevronDown, ChevronLeftCircle } from 'lucide-react'
import { ApplePay, Card, Google, Venmo } from '~/components/shared/icons'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'

export const PaymentMethod = [
  {
    name: 'Credit/Debit Card',
    Icon: Card,
  },
  {
    name: 'Venmo',
    Icon: Venmo,
  },
  {
    name: 'Apple Pay',
    Icon: ApplePay,
  },
  {
    name: 'Google pay',
    Icon: Google,
  },
]

export default function CreateCampaign() {
  return (
    <main className="w-full overflow-y-hidden bg-white p-6 lg:grid lg:h-screen lg:grid-cols-[minmax(34%,483px),minmax(66%,auto)] lg:bg-[#fbf8f6] lg:p-0">
      <div className="lg:flex-shrink-0 lg:bg-[#fbf8f6] lg:pl-16 lg:pt-16">
        <Link to="/admin/campaigns">
          <ChevronLeftCircle className="size-[35px]" />
        </Link>

        <div className="lg:mt-[65px]">
          <h4 className="font-bold lg:text-2xl">Create Campaign</h4>
          <div className="mt-[40px]">
            <div className="flex items-center gap-3">
              <div className="flex size-[30px] items-center justify-center rounded-full border-2 border-abgreen font-semibold text-abgreen">
                1
              </div>
              <h1 className="font-bold text-abgreen">Campaign Details</h1>
            </div>
            <div className="mt-[30px] flex items-center gap-3">
              <div className="flex size-[30px] items-center justify-center rounded-full border border-black">
                2
              </div>
              <h1 className="">Target Amount</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="relative lg:h-full lg:flex-shrink-0 lg:overflow-y-scroll lg:bg-white lg:shadow-lg">
        {/* <div className="mx-auto mt-[150px] h-full max-w-[760px]">
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
                error={getFormError('title', [])}
              />
            </div>

            <div className="mt-10">
              <p className="mb-5">
                Campaign Title <span className="text-red-400">*</span>
              </p>

              <div className="border-agreen relative flex h-[150px] flex-col items-center justify-center gap-5 rounded-[10px] border border-dashed">
                <Upload />
                <p className="text-agreen cursor-pointer text-center text-xs font-bold">
                  click to upload
                </p>

                <input
                  type="file"
                  className="absolute left-0 top-0 z-10 h-full w-full opacity-0"
                />
              </div>
            </div>

            <div className="mt-10">
              <p className="mb-5">
                Campaign Message <span className="text-red-400">*</span>
              </p>

              <textarea
                placeholder="Message"
                className="h-[150px] w-full resize-none rounded-[10px] border border-[#667085] p-4"
              />
            </div>
          </div>

          <div className="flex justify-between lg:pb-[50px] lg:pt-[117px]">
            <button className="rounded-full border-2 px-[54px] py-3 font-bold text-gray-500">
              Back
            </button>

            <button className="bg-abgreen border-abgreen rounded-full border-2 px-[54px] py-3 font-bold text-white">
              Next
            </button>
          </div>
        </div> */}

        <div className="mx-auto mt-[150px] h-full max-w-[760px]">
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
                  <p>USD</p>
                </div>
                <input
                  type="number"
                  placeholder="0.00"
                  className="flex-1 px-4 outline-none"
                />
              </div>
            </div>

            <div className="mt-10">
              <p className="mb-5">
                Accepted Payment Methods <span className="text-red-400">*</span>
              </p>

              <div className="flex items-center gap-[10px]">
                <Checkbox />
                <p className="text-sm">Select all</p>
              </div>

              <div className="mt-6 flex flex-col gap-5">
                {PaymentMethod.map(({ name, Icon }) => (
                  <div className="flex w-full items-center gap-5 rounded-[10px] border px-5 py-4">
                    <Checkbox />

                    <div className="flex items-center gap-3">
                      <Icon className="size-[24px]" />
                      <p>{name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between lg:pb-[50px] lg:pt-[117px]">
            <button className="rounded-full border-2 px-[54px] py-3 font-bold text-gray-500">
              Back
            </button>

            <Popover>
              <PopoverTrigger>
                <button className="flex items-center rounded-full border-abgreen bg-abgreen font-bold text-white">
                  <div className="flex-1 border-r border-white px-5 py-3">
                    Publish
                  </div>
                  <div className="px-4 py-3">
                    <ChevronDown />
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="flex w-[160px] flex-col space-y-1 rounded-[8px] px-0 py-[5px]">
                <button className="px-[14px] py-[10px] text-base hover:bg-gray-100">
                  Save as active
                </button>
                <hr className="mx-auto w-[80%]" />
                <button className="px-[14px] py-[10px] text-base hover:bg-gray-100">
                  Save as draft
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </main>
  )
}
