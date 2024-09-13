import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'

export default function BlockUserModal({
  isOpen,
  setOpen,
}: {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[630px] lg:!p-[40px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Block User</DialogTitle>
          <DialogDescription className="text-base text-ablack">
            You are about to block this user. User will not be able to log into
            their account. Do you want to proceed?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-5 gap-4">
          <DialogClose>
            <button className="rounded-full border-2 border-[#006B4B] px-[54px] py-2 font-bold text-[#006B4B]">
              Cancel
            </button>
          </DialogClose>
          <button className="hidden rounded-full border border-[#006B4B] bg-[#006B4B] px-[54px] py-2 font-bold text-white lg:block">
            Block
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
