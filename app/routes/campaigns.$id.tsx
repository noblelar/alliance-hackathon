import { json, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Link, useLoaderData, useParams } from '@remix-run/react'
import dayjs from 'dayjs'
import { ChevronLeftCircle } from 'lucide-react'
import NavBar from '~/components/ui/NavBar'
import { Progress } from '~/components/ui/progress'
import { formatMoney } from '~/lib/formatMoney'
import { getCampaign } from '~/server/campaign'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const campaignId = params.id as string

  try {
    const campaign = await getCampaign(parseInt(campaignId), false)

    return json({
      campaign: campaign.campaign,
    })
  } catch (error) {
    return redirect('/campaigns')
  }
}

export default function CampaignDetails() {
  const { id } = useParams()
  const { campaign } = useLoaderData<typeof loader>()
  return (
    <div>
      <NavBar />

      <div className="mx-auto max-w-[1440px] px-[100px] pt-[160px]">
        <Link to={'/campaigns'}>
          <ChevronLeftCircle className="size-[35px]" />
        </Link>
        <div className="flex gap-[60px]">
          <div className="flex-1 pb-20">
            <h1 className="mt-[30px] text-[20px] font-bold capitalize text-[#333] lg:mt-[40px] lg:text-2xl">
              {campaign.title}
            </h1>
            <p className="mt-[10px] text-[10px] lg:text-base">
              Published: {dayjs(campaign.createdAt).format('DD MMMM, YYYY')}
            </p>
            <div className="flex flex-col gap-[25px] lg:flex-row">
              <div className="lg:flex-[1.5]">
                <img
                  className="mt-5 h-[229px] w-full rounded-[20px] object-cover lg:h-[400px]"
                  src={campaign.image!}
                  alt="poster"
                />

                <div
                  className="mt-5 text-ablack lg:text-base"
                  dangerouslySetInnerHTML={{ __html: campaign.message ?? '' }}
                />
              </div>
            </div>
          </div>

          <div className="w-[390px;]">
            <div className="box-sh mt-[120px] rounded-[20px] p-[25px]">
              <p className="mb-[10px] text-sm font-bold text-[#4D5061] lg:mb-[15px] lg:text-base">
                Target: {formatMoney(campaign.targetAmount)}
              </p>
              <Progress
                value={
                  (campaign.totalPaymentsRaised / campaign.targetAmount) * 100
                }
                className="mb-[10px] h-2 lg:mb-[7px]"
              />
              <div className="flex items-center justify-between pb-[10px]">
                <p className="text-xs text-[#7C8293] lg:text-sm">
                  {formatMoney(campaign.totalPaymentsRaised)} raised
                </p>
                <p className="text-xs text-[#7C8293] lg:text-sm">
                  {(
                    (campaign.totalPaymentsRaised / campaign.targetAmount) *
                    100
                  ).toFixed(0)}
                  %
                </p>
              </div>

              <div className="mt-[30px]">
                <h4 className="text-sm font-bold text-ablack lg:text-base">
                  Donations
                </h4>
                <p className="mt-[14px] text-sm text-[#7C8293]">
                  {campaign.donations.length} donations
                </p>

                <div className="mt-5">
                  <Link to={`/donate/${id}?type=individual`}>
                    <button className="w-full rounded-full border-2 border-primary py-[14px] font-bold text-primary hover:bg-agreen hover:bg-opacity-20">
                      Donate as an Individual
                    </button>
                  </Link>
                  <Link to={`/donate/${id}?type=company`}>
                    <button className="mt-5 w-full rounded-full border-2 border-primary py-[14px] font-bold text-primary hover:bg-agreen hover:bg-opacity-20">
                      Donate as a Company
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
