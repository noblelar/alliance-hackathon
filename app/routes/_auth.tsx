import { Outlet } from '@remix-run/react'
import { Logo } from '~/components/shared/icons'

export default function Auth() {
  return (
    <div className="min-h-screen w-full px-[24px] pb-20 pt-[30px] lg:px-[50px] lg:pt-[50px]">
      <Logo className="h-[50px] w-[50px] lg:h-[70px] lg:w-[70px]" />
      <Outlet />
    </div>
  )
}
