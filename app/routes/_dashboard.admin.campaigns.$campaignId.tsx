import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node'
import { Link, useActionData, useLoaderData } from '@remix-run/react'
import dayjs from 'dayjs'
import { ChevronLeftCircle } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import EndCampaignModal from '~/components/dialogs/EndCampaign'
import PublishCampaignModal from '~/components/dialogs/PublishCampaign'
import { Progress } from '~/components/ui/progress'
import { formatMoney } from '~/lib/formatMoney'
import { IError } from '~/lib/formatZodError'
import { endCampaign, getCampaign, publishCampaign } from '~/server/campaign'
import { PaymentMethod } from './admin.campaigns.create'

export async function loader({ params }: LoaderFunctionArgs) {
  const campaignId = params.campaignId as string

  try {
    const campaign = await getCampaign(parseInt(campaignId), true)

    return json({
      campaign: campaign.campaign,
    })
  } catch (error) {
    return redirect('/admin/campaigns')
  }
}

export async function action({ params, request }: ActionFunctionArgs) {
  const campaignId = params.campaignId as string
  const formData = await request.formData()
  const actionType = formData.get('actionType') ?? ''

  try {
    if (actionType == 'end') {
      const response = await endCampaign(parseInt(campaignId))

      return json({
        errors: [] as IError[],
        message: response.message,
        status: response.status,
      })
    } else if (actionType == 'publish') {
      const response = await publishCampaign(parseInt(campaignId))

      return json({
        errors: [] as IError[],
        message: response.message,
        status: response.status,
      })
    } else {
      return json({
        errors: [] as IError[],
        message: 'Unhandled action',
        status: false,
      })
    }
  } catch (error: any) {
    return json({
      errors: [] as IError[],
      message: error.message || 'An unexpected error occurred',
      status: false,
    })
  }
}

export default function CampaignDetails() {
  const { campaign } = useLoaderData<typeof loader>()
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
    <section className="pt-[20px] lg:pt-[50px]">
      <div className="flex items-center justify-between">
        <Link to={'/admin/campaigns'}>
          <ChevronLeftCircle className="size-6 lg:size-9" />
        </Link>

        <div className="flex items-center gap-3">
          {campaign.status == 'PUBLISHED' && (
            <EndCampaignModal title={campaign.title}>
              <button className="rounded-full border border-[#F04438] px-6 py-2 font-bold text-[#F04438]">
                End Campaign
              </button>
            </EndCampaignModal>
          )}
          {campaign.status == 'DRAFT' && (
            <button className="hidden rounded-full border border-[#006B4B] px-6 py-2 font-bold text-[#006B4B] lg:block">
              Update Campaign
            </button>
          )}
          {campaign.status == 'DRAFT' && (
            <PublishCampaignModal>
              <button className="hidden rounded-full border border-[#006B4B] bg-[#006B4B] px-6 py-2 font-bold text-white lg:block">
                Publish Campaign
              </button>
            </PublishCampaignModal>
          )}
        </div>
      </div>
      <h1 className="mt-[30px] text-[20px] font-bold capitalize text-[#333] lg:mt-[40px] lg:text-2xl">
        {campaign.title}
      </h1>
      <p className="mt-[10px] text-[10px] lg:text-base">
        Published: {dayjs(campaign.createdAt).format('DD MMMM, YYYY')}
      </p>
      <div className="flex flex-col gap-[25px] lg:flex-row">
        <div className="lg:flex-[1.5]">
          <img
            className="mt-5 h-[229px] w-full rounded-[10px] object-cover lg:h-[600px]"
            src={
              campaign.image?.length
                ? campaign.image
                : 'https://placehold.co/600x400?text=Image'
            }
            alt="poster"
          />

          <div
            className="mt-5 text-ablack lg:text-base"
            dangerouslySetInnerHTML={{ __html: campaign.message ?? '' }}
          />
        </div>

        <div className="lg:sticky lg:top-20 lg:mt-5 lg:flex-1">
          <div className="box-sh rounded-[20px] p-[25px]">
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
              <p className="text-xs text-[#7C8293] lg:text-sm lg:font-bold">
                {formatMoney(campaign.totalPaymentsRaised)} raised
              </p>
              <p className="text-xs text-[#7C8293] lg:text-sm lg:font-bold">
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
                <div className="flex flex-col gap-3">
                  {campaign.donations.slice(0, 5).map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <p className="text-[#4D5061]">{donation.name}</p>

                      <p className="font-bold text-[#4D5061]">
                        {formatMoney(donation.amount)}
                      </p>
                    </div>
                  ))}
                </div>
                {campaign.donations.length > 0 && (
                  <button className="ml-auto mt-[15px] block w-auto text-xs font-bold text-blue-500">
                    See All
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="box-sh mt-[25px] rounded-[20px] p-[25px]">
            <p className="text-sm font-bold text-ablack">
              Accepted Payment Methods
            </p>

            <div className="mt-[14px] grid grid-cols-2 gap-3">
              {PaymentMethod.filter((p) =>
                campaign.acceptPaymentMethods.includes(p.value as any)
              ).map(({ Icon, name }) => (
                <div
                  className="flex items-center gap-[10px] rounded-[10px] border border-[#D0D5DD] px-[14px] py-3"
                  key={name}
                >
                  <Icon className="size-4" />
                  <p className="text-[10px] lg:text-xs">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
