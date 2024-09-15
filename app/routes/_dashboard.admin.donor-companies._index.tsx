import { LoaderFunctionArgs } from '@remix-run/node'
import { Form, json, useLoaderData, useSearchParams } from '@remix-run/react'
import { Search } from 'lucide-react'
import { DonorTable } from '~/components/tables/DonorTable'
import { getAllDonor } from '~/server/donorCompany.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const status = url.searchParams.get('status') ?? ''
  const search = url.searchParams.get('search') ?? ''

  const companies = await getAllDonor(status, search)

  return json({
    companies: companies.companies,
  })
}

const titles = [
  {
    name: 'All Request',
    param: '',
    title: 'Donor Companies',
    description: 'All companies: verified, unverified, and rejected',
  },
  {
    name: 'Verification Requests',
    param: 'UNVERIFIED',
    title: 'Unverifed Donor Companies',
    description: 'All companies: unverified',
  },
  {
    name: 'Verified Donor Companies',
    param: 'VERIFIED',
    title: 'Verified Donor Companies',
    description: 'All companies: verified',
  },
  {
    name: 'Declined Verification Request',
    param: 'DECLINED',
    title: 'Declined Donor Companies',
    description: 'All companies: rejected',
  },
]

export default function DonorCompanies() {
  const { companies } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParam] = useSearchParams()
  const currentTab = searchParams.get('status') ?? ''

  const getTitle = () => {
    const key = searchParams.get('status') || ''
    const route = titles.find((t) => t.param == key)

    return route
  }

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

      <div className="mt-[40px] flex max-w-[832px] overflow-scroll rounded-[8px] border p-[6px] lg:mt-[50px]">
        {titles.map((type) => (
          <button
            onClick={() =>
              setSearchParam((prev) => ({ ...prev, status: type.param }))
            }
            className={`flex-1 cursor-pointer text-nowrap rounded-[5px] px-6 py-3 text-center text-sm ${type.param == currentTab ? 'bg-[#006B4B] bg-opacity-10 font-bold text-[#006B4B] lg:text-base' : ''}`}
          >
            {type.name}
          </button>
        ))}
      </div>

      <div className="mt-[35px] flex items-center justify-between lg:mt-[40px]">
        <Form name="search" method="GET" className="flex w-full gap-2">
          <div className="flex max-w-[215px] flex-1 items-center gap-3 rounded-full border border-ablack px-[14px] py-[10px] lg:max-w-[311px]">
            <Search strokeWidth={2.5} size={18} />
            <input
              type="text"
              name="search"
              placeholder="Search company"
              className="font-montserrat placeholder:font-montserrat flex-1 outline-none"
            />
          </div>
        </Form>
      </div>

      <div className="mt-[40px]">
        <DonorTable data={companies} />
      </div>
    </section>
  )
}
