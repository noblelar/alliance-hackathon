import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { useState } from 'react'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import BlockUserModal from '../dialogs/BlockUser'
import RemoveUserModal from '../dialogs/RemoveUser'
import ResetPasswordModal from '../dialogs/ResetPassword'
import AdminTable from './AdminTable'

const data: DonorCompany[] = [
  {
    id: 'm5gr84i9',
    firstName: 'Oliver',
    lastName: 'Otchere',
    role: 'Admin',
    email: 'carmella@hotmail.com',
  },
  {
    id: '3u1reuv4',
    firstName: 'Oliver',
    lastName: 'Otchere',
    role: 'Admin',
    email: 'carmella@hotmail.com',
  },
  {
    id: 'derv1ws0',
    firstName: 'Oliver',
    lastName: 'Otchere',
    role: 'Admin',
    email: 'carmella@hotmail.com',
  },
  {
    id: '5kma53ae',
    firstName: 'Oliver',
    lastName: 'Otchere',
    role: 'Admin',
    email: 'carmella@hotmail.com',
  },
  {
    id: 'bhqecj4p',
    firstName: 'Oliver',
    lastName: 'Otchere',
    role: 'Admin',
    email: 'carmella@hotmail.com',
  },
]

export type DonorCompany = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
}

export const columns: ColumnDef<DonorCompany>[] = [
  {
    accessorKey: 'firstName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="font-bold text-ablack"
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('firstName')}</div>
    ),
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="font-bold text-ablack"
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('lastName')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="font-bold text-ablack"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },

  {
    id: 'actions',
    header: 'Actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      const [isResetOpen, setIsResetOpen] = useState(false)
      const [isBlockOpen, setIsBlockOpen] = useState(false)
      const [isRemoveOpen, setIsRemoveOpen] = useState(false)

      return (
        <>
          <ResetPasswordModal isOpen={isResetOpen} setOpen={setIsResetOpen} />
          <BlockUserModal isOpen={isBlockOpen} setOpen={setIsBlockOpen} />
          <RemoveUserModal isOpen={isRemoveOpen} setOpen={setIsRemoveOpen} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 rounded-full bg-gray-300 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsResetOpen(true)}>
                Reset Password
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsBlockOpen(true)}>
                Block User
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsRemoveOpen(true)}
                className="text-red-500"
              >
                Remove User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]

export function UserTable() {
  return <AdminTable columns={columns} data={data} />
}
