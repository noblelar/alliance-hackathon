import { Link, NavLink } from '@remix-run/react'
import { LogoGreen } from '~/components/shared/icons'

const titles = [
  {
    link: '/',
    title: 'Home',
  },
  {
    link: '/campaigns',
    title: 'Campaigns',
  },
  {
    link: '/refund',
    title: 'Refunds',
  },
]

export default function NavBar() {
  return (
    <div className="box-sh fixed left-0 right-0 top-5 z-10 mx-auto flex w-full max-w-[1380px] items-center justify-between rounded-[20px] bg-white px-[30px] py-[18px]">
      <LogoGreen className="h-[25px] w-[180px]" />

      <div className="flex items-center gap-[30px]">
        {titles.map(({ title, link }, navkey) => {
          return (
            <NavLink
              key={navkey}
              to={link}
              className={({ isActive }) =>
                (isActive ? 'active' : '') + ' nav-link'
              }
            >
              <p className="font-montserrat text-center text-sm font-bold leading-5">
                {title}
              </p>
            </NavLink>
          )
        })}

        <Link to={'/become-a-donor-company'}>
          <button className="rounded-full border border-primary bg-primary px-[30px] py-2 font-bold text-white lg:block">
            Become A Donor Company
          </button>
        </Link>
      </div>
    </div>
  )
}
