import { Form, useActionData } from '@remix-run/react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Label } from '~/components/ui/label'
import { action } from '~/routes/_dashboard.admin.user-management'

export default function ResetPasswordModal({
  isOpen,
  setOpen,
  adminId,
  email,
}: {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  adminId: number
  email: string
}) {
  const actionData = useActionData<typeof action>()

  useEffect(() => {
    if (actionData && actionData.actionType == 'reset') {
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
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[630px] lg:!p-[40px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Reset Password</DialogTitle>
          <DialogDescription className="text-base text-ablack">
            Send password reset link to user’s email.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <div className="flex-1">
              <Label htmlFor="name" className="text-right text-base">
                User Email
              </Label>
              <input
                defaultValue={email}
                disabled
                className="rou mt-3 block w-full rounded-[10px] border border-ablack px-4 py-3 outline-none"
              />
            </div>
          </div>
        </div>
        <Form method="POST">
          <input className="hidden" name="actionType" value="reset" />
          <input className="hidden" name="adminId" value={adminId} />
          <DialogFooter className="mt-5 gap-4">
            <DialogClose>
              <button className="rounded-full border-2 border-[#006B4B] px-[54px] py-2 font-bold text-[#006B4B]">
                Cancel
              </button>
            </DialogClose>
            <button className="hidden rounded-full border border-[#006B4B] bg-[#006B4B] px-[54px] py-2 font-bold text-white lg:block">
              Send Link
            </button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
