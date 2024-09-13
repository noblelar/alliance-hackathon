import { Form, Link } from '@remix-run/react'
import { PlusCircle, Search } from 'lucide-react'
import { Filter } from '~/components/shared/icons'
import { Progress } from '~/components/ui/progress'

export default function Campaigns() {
  const currentTab = 'All Campaigns'
  return (
    <section className="mt-[20px] lg:mt-[43px]">
      <section className="flex flex-col justify-between gap-[30px] lg:flex-row lg:items-center lg:gap-0">
        <div>
          <h3 className="text-xl font-bold text-[#333]">Published Campaigns</h3>
          <p className="mt-[10px] text-[#333] lg:mt-5">
            All campaigns that are public for donors to see
          </p>
        </div>
        <Link to={'/admin/campaigns/create'}>
          <button className="flex items-center gap-3 rounded-full bg-abgreen px-6 py-2 font-bold text-white">
            <PlusCircle className="size-4" />
            Create a Campaign
          </button>
        </Link>
      </section>

      <div className="mt-[40px] flex max-w-[900px] overflow-scroll rounded-[8px] border p-[6px] lg:mt-[50px]">
        {[
          'All Campaigns',
          'Published Campaigns',
          'Active Campaigns',
          'Draft Campaigns',
          'Ended Campaigns',
        ].map((type) => (
          <div
            className={`flex-1 cursor-pointer text-nowrap rounded-[5px] px-6 py-3 text-sm ${type == currentTab ? 'bg-[#006B4B] bg-opacity-10 font-bold text-[#006B4B] lg:text-base' : ''}`}
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
              placeholder="Search campaign"
              className="font-montserrat placeholder:font-montserrat flex-1 outline-none"
            />
          </div>
        </Form>

        <button className="flex items-center gap-3 rounded-full border border-black px-5 py-3 text-sm">
          <Filter />
          <span className="hidden lg:inline-block">Filter</span>
        </button>
      </div>

      <div className="mt-[40px] grid grid-cols-1 gap-y-[30px] md:grid-cols-2 md:gap-x-[23px] lg:grid-cols-4 lg:gap-y-[40px]">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CampaignCard key={i} />
        ))}
      </div>
    </section>
  )
}

export const CampaignCard = () => {
  return (
    <div className="box-sh rounded-[10px] bg-white p-[10px]">
      <div className="relative h-[165px] w-full overflow-hidden rounded-[10px] lg:h-[150px]">
        <img
          className="h-full w-full object-cover"
          src="https://s3-alpha-sig.figma.com/img/3628/cfd2/d9e96990f161ac703a1d3a85fe37d3a1?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ODuw9bR7CKNleX2wBirWXaWae~AJZXjSp0bq27tfxcQS3TonaebVholTOTbZ0nFMQius6m5R6gyKjfWZQ9LdL2lsmh3PR9IDQpYyMd4vR0cwSYt7ZiTUEQvRrPOWqOZi9ZjSBO8l-gouURSSL8I2u-oj6x9pbkqvbSZFW4nq2T5Kd4lW9HFHb~1ujQuJLSyFz0~gQ87p65BkUShjcglyhRcvOh-sZIJpYDnvHMihoYz0L4G6jx55sq3r2Mv26h-leW0rccdOM-VHX4uHbH50rltCS2yTtbGzUFSrewrYXOfyCzE3CDVIE4fktpHF49q38BxHwxSS-9BEZImiZx~J0w__"
        />
        <p className="absolute left-[10px] top-[10px] rounded-full bg-[#191919] bg-opacity-20 px-[7px] py-[5px] text-[8px] font-bold text-white">
          06 Sep, 2024
        </p>
      </div>
      <div className="mt-[15px] flex flex-col justify-between pl-[5px]">
        <h3 className="line-clamp-2 text-base font-bold">
          Support Annie’s cancer treatment
        </h3>

        <div className="mt-[14px] lg:mt-5">
          <p className="mb-[10px] text-sm font-bold text-[#4D5061] lg:mb-[15px]">
            Target: $100,000
          </p>
          <Progress value={30} className="mb-[10px] h-2 lg:mb-[7px]" />
          <div className="flex items-center justify-between pb-[10px]">
            <p className="text-xs text-[#7C8293] lg:font-bold">
              $23,580 raised
            </p>
            <p className="text-xs text-[#7C8293] lg:font-bold">25%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
