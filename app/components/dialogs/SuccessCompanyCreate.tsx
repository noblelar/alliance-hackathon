import { Link } from '@remix-run/react'
import { Dialog, DialogContent } from '~/components/ui/dialog'
import { SuccessBadge } from '../shared/icons'

export default function RegistrationDoneModal() {
  return (
    <Dialog open>
      <DialogContent className="!rounded-[20px] sm:max-w-[425px] lg:max-w-[650px] lg:!p-[40px] lg:!py-[72px]">
        <div>
          <SuccessBadge className="mx-auto size-[84px]" />
          <h4 className="mt-[24px] text-center text-2xl font-bold">
            Registration request received
          </h4>
          <p className="mx-auto mt-[20px] w-[450px] text-center text-base">
            Your donor company registration has been received. The team will
            reach out after 2 working days with your verification status.
          </p>

          <Link to={'/'}>
            <button className="mx-auto mt-[30px] block w-auto rounded-full bg-primary px-[50px] py-4 font-bold text-white">
              Done
            </button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
