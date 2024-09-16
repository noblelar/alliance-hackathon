import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { CampaignDonations } from '@prisma/client'
import dayjs from 'dayjs'
import { Button } from '~/components/ui/button'
import { formatMoney } from '~/lib/formatMoney'
import AdminTable from './AdminTable'

export type DonorCompany = {
  id: number
  name: string
  contactPersonName: string
  contactPersonEmail: string
  status: 'VERIFIED' | 'DECLINED' | 'UNVERIFIED'
}

export const columns: ColumnDef<CampaignDonations>[] = [
  {
    accessorKey: 'Date',
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
        {dayjs(row.getValue('createdAt')).format('DD MMM, YYYY')}
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-left font-bold text-ablack"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
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
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'donationId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-left font-bold text-ablack"
        >
          Donation Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('donationId')}</div>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number
      return formatMoney(amount)
    },
  },

  {
    id: 'isGiftAided',
    accessorKey: 'isGiftAided',
    enableHiding: false,
    cell: ({ row }) => {
      return <p>{row.original.GiftAided ? 'YES' : 'NO'}</p>
    },
  },
]

export function DonationTable({ data }: { data: DonorCompany[] }) {
  return <AdminTable data={data} columns={columns} />
}
