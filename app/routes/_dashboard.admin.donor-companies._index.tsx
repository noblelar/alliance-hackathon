import { Form } from '@remix-run/react'
import { Search } from 'lucide-react'
import { Filter } from '~/components/shared/icons'
import { DonorTable } from '~/components/tables/DonorTable'

export default function DonorCompanies() {
  const currentTab = 'All Request'

  return (
    <section className="mt-[20px] lg:mt-[43px]">
      <section className="flex flex-col justify-between gap-[30px] lg:flex-row lg:items-center lg:gap-0">
        <div>
          <h3 className="text-xl font-bold text-[#333]">Donor Companies</h3>
          <p className="mt-[10px] text-[#333] lg:mt-5">
            All companies: verified, unverified, and rejected
          </p>
        </div>
      </section>

      <div className="mt-[40px] flex max-w-[832px] overflow-scroll rounded-[8px] border p-[6px] lg:mt-[50px]">
        {[
          'All Request',
          'Verification Requests',
          'Verified Donor Companies',
          'Declined Verification Request',
        ].map((type) => (
          <div
            className={`flex-1 cursor-pointer text-nowrap rounded-[5px] px-6 py-3 text-center text-sm ${type == currentTab ? 'bg-[#006B4B] bg-opacity-10 font-bold text-[#006B4B] lg:text-base' : ''}`}
          >
            {type}
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
              placeholder="Search company"
              className="font-montserrat placeholder:font-montserrat flex-1 outline-none"
            />
          </div>
        </Form>

        <button className="flex items-center gap-3 rounded-full border border-black px-5 py-3 text-sm">
          <Filter />
          <span className="hidden lg:inline-block">Filter</span>
        </button>
      </div>

      <div className="mt-[40px]">
        <DonorTable />
      </div>
    </section>
  )
}
