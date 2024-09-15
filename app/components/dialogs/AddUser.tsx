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
import { Label } from '~/components/ui/label'
import { getFormError } from '~/lib/getFormError'
import { action } from '~/routes/_dashboard.admin.user-management'
import SubmitButton from '../shared/SubmitButton'

export default function AddUserModal({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const actionData = useActionData<typeof action>()

  useEffect(() => {
    if (actionData && actionData.actionType == 'add') {
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
          <DialogTitle className="text-2xl">Add User</DialogTitle>
        </DialogHeader>
        <Form method="POST">
          <div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="firstName" className="text-right text-base">
                  First Name
                </Label>
                <input
                  name="firstName"
                  className="rou mt-3 block w-full rounded-[10px] border px-4 py-3 outline-none"
                />
                <p className="text-xs text-red-500">
                  {getFormError('firstName', actionData?.errors)}
                </p>
              </div>

              <div className="flex-1">
                <Label htmlFor="lastName" className="text-right text-base">
                  Last Name
                </Label>
                <input
                  name="lastName"
                  className="rou mt-3 block w-full rounded-[10px] border px-4 py-3 outline-none"
                />
                <p className="text-xs text-red-500">
                  {getFormError('lastName', actionData?.errors)}
                </p>
              </div>
            </div>
            <div className="mt-[20px]">
              <div className="flex-1">
                <Label htmlFor="email" className="text-right text-base">
                  User Email
                </Label>
                <input
                  type="email"
                  name="email"
                  className="rou mt-3 block w-full rounded-[10px] border px-4 py-3 outline-none"
                />
                <p className="text-xs text-red-500">
                  {getFormError('email', actionData?.errors)}
                </p>
              </div>
            </div>

            <div className="mt-[20px]">
              <div className="flex-1">
                <Label htmlFor="name" className="text-right text-base">
                  Role
                </Label>
                <input
                  defaultValue={'Admin'}
                  disabled
                  className="rou mt-3 block w-full rounded-[10px] border px-4 py-3 outline-none"
                />
              </div>
            </div>
          </div>
          <input className="hidden" name="actionType" value="add" />
          <DialogFooter className="mt-5 gap-4">
            <DialogClose>
              <button className="rounded-full border-2 border-[#006B4B] px-[54px] py-2 font-bold text-[#006B4B]">
                Cancel
              </button>
            </DialogClose>
            <SubmitButton
              label="Add User"
              className="hidden rounded-full border border-[#006B4B] bg-[#006B4B] px-[54px] py-2 font-bold text-white lg:block"
            />
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
