import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { CampaignDonations, DonationRefund, DonorCompany } from '@prisma/client'
import { Form } from '@remix-run/react'
import dayjs from 'dayjs'
import { Button } from '~/components/ui/button'
import { formatMoney } from '~/lib/formatMoney'
import { Badge } from '../ui/badge'
import AdminTable from './AdminTable'

export const columns: ColumnDef<
  DonationRefund & { donation: CampaignDonations }
>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-left font-bold text-ablack"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {dayjs(row.original.createdAt).format('DD MMM, YYYY')}
      </div>
    ),
  },
  {
    accessorKey: 'donorId',
    header: () => <div className="">Donor ID</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.original.donation.donationId}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-left font-bold text-ablack"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'amount',
    header: () => <div className="">Amount</div>,
    cell: ({ row }) => {
      const amount = row.original.donation.amount

      return <div className="font-medium">{formatMoney(amount)}</div>
    },
  },
  {
    accessorKey: 'fulfilled',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('fulfilled') as string
      return (
        <Badge
          className={`px-[20px] py-1 text-sm font-semibold capitalize ${status == 'incomplete' && 'bg-[#F04438] bg-opacity-25 text-[#F04438]'} ${status == 'complete' && 'bg-agreen bg-opacity-25 text-primary'} hover:!bg-opacity-25 hover:bg-none ${status == 'unverified' && 'bg-[#F79009] bg-opacity-25 text-[#F79009] hover:bg-none'}`}
        >
          {status ? 'Completed' : 'Incompleted'}
        </Badge>
      )
    },
  },

  {
    id: 'actions',
    accessorKey: 'Actions',
    enableHiding: false,
    cell: ({ row }) => {
      const status = row.original.fulfilled

      return status == false ? (
        <Form method="POST">
          <input className="hidden" value={row.original.id} name="requestId" />
          <button className="text-base font-bold text-blue-600 underline">
            Mark As Complete
          </button>
        </Form>
      ) : null
    },
  },
]

export function RefundTable({
  data,
}: {
  data: (DonationRefund & { donation: DonorCompany })[]
}) {
  return <AdminTable data={data} columns={columns} />
}
