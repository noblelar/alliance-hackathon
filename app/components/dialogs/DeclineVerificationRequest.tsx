import { Form, useActionData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { action } from '~/routes/_dashboard.admin.donor-companies.$id'
import SubmitButton from '../shared/SubmitButton'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

export default function DeclineVerificationRequestModal({
  children,
  companyName,
}: {
  children: React.ReactNode
  companyName: string
}) {
  const [open, setOpen] = useState(false)
  const actionData = useActionData<typeof action>()

  useEffect(() => {
    if (actionData) {
      if (actionData?.status) {
        setOpen(false)
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[630px] lg:!p-[40px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Decline Verification Request
          </DialogTitle>
        </DialogHeader>
        <Form method="POST">
          <div>
            <div>
              <Label htmlFor="name" className="text-right text-base">
                Company Name
              </Label>
              <input
                value={companyName}
                disabled
                className="rou mt-3 block w-full rounded-[10px] border px-4 py-3 outline-none"
              />
            </div>
            <div className="mt-[30px]">
              <Label htmlFor="username" className="text-right text-base">
                Reason For Decline
              </Label>
              <Textarea name="reason" className="mt-3 h-[150px]" />
            </div>
            <input name="actionType" className="hidden" value="reject" />
          </div>
          <DialogFooter className="mt-5">
            <DialogClose>
              <button
                type="button"
                className="rounded-full border-2 border-[#006B4B] px-[54px] py-2 font-bold text-[#006B4B]"
              >
                Cancel
              </button>
            </DialogClose>
            <SubmitButton
              label="Reject"
              className="hidden rounded-full border border-[#006B4B] bg-[#006B4B] px-[54px] py-2 font-bold text-white lg:block"
            />
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
