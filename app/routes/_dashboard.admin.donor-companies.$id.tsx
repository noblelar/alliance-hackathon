import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { ChevronLeftCircleIcon } from 'lucide-react'
import DeclineVerificationRequestModal from '~/components/dialogs/DeclineVerificationRequest'
import VerifyDonorCompanyModal from '~/components/dialogs/VerifyDonorCompany'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { RejectionDTO } from '~/dto/company.dto'
import { formatZodErrors, IError } from '~/lib/formatZodError'
import {
  getDonorById,
  rejectDonor,
  verifyDonor,
} from '~/server/donorCompany.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const companyId = params.id
    const company = await getDonorById(parseInt(companyId!))

    return {
      company,
    }
  } catch {
    return redirect('/admin/donor-companies')
  }
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const message = formData.get('reason') ?? ''
  const actionType = formData.get('actionType') ?? ''

  const companyId = parseInt(params.id!)

  try {
    if (actionType == 'reject') {
      const result = RejectionDTO.parse({
        reason: message,
      })

      const response = await rejectDonor({
        donorId: companyId,
        message: result.reason,
      })

      return json({
        errors: [] as IError[],
        message: response.message,
        status: response.status,
      })
    } else if (actionType == 'accept') {
      const response = await verifyDonor(companyId)

      return json({
        errors: [] as IError[],
        message: response.message,
        status: response.status,
      })
    } else {
      return json({
        errors: [] as IError[],
        message: 'Unhandled actio',
        status: false,
      })
    }
  } catch (error: any) {
    if (error.errors?.length) {
      return json({
        errors: formatZodErrors(error.errors),
        message: 'Validation Errors',
        status: false,
      })
    }
  }
}

export default function CompanyDetails() {
  const { company } = useLoaderData<typeof loader>()
  return (
    <section className="mt-[20px] lg:mt-[43px]">
      <Link to={'/admin/donor-companies'}>
        <ChevronLeftCircleIcon className="size-[30px] text-[#4D5061]" />
      </Link>

      <div className="mt-10 flex items-center justify-between border-b pb-10">
        <div className="flex items-center gap-6">
          <Avatar className="size-[120px]">
            <AvatarImage src="" />
            <AvatarFallback>{company.name[0]}</AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-xl font-bold text-[#333]">{company.name}</h2>
            <Badge
              className={`mt-[18px] px-[20px] py-1 text-sm font-semibold capitalize ${company.status.toLowerCase() == 'declined' && 'bg-[#F04438] bg-opacity-25 text-[#F04438]'} ${company.status.toLowerCase() == 'verified' && 'bg-agreen bg-opacity-25 text-primary'} hover:!bg-opacity-25 hover:bg-none ${company.status.toLowerCase() == 'unverified' && 'bg-[#F79009] bg-opacity-25 text-[#F79009] hover:bg-none'}`}
            >
              {company.status.toLowerCase()}
            </Badge>
          </div>
        </div>

        {company.status.toLowerCase() == 'unverified' && (
          <div className="flex items-center gap-3">
            <DeclineVerificationRequestModal companyName={company.name}>
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
        )}
      </div>

      <div className="border-b py-10">
        <p className="font-bold text-abgreen">Company Details</p>
        <div className="mt-[34px] flex gap-20">
          <div>
            <p className="mb-3 font-bold">Company Name</p>
            <p>{company.name}</p>
          </div>
          <div>
            <p className="mb-3 font-bold">Company Address</p>
            <p>{company.address}</p>
          </div>
        </div>
      </div>

      <div className="py-10">
        <p className="font-bold text-abgreen">Contact Person Details</p>
        <div className="mt-[34px] flex gap-20">
          <div>
            <p className="mb-3 font-bold">Contact Person Name</p>
            <p>{company.name}</p>
          </div>
          <div>
            <p className="mb-3 font-bold">Contact Person Email</p>
            <p>{company.contactPersonEmail}</p>
          </div>
        </div>
      </div>

      {company.status.toLowerCase() == 'declined' && (
        <div className="border-t py-10">
          <p className="font-bold text-abgreen">Reason For Rejection</p>
          <div className="mt-[34px] max-w-[700px] text-ablack">
            <p>{company.declineMessage}</p>
          </div>
        </div>
      )}
    </section>
  )
}
