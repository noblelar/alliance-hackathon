import { json, LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { ChevronLeftCircle, ChevronRightCircle, Search } from 'lucide-react'
import Hero from '~/assets/images/hero.png'
import { Star } from '~/components/shared/icons'
import { getAllCampaigns } from '~/server/campaign'
import { CampaignCard } from './_dashboard.admin.campaigns._index'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const search = url.searchParams.get('search') ?? ''

  const campaigns = await getAllCampaigns('PUBLISHED', search)

  return json({
    campaigns: campaigns.campaigns,
  })
}

export default function Home() {
  const { campaigns } = useLoaderData<typeof loader>()

  return (
    <>
      <div className="relative flex flex-col justify-end pb-[100px] lg:h-[700px] lg:w-full">
        <img
          src={Hero}
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
        <div className="relative">
          <h2 className="text-center text-[40px] font-bold text-white">
            Creating positive social change
          </h2>
          <p className="mt-[15px] text-center text-[30px] text-white">
            One donation at a time
          </p>
          <button className="mx-auto mt-[40px] block w-auto rounded-full bg-primary px-[54px] py-3 font-bold text-white">
            Donate Now
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-[50px] pt-[100px]">
        <div className="px-[50px]">
          <h3 className="mb-[50px] text-2xl font-bold">Campaigns</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Form name="search" method="GET" className="flex w-full gap-2">
                <div className="flex max-w-[311px] flex-1 items-center gap-3 rounded-full border border-ablack px-[14px] py-[10px] lg:max-w-[311px]">
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

            <div className="flex gap-2">
              <ChevronLeftCircle
                className="size-8 cursor-pointer"
                strokeWidth={'1'}
              />
              <ChevronRightCircle
                className="size-8 cursor-pointer"
                strokeWidth={'1'}
              />
            </div>
          </div>

          <div className="mt-[40px] grid grid-cols-1 gap-y-[30px] md:grid-cols-2 md:gap-x-[23px] lg:grid-cols-4 lg:gap-y-[40px]">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign as any} />
            ))}
          </div>
          <Link to={'/campaigns'}>
            <button className="mx-auto mt-[50px] block rounded-full border-2 border-ablack px-[55px] py-3 font-bold">
              View all campaigns
            </button>
          </Link>
        </div>

        <div className="relative mt-[150px] flex h-[400px] w-full items-center justify-center overflow-hidden rounded-[30px] bg-abgreen">
          <Star className="absolute -left-9 -top-16 h-[228px] w-[215px]" />
          <Star className="absolute left-52 top-32 h-[58px] w-[54px]" />
          <Star className="absolute bottom-0 left-32 h-[88px] w-[83px]" />
          <Star className="absolute left-[45%] top-14 h-[88px] w-[83px]" />
          <Star className="absolute bottom-3 left-[50%] h-[58px] w-[54px]" />
          <Star className="absolute right-40 top-14 h-[129px] w-[122px]" />
          <Star className="absolute -bottom-4 right-0 h-[209px] w-[197px]" />

          <div>
            <h3 className="text-center text-4xl font-bold text-white">
              Every pence counts
            </h3>

            <div className="mt-[50px] flex justify-center gap-[50px]">
              <button className="rounded-full bg-white px-[30px] py-[14px] font-bold text-abgreen">
                Donate as an Individual
              </button>
              <button className="rounded-full bg-white px-[30px] py-[14px] font-bold text-abgreen">
                Donate as a Company
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
