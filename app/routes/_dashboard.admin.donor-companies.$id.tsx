import { Link } from '@remix-run/react'
import { ChevronLeftCircleIcon } from 'lucide-react'
import DeclineVerificationRequestModal from '~/components/dialogs/DeclineVerificationRequest'
import VerifyDonorCompanyModal from '~/components/dialogs/VerifyDonorCompany'
import { Badge } from '~/components/ui/badge'

export default function CompanyDetails() {
  let status = ''
  return (
    <section className="mt-[20px] lg:mt-[43px]">
      <Link to={'/admin/donor-companies'}>
        <ChevronLeftCircleIcon className="size-[30px] text-[#4D5061]" />
      </Link>

      <div className="mt-10 flex items-center justify-between border-b pb-10">
        <div className="flex items-center gap-6">
          <img
            className="size-[120px] rounded-full object-cover"
            src="https://s3-alpha-sig.figma.com/img/db36/5f50/948747487050ac1e407ed928072fd1aa?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d2412FshaC0uSAg9iJKHkrCMNxPBg1qeq3fG0BMX0u~AAyGwm5Dc4r0UHgMFyWMq3aJbGtfBr1gD~yXGZ4ytS6sYYfZwg12hL77nJ0gPzf3V~16rLCCF0n4~~Ly3H7HFQBsjkAA21iXBhDiI8I6U5Oevf0whOsf183~~AdZ0w6mteLk5pDjSo9LFKxhXGDih19qaAXTrCMP3dvTup81bXpFLnLbM1Gm1ktNr7JrFTepvO~MLuT0qkTS3et5Oek2LbUk~9~EgR5cX5xRUP2B-EGSHTH0EZPKt33ura0z0Cb-Pue0Cb-KH~ChYMz6DYdZ54vxoDxcRnRY0JVtENB4hdA__"
          />

          <div>
            <h2 className="text-xl font-bold text-[#333]">Some Company Name</h2>
            <Badge
              className={`mt-[18px] px-[20px] py-1 text-sm font-semibold capitalize ${status == 'declined' && 'bg-[#F04438] bg-opacity-25 text-[#F04438]'} ${status == 'verified' && 'bg-agreen bg-opacity-25 text-primary'} hover:!bg-opacity-25 hover:bg-none ${status == 'unverified' && 'bg-[#F79009] bg-opacity-25 text-[#F79009] hover:bg-none'}`}
            >
              Unverified
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DeclineVerificationRequestModal>
            <button className="rounded-full border border-[#F04438] px-6 py-2 font-bold text-[#F04438]">
              Decline
            </button>
          </DeclineVerificationRequestModal>
          <VerifyDonorCompanyModal>
            <button className="hidden rounded-full border border-[#006B4B] bg-[#006B4B] px-6 py-2 font-bold text-white lg:block">
              Verify
            </button>
          </VerifyDonorCompanyModal>
        </div>
      </div>

      <div className="border-b py-10">
        <p className="font-bold text-abgreen">Company Details</p>
        <div className="mt-[34px] flex gap-20">
          <div>
            <p className="mb-3 font-bold">Company Name</p>
            <p>Some company name</p>
          </div>
          <div>
            <p className="mb-3 font-bold">Company Address</p>
            <p>2351 Street, London, United Kingdom</p>
          </div>
        </div>
      </div>

      <div className="py-10">
        <p className="font-bold text-abgreen">Contact Person Details</p>
        <div className="mt-[34px] flex gap-20">
          <div>
            <p className="mb-3 font-bold">Contact Person Name</p>
            <p>Elvis Montgomery</p>
          </div>
          <div>
            <p className="mb-3 font-bold">Contact Person Email</p>
            <p>elvis.montgomery@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="border-t py-10">
        <p className="font-bold text-abgreen">Reason For Rejection</p>
        <div className="mt-[34px] max-w-[700px] text-ablack">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
            vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor
            ornare leo, non suscipit magna interdum eu. Curabitur pellentesque
            nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo
            lacus at sodales sodales. Quisque sagittis orci ut diam condimentum,
            vel euismod erat placerat. In iaculis arcu eros, eget tempus orci
            facilisis id.
          </p>
        </div>
      </div>
    </section>
  )
}
