import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'

export default function VerifyDonorCompanyModal({
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
            Verify Some Company Name
          </DialogTitle>
        </DialogHeader>
        <div>
          <p>
            You are about to verify Some Company Name as a Donor Company. Do you
            want to proceed?
          </p>
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
