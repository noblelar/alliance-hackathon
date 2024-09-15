import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node'
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams,
} from '@remix-run/react'
import { Search } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { RefundTable } from '~/components/tables/RefundTable'
import { IError } from '~/lib/formatZodError'
import { getAllRefund, markRefund } from '~/server/refund.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const status = url.searchParams.get('status') ?? undefined
  const search = url.searchParams.get('search') ?? ''
  let state: boolean | undefined

  if (status == 'true') {
    state = true
  } else if (status == 'false') {
    state = false
  } else {
    state = undefined
  }

  const refunds = await getAllRefund(state, search)

  return json({
    refunds: refunds.refunds,
  })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const requestId = formData.get('requestId') as string

  const response = await markRefund(parseInt(requestId))

  return json({
    errors: [] as IError[],
    message: response.message,
    status: response.status,
  })
}

const titles = [
  {
    name: 'All Request',
    param: '',
    title: 'Donation Refund Requests',
    description: 'All donation refund requests: complete and incomplete',
  },
  {
    name: 'Complete Requests',
    param: 'true',
    title: 'Completed Donation Refund Requests',
    description: 'All donation refund requests: complete',
  },
  {
    name: 'Incomplete Requests',
    param: 'false',
    title: 'Incompleted Donation Refund Requests',
    description: 'All donation refund requests: complete',
  },
]

export default function RefundRequest() {
  const { refunds } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParam] = useSearchParams()
  const currentTab = searchParams.get('status') ?? ''

  const getTitle = () => {
    const key = searchParams.get('status') || ''
    const route = titles.find((t) => t.param == key)

    return route
  }

  const actionData = useActionData<typeof action>()

  useEffect(() => {
    if (actionData) {
      if (actionData?.status) {
        toast.success(actionData.message, {
          richColors: true,
        })
      } else {
        toast.error(actionData.message, {
          richColors: true,
        })
      }
    }
  }, [actionData])

  return (
    <section className="mt-[20px] lg:mt-[43px]">
      <section className="flex flex-col justify-between gap-[30px] lg:flex-row lg:items-center lg:gap-0">
        <div>
          <h3 className="text-xl font-bold text-[#333]">{getTitle()?.title}</h3>
          <p className="mt-[10px] text-[#333] lg:mt-5">
            {getTitle()?.description}
          </p>
        </div>
      </section>

      <div className="mt-[40px] flex max-w-[526px] overflow-scroll rounded-[8px] border p-[6px] lg:mt-[50px]">
        {titles.map((type) => (
          <div
            onClick={() =>
              setSearchParam((prev) => ({ ...prev, status: type.param }))
            }
            className={`flex-1 cursor-pointer text-nowrap rounded-[5px] px-6 py-3 text-center text-sm ${type.param == currentTab ? 'bg-[#006B4B] bg-opacity-10 font-bold text-[#006B4B] lg:text-base' : ''}`}
          >
            {type.name}
          </div>
        ))}
      </div>

      <div className="mt-[35px] flex items-center justify-between lg:mt-[40px]">
        <Form name="search" method="GET" className="flex w-full gap-2">
          <div className="flex max-w-[215px] flex-1 items-center gap-3 rounded-full border border-ablack px-[14px] py-[10px] lg:max-w-[311px]">
            <Search strokeWidth={2.5} size={18} />
            <input
              type="text"
              name="search"
              placeholder="Search refund request"
              className="font-montserrat placeholder:font-montserrat flex-1 outline-none"
            />
          </div>
        </Form>
      </div>

      <div className="mt-[40px]">
        <RefundTable data={refunds as any} />
      </div>
    </section>
  )
}
