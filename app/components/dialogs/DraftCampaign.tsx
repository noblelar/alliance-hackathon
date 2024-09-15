import { SetStateAction } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'

export default function DraftCampaignConfirm({
  isOpen,
  setOpen,
}: {
  isOpen: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[530px] lg:!p-[40px]">
        <DialogHeader>
          <DialogTitle className="mb-5 text-2xl">
            Your campaign draft is incomplete
          </DialogTitle>
          <DialogDescription className="text-base text-ablack">
            You can save your progress in drafts and continue later.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-5 gap-4">
          <DialogClose type="button">
            <button
              type="button"
              className="rounded-full border-2 border-[#006B4B] px-[54px] py-2 font-bold text-[#006B4B]"
            >
              Discard
            </button>
          </DialogClose>
          <button
            type="submit"
            name="status"
            value="draft"
            className="hidden rounded-full border border-[#006B4B] bg-[#006B4B] px-[54px] py-2 font-bold text-white lg:block"
          >
            Save as Draft
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
