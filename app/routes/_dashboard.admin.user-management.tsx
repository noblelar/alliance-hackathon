import { Form } from '@remix-run/react'
import { PlusCircle, Search } from 'lucide-react'
import AddUserModal from '~/components/dialogs/AddUser'
import { Filter } from '~/components/shared/icons'
import { UserTable } from '~/components/tables/UserTable'

export default function UserManagement() {
  const currentTab = 'All Requests'

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

        <button className="flex items-center gap-3 rounded-full border border-black px-5 py-3 text-sm">
          <Filter />
          <span className="hidden lg:inline-block">Filter</span>
        </button>
      </div>

      <div className="mt-[40px]">
        <UserTable />
      </div>
    </section>
  )
}
