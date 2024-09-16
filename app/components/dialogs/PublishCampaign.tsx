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

export default function PublishCampaignModal({
  children,
}: {
  children: React.ReactNode
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
          <DialogTitle className="text-2xl">Publish campaign</DialogTitle>
          <DialogDescription className="text-base text-ablack">
            You are about to publish this campaign. Donors will be able to see
            and donate to this campaign. Note that published campaigns cannot be
            updated. Do you want to proceed?
          </DialogDescription>
        </DialogHeader>

        <Form method="POST">
          <input className="hidden" name="actionType" value="publish" />
          <DialogFooter className="mt-5 gap-4">
            <DialogClose type="button">
              <button
                type="button"
                className="rounded-full border-2 border-[#006B4B] px-[54px] py-2 font-bold text-[#006B4B]"
              >
                Cancel
              </button>
            </DialogClose>
            <button className="hidden rounded-full border border-[#006B4B] bg-[#006B4B] px-[54px] py-2 font-bold text-white lg:block">
              Publish
            </button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
