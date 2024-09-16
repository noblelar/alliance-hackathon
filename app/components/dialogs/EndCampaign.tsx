import { Form, useActionData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { action } from '~/routes/_dashboard.admin.campaigns.$campaignId'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

export default function EndCampaignModal({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  const actionData = useActionData<typeof action>()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (actionData) {
      if (actionData?.status) {
        setIsOpen(false)
      }
    }
  }, [actionData])
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[630px] lg:!p-[40px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">End campaign</DialogTitle>
          <DialogDescription className="text-base text-ablack">
            You are about to end the campaign, {title}. This action is
            permanent. You can’t reactivate an ended campaign.
          </DialogDescription>
        </DialogHeader>

        <Form method="POST">
          <input className="hidden" name="actionType" value="end" />
          <DialogFooter className="mt-5 gap-4">
            <DialogClose type="button">
              <button
                type="button"
                className="rounded-full border-2 border-[#006B4B] px-[54px] py-2 font-bold text-[#006B4B]"
              >
                Cancel
              </button>
            </DialogClose>
            <button className="hidden rounded-full border border-[#f04438] bg-[#f04438] px-[54px] py-2 font-bold text-white lg:block">
              Publish
            </button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
