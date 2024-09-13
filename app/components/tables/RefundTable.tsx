import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import dayjs from 'dayjs'
import { Button } from '~/components/ui/button'
import { Badge } from '../ui/badge'
import AdminTable from './AdminTable'

const data: RefundRequest[] = [
  {
    id: 'm5gr84i9',
    name: 'Obaa yaa',
    status: 'incomplete',
    email: 'ken99@yahoo.com',
    companyName: 'Music corp',
    amount: 2000,
    donorId: 'D122445569',
    date: '2012-04-23T18:25:43.511Z',
  },
  {
    id: '3u1reuv4',
    name: 'Richmond Otchere',
    status: 'incomplete',
    email: 'Abe45@gmail.com',
    companyName: 'Overcomers',
    amount: 2000,
    donorId: 'D122445569',
    date: '2012-04-23T18:25:43.511Z',
  },
  {
    id: 'derv1ws0',
    name: 'Albert Otchere',
    status: 'complete',
    email: 'Monserrat44@gmail.com',
    companyName: 'Wonder Nation',
    amount: 2000,
    donorId: 'D122445569',
    date: '2012-04-23T18:25:43.511Z',
  },
  {
    id: '5kma53ae',
    name: 'Bismark Adgei',
    status: 'complete',
    email: 'Silas22@gmail.com',
    companyName: 'Big Nation',
    amount: 2000,
    donorId: 'D122445569',
    date: '2012-04-23T18:25:43.511Z',
  },
  {
    id: 'bhqecj4p',
    name: 'Oliver Otchere',
    status: 'complete',
    email: 'carmella@hotmail.com',
    companyName: 'Glorous fjfj',
    amount: 2000,
    donorId: 'D122445569',
    date: '2012-04-23T18:25:43.511Z',
  },
]

export type RefundRequest = {
  id: string
  name: string
  companyName: string
  email: string
  status: 'complete' | 'incomplete'
  amount: number
  donorId: string
  date: string
}

export const columns: ColumnDef<RefundRequest>[] = [
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
        {dayjs(row.getValue('date')).format('DD MMM, YYYY')}
      </div>
    ),
  },
  {
    accessorKey: 'donorId',
    header: () => <div className="">Donor ID</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('donorId')}</div>
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
      const amount = parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP',
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge
          className={`px-[20px] py-1 text-sm font-semibold capitalize ${status == 'incomplete' && 'bg-[#F04438] bg-opacity-25 text-[#F04438]'} ${status == 'complete' && 'bg-agreen bg-opacity-25 text-primary'} hover:!bg-opacity-25 hover:bg-none ${status == 'unverified' && 'bg-[#F79009] bg-opacity-25 text-[#F79009] hover:bg-none'}`}
        >
          {status}
        </Badge>
      )
    },
  },

  {
    id: 'actions',
    accessorKey: 'Actions',
    enableHiding: false,
    cell: ({ row }) => {
      const status = row.original.status

      return status == 'incomplete' ? (
        <button className="text-base font-bold text-blue-600 underline">
          Mark As Complete
        </button>
      ) : null
    },
  },
]

export function RefundTable() {
  return <AdminTable data={data} columns={columns} />
}
