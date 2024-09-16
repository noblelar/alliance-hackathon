import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { SuccessBadge } from '~/components/shared/icons'
import SubmitButton from '~/components/shared/SubmitButton'
import { Checkbox } from '~/components/ui/checkbox'
import { db } from '~/server/db.server'

export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const donationId = url.searchParams.get('donationId')

  if (!donationId || donationId.length == 0) {
    return redirect('/campaigns')
  }

  return json({
    donationId,
  })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const subscribe = formData.get('subscribe') === 'on' // Convert checkbox value to boolean
  const url = new URL(request.url)
  const donationId = url.searchParams.get('donationId') as string

  console.log('subscribe:', subscribe)
  if (subscribe) {
    const donation = await db.campaignDonations.findFirst({
      where: {
        donationId,
      },
    })

    try {
      await db.newsletterSubscriber.create({
        data: {
          email: donation?.email?.toLowerCase()!,
          name: donation?.name!,
        },
      })
    } catch (error) {
      console.log(error)
    }
    return redirect('/campaigns')
  } else {
    return redirect('/campaigns')
  }
}

export default function Thankyou() {
  const { donationId } = useLoaderData<typeof loader>()
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Form method="POST" className="mx-auto w-[450px]">
        <SuccessBadge className="mx-auto size-[84px]" />
        <h2 className="mb-5 mt-6 text-center text-2xl font-bold">
          Thank you for your donation
        </h2>
        <p className="text-center">
          You just helped this campaign get closer to it goals. Your donation ID
          is <strong>{donationId}</strong>. Keep it safe for future refunds.
        </p>
        <div className="mt-8 flex items-center justify-center gap-2">
          <Checkbox name={'subscribe'} />
          <p>I want to get newsletters from ELBA</p>
        </div>

        <SubmitButton
          label="Done"
          className="mx-auto mt-12 block rounded-full bg-agreen px-[50px] py-3 font-bold text-white"
        />
      </Form>
    </div>
  )
}
