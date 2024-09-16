import { Campaign } from '@prisma/client'
import { LoaderFunctionArgs } from '@remix-run/node'
import {
  Form,
  json,
  Link,
  useLoaderData,
  useSearchParams,
} from '@remix-run/react'
import dayjs from 'dayjs'
import { PlusCircle, Search } from 'lucide-react'
import { EmptyFolder } from '~/components/shared/icons'
import { Progress } from '~/components/ui/progress'
import { formatMoney } from '~/lib/formatMoney'
import { getAllCampaigns } from '~/server/campaign'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const status = url.searchParams.get('status') ?? ''
  const search = url.searchParams.get('search') ?? ''

  const campaigns = await getAllCampaigns(status as any, search)

  return json({
    campaigns: campaigns.campaigns,
  })
}

const titles = [
  {
    name: 'All Campaigns',
    param: '',
    title: 'Campaigns',
    description: 'All campaigns: published, draft, and ended',
  },
  {
    name: 'Published Campaigns',
    param: 'PUBLISHED',
    title: 'Published Campaigns',
    description: 'All campaigns that are public for donors to see',
  },
  {
    name: 'Draft Campaigns',
    param: 'DRAFT',
    title: 'Draft Campaigns',
    description: 'All campaigns not yet published',
  },
  {
    name: 'Ended Campaigns',
    param: 'ENDED',
    title: 'Ended Campaigns',
    description: 'All campaigns that are cancelled or reached their target',
  },
]

export default function Campaigns() {
  const { campaigns } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParam] = useSearchParams()
  const currentTab = searchParams.get('status') ?? ''

  const getTitle = () => {
    const key = searchParams.get('status') || ''
    const route = titles.find((t) => t.param == key)

    return route
  }

  return (
    <section className="mt-[20px] lg:mt-[43px] lg:pb-10">
      <section className="flex flex-col justify-between gap-[30px] lg:flex-row lg:items-center lg:gap-0">
        <div>
          <h3 className="text-xl font-bold text-[#333]">{getTitle()?.title}</h3>
          <p className="mt-[10px] text-[#333] lg:mt-5">
            {getTitle()?.description}
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
              placeholder="Search campaign"
              className="font-montserrat placeholder:font-montserrat flex-1 outline-none"
            />
          </div>
        </Form>
      </div>

      <div className="mt-[40px] grid grid-cols-1 gap-y-[30px] md:grid-cols-2 md:gap-x-[23px] lg:grid-cols-4 lg:gap-y-[40px]">
        {campaigns.map((campaign) => (
          <CampaignCard isAdmin campaign={campaign as any} key={campaign.id} />
        ))}
      </div>

      {campaigns.length == 0 && (
        <div className="py-10">
          <EmptyFolder className="mx-auto h-[166px] w-[176px]" />
          <p className="mt-[40px] text-center font-bold">No Campaigns</p>
        </div>
      )}
    </section>
  )
}

export const CampaignCard = ({
  campaign,
  isAdmin,
}: {
  campaign: Campaign & { totalPaymentsRaised: number }
  isAdmin?: boolean
}) => {
  return (
    <div className="box-sh flex flex-col rounded-[10px] bg-white p-[10px]">
      <div className="relative h-[165px] w-full overflow-hidden rounded-[10px] lg:h-[150px]">
        {campaign.image!?.length > 0 ? (
          <img
            className="h-full w-full object-cover"
            src={campaign.image as string}
          />
        ) : (
          <svg
            width="250"
            height="170"
            viewBox="0 0 250 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_45_1416)">
              <rect
                x="10"
                y="8"
                width="230"
                height="150"
                rx="10"
                fill="#D0D5DD"
              />
            </g>
            <g opacity="0.72">
              <path
                d="M94.3846 105.783L94.3196 105.848C93.4421 103.93 92.8896 101.753 92.6621 99.3477C92.8896 101.72 93.5071 103.865 94.3846 105.783Z"
                fill="white"
              />
              <path
                d="M115.25 77.7347C119.522 77.7347 122.985 74.2716 122.985 69.9996C122.985 65.7277 119.522 62.2646 115.25 62.2646C110.978 62.2646 107.515 65.7277 107.515 69.9996C107.515 74.2716 110.978 77.7347 115.25 77.7347Z"
                fill="white"
              />
              <path
                d="M138.618 50.5H111.382C99.5525 50.5 92.5 57.5525 92.5 69.3825V96.6175C92.5 100.16 93.1175 103.248 94.32 105.848C97.115 112.023 103.095 115.5 111.382 115.5H138.618C150.448 115.5 157.5 108.448 157.5 96.6175V89.175V69.3825C157.5 57.5525 150.448 50.5 138.618 50.5ZM152.203 84.625C149.668 82.4475 145.572 82.4475 143.037 84.625L129.518 96.2275C126.983 98.405 122.887 98.405 120.352 96.2275L119.247 95.3175C116.94 93.3025 113.267 93.1075 110.667 94.8625L98.5125 103.02C97.7975 101.2 97.375 99.0875 97.375 96.6175V69.3825C97.375 60.2175 102.217 55.375 111.382 55.375H138.618C147.783 55.375 152.625 60.2175 152.625 69.3825V84.9825L152.203 84.625Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_45_1416"
                x="0"
                y="0"
                width="250"
                height="170"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.4 0 0 0 0 0.439216 0 0 0 0 0.521569 0 0 0 0.1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_45_1416"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_45_1416"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        )}

        <p className="absolute left-[10px] top-[10px] rounded-full bg-[#191919] bg-opacity-20 px-[7px] py-[5px] text-[8px] font-bold text-white">
          {dayjs(campaign.createdAt).format('DD MMM, YYYY')}
        </p>
      </div>
      <div className="mt-[15px] flex flex-1 flex-col justify-between pl-[5px]">
        <Link
          to={
            isAdmin
              ? `/admin/campaigns/${campaign.id}`
              : `/campaigns/${campaign.id}`
          }
        >
          <h3 className="line-clamp-2 text-base font-bold">{campaign.title}</h3>
        </Link>

        <div className="mt-[14px] lg:mt-5">
          <p className="mb-[10px] text-sm font-bold text-[#4D5061] lg:mb-[15px]">
            Target: {formatMoney(campaign.targetAmount)}
          </p>
          <Progress
            value={(campaign.totalPaymentsRaised / campaign.targetAmount) * 100}
            className="mb-[10px] h-2 lg:mb-[7px]"
          />
          <div className="flex items-center justify-between pb-[10px]">
            <p className="text-xs text-[#7C8293] lg:font-bold">
              {formatMoney(campaign.totalPaymentsRaised)} raised
            </p>
            <p className="text-xs text-[#7C8293] lg:font-bold">
              {(
                (campaign.totalPaymentsRaised / campaign.targetAmount) *
                100
              ).toFixed(0)}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
