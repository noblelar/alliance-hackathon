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
import UnblockUserModal from '../dialogs/UnblockUser'
import AdminTable from './AdminTable'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  isBlocked: boolean
}

export const columns: ColumnDef<User>[] = [
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
    cell: ({ row }) => <div className="">Admin</div>,
  },
  {
    accessorKey: 'isBlocked',
    header: 'Blocked',
    cell: ({ row }) => {
      const r = row.original
      return <div className="">{r.isBlocked ? 'YES' : 'NO'}</div>
    },
  },

  {
    id: 'actions',
    header: 'Actions',
    enableHiding: false,
    cell: ({ row }) => {
      const r = row.original
      const [isResetOpen, setIsResetOpen] = useState(false)
      const [isBlockOpen, setIsBlockOpen] = useState(false)
      const [isUnblockOpen, setIsUnblockOpen] = useState(false)
      const [isRemoveOpen, setIsRemoveOpen] = useState(false)

      return (
        <>
          <ResetPasswordModal
            adminId={r.id}
            isOpen={isResetOpen}
            setOpen={setIsResetOpen}
            email={r.email}
          />
          <BlockUserModal
            adminId={r.id}
            isOpen={isBlockOpen}
            setOpen={setIsBlockOpen}
          />
          <RemoveUserModal
            adminId={r.id}
            isOpen={isRemoveOpen}
            setOpen={setIsRemoveOpen}
          />
          <UnblockUserModal
            adminId={r.id}
            isOpen={isUnblockOpen}
            setOpen={setIsUnblockOpen}
          />
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
              {!r.isBlocked && (
                <DropdownMenuItem onClick={() => setIsResetOpen(true)}>
                  Reset Password
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {!r.isBlocked && (
                <DropdownMenuItem onClick={() => setIsBlockOpen(true)}>
                  Block User
                </DropdownMenuItem>
              )}
              {r.isBlocked && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsUnblockOpen(true)}>
                    Unblock User
                  </DropdownMenuItem>
                </>
              )}
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

export function UserTable({ data }: { data: User[] }) {
  return <AdminTable columns={columns} data={data} />
}
