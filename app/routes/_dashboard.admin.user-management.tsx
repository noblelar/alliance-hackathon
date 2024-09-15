import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { PlusCircle, Search } from 'lucide-react'
import AddUserModal from '~/components/dialogs/AddUser'
import { UserTable } from '~/components/tables/UserTable'
import { UserDTO } from '~/dto/user.dto'
import { formatZodErrors, IError } from '~/lib/formatZodError'
import {
  addUser,
  blockUser,
  getAllUser,
  removeUser,
  resetAdminPassword,
  unBlockUser,
} from '~/server/user.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const search = url.searchParams.get('search') ?? ''

  const admins = await getAllUser(search)
  return json({ admins })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const actionType = formData.get('actionType') ?? ''

  const adminId = formData.get('adminId') as string
  const firstName = (formData.get('firstName') as string) ?? ''
  const lastName = (formData.get('lastName') as string) ?? ''
  const email = (formData.get('email') as string) ?? ''

  try {
    if (actionType == 'reset') {
      const response = await resetAdminPassword(parseInt(adminId))

      return json({
        errors: [] as IError[],
        message: response.message,
        status: response.status,
        actionType,
      })
    } else if (actionType == 'block') {
      const response = await blockUser(parseInt(adminId))

      return json({
        errors: [] as IError[],
        message: response.message,
        status: response.status,
        actionType,
      })
    } else if (actionType == 'unblock') {
      const response = await unBlockUser(parseInt(adminId))

      return json({
        errors: [] as IError[],
        message: response.message,
        status: response.status,
        actionType,
      })
    } else if (actionType == 'remove') {
      const response = await removeUser(parseInt(adminId))

      return json({
        errors: [] as IError[],
        message: response.message,
        status: response.status,
        actionType,
      })
    } else if (actionType == 'add') {
      const result = UserDTO.parse({
        firstName,
        lastName,
        email,
      })

      const response = await addUser(result)

      return json({
        errors: [] as IError[],
        message: response.message,
        status: response.status,
        actionType,
      })
    } else {
      return json({
        errors: [] as IError[],
        message: 'Unhandled action',
        status: false,
        actionType,
      })
    }
  } catch (error: any) {
    if (error.errors?.length) {
      return json({
        errors: formatZodErrors(error.errors),
        message: 'Validation Errors',
        status: false,
        actionType,
      })
    }
  }
}

export default function UserManagement() {
  const { admins } = useLoaderData<typeof loader>()
  return (
    <section className="mt-[20px] lg:mt-[43px]">
      <section className="flex flex-col justify-between gap-[30px] lg:flex-row lg:items-center lg:gap-0">
        <div>
          <h3 className="text-xl font-bold text-[#333]">Users</h3>
          <p className="mt-[10px] text-[#333] lg:mt-5">
            Add and remove users, and manage passwords
          </p>
        </div>
        <AddUserModal>
          <button className="flex items-center gap-3 rounded-full bg-abgreen px-6 py-2 font-bold text-white">
            <PlusCircle className="size-4" />
            Add User
          </button>
        </AddUserModal>
      </section>

      <div className="mt-[35px] flex items-center justify-between lg:mt-[40px]">
        <Form name="search" method="GET" className="flex w-full gap-2">
          <div className="flex max-w-[215px] flex-1 items-center gap-3 rounded-full border border-ablack px-[14px] py-[10px] lg:max-w-[311px]">
            <Search strokeWidth={2.5} size={18} />
            <input
              type="text"
              name="search"
              placeholder="Search user"
              className="font-montserrat placeholder:font-montserrat flex-1 outline-none"
            />
          </div>
        </Form>
      </div>

      <div className="mt-[40px]">
        <UserTable data={admins} />
      </div>
    </section>
  )
}
