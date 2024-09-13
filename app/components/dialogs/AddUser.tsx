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

export default function AddUserModal({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[630px] lg:!p-[40px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add User</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="name" className="text-right text-base">
                First Name
              </Label>
              <input className="rou mt-3 block w-full rounded-[10px] border px-4 py-3 outline-none" />
            </div>

            <div className="flex-1">
              <Label htmlFor="name" className="text-right text-base">
                Last Name
              </Label>
              <input className="rou mt-3 block w-full rounded-[10px] border px-4 py-3 outline-none" />
            </div>
          </div>
          <div className="mt-[20px]">
            <div className="flex-1">
              <Label htmlFor="name" className="text-right text-base">
                User Email
              </Label>
              <input
                type="email"
                className="rou mt-3 block w-full rounded-[10px] border px-4 py-3 outline-none"
              />
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
        <DialogFooter className="mt-5 gap-4">
          <DialogClose>
            <button className="rounded-full border-2 border-[#006B4B] px-[54px] py-2 font-bold text-[#006B4B]">
              Cancel
            </button>
          </DialogClose>
          <button className="hidden rounded-full border border-[#006B4B] bg-[#006B4B] px-[54px] py-2 font-bold text-white lg:block">
            Add User
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
