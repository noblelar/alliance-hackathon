import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

export default function DeclineVerificationRequestModal({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[630px] lg:!p-[40px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Decline Verification Request
          </DialogTitle>
        </DialogHeader>
        <div>
          <div>
            <Label htmlFor="name" className="text-right text-base">
              Company Name
            </Label>
            <input className="rou mt-3 block w-full rounded-[10px] border px-4 py-3 outline-none" />
          </div>
          <div className="mt-[30px]">
            <Label htmlFor="username" className="text-right text-base">
              Reason For Decline
            </Label>
            <Textarea className="mt-3 h-[150px]" />
          </div>
        </div>
        <DialogFooter className="mt-5">
          <DialogClose>
            <button className="rounded-full border-2 border-[#006B4B] px-[54px] py-2 font-bold text-[#006B4B]">
              Cancel
            </button>
          </DialogClose>
          <button className="hidden rounded-full border border-[#006B4B] bg-[#006B4B] px-[54px] py-2 font-bold text-white lg:block">
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
