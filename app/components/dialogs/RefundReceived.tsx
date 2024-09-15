import { SetStateAction } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { SuccessBadge } from '../shared/icons'

export default function RefundReceivedModal({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-[72px] sm:max-w-[425px] lg:max-w-[660px]">
        <DialogHeader>
          <div className="m-auto">
            <SuccessBadge className="size-[84px]" />
          </div>
          <DialogTitle className="m-auto mt-5 block text-center text-2xl">
            Refund request received
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <p className="m-auto max-w-[80%] text-center text-[15px]">
            Your donation refund request has been received. You will receive a
            link in your email to verify and confirm your request.
          </p>
        </div>

        <DialogFooter className="mt-5">
          <DialogClose className="m-auto">
            <button className="m-auto rounded-full border-2 border-primary bg-agreen px-[54px] py-2 font-bold text-[#fff] hover:bg-agreen/40">
              Done
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
