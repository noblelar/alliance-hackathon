import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Link } from '@remix-run/react'
import { Button } from '~/components/ui/button'
import { Badge } from '../ui/badge'
import AdminTable from './AdminTable'

const data: DonorCompany[] = [
  {
    id: 'm5gr84i9',
    contactPersonName: 'Obaa yaa',
    status: 'verified',
    contactPersonEmail: 'ken99@yahoo.com',
    name: 'Music corp',
  },
  {
    id: '3u1reuv4',
    contactPersonName: 'Richmond Otchere',
    status: 'unverified',
    contactPersonEmail: 'Abe45@gmail.com',
    name: 'Overcomers',
  },
  {
    id: 'derv1ws0',
    contactPersonName: 'Albert Otchere',
    status: 'unverified',
    contactPersonEmail: 'Monserrat44@gmail.com',
    name: 'Wonder Nation',
  },
  {
    id: '5kma53ae',
    contactPersonName: 'Bismark Adgei',
    status: 'verified',
    contactPersonEmail: 'Silas22@gmail.com',
    name: 'Big Nation',
  },
  {
    id: 'bhqecj4p',
    contactPersonName: 'Oliver Otchere',
    status: 'declined',
    contactPersonEmail: 'carmella@hotmail.com',
    name: 'Glorous fjfj',
  },
]

export type DonorCompany = {
  id: string

  name: string
  contactPersonName: string
  contactPersonEmail: string
  status: 'verified' | 'declined' | 'unverified'
}

export const columns: ColumnDef<DonorCompany>[] = [
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
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'contactPersonName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-left font-bold text-ablack"
        >
          Contact Person Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('contactPersonName')}</div>
    ),
  },
  {
    accessorKey: 'contactPersonEmail',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-left font-bold text-ablack"
        >
          Contact Person Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('contactPersonEmail')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge
          className={`px-[20px] py-1 text-sm font-semibold capitalize ${status == 'declined' && 'bg-[#F04438] bg-opacity-25 text-[#F04438]'} ${status == 'verified' && 'bg-agreen bg-opacity-25 text-primary'} hover:!bg-opacity-25 hover:bg-none ${status == 'unverified' && 'bg-[#F79009] bg-opacity-25 text-[#F79009] hover:bg-none'}`}
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
      const id = row.original.id

      return (
        <Link
          className="text-base font-bold text-blue-600 underline"
          to={`/admin/donor-companies/${id}`}
        >
          View
        </Link>
      )
    },
  },
]

export function DonorTable() {
  return <AdminTable data={data} columns={columns} />
}
