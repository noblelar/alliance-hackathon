import {
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from '@remix-run/node'
import {
  NavLink,
  Outlet,
  useFetcher,
  useLoaderData,
  useLocation,
} from '@remix-run/react'
import { ChevronDown, LogOut, Menu, User } from 'lucide-react'
import {
  Campaigns,
  Dashboard,
  DonorCompanies,
  LogoLg,
  LogoSm,
  Refund,
  UserMgt,
} from '~/components/shared/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { preventUnAuthorizedUser } from '~/lib/preventUnAuthorizedUser'
import { getSession } from '~/sessions'
// import { preventUnAuthorizedUser } from '~/lib/preventUnAuthorizedUser'
// import { getSession } from '~/sessions'

export async function loader({ request }: LoaderFunctionArgs) {
  if (await preventUnAuthorizedUser(request)) {
    return redirect('/login')
  }

  const session = await getSession(request.headers.get('Cookie'))
  const firstName = session.get('firstName') as string

  return json({
    firstName,
  })
}

const links = [
  {
    Icon: Dashboard,
    title: 'Dashboard',
    link: '/admin',
  },
  {
    Icon: Campaigns,
    title: 'Campaigns',
    link: '/admin/campaigns',
  },
  {
    Icon: DonorCompanies,
    title: 'Donor Companies',
    link: '/admin/donor-companies',
  },

  {
    Icon: Refund,
    title: 'Refund Requests',
    link: '/admin/refund-requests',
  },
  {
    Icon: UserMgt,
    title: 'User Management',
    link: '/admin/user-management',
  },
]

export const meta: MetaFunction = () => [
  {
    title: 'Big Alliance | Empowering Communities, Elevating Partnerships.',
  },
  {
    name: 'description',
    content:
      'We make community investment easier, more effective  and more rewarding for our business partners.',
  },
]

const titles = [
  {
    link: 'campaigns',
    title: 'Campaigns',
  },
  {
    link: 'donor-companies',
    title: 'Donor Companies',
  },
  {
    link: 'refund-requests',
    title: 'Refund Requests',
  },
  {
    link: 'user-management',
    title: 'User Management',
  },
]

export default function DashboardLayout() {
  const location = useLocation()
  const { firstName } = useLoaderData<typeof loader>()

  const getTitle = () => {
    const key = location.pathname.split('/')[2]

    const route = titles.find((t) => t.link == key)

    return route?.title ?? 'Dasboard'
  }

  const fetcher = useFetcher()

  return (
    <section className="h-screen max-h-screen w-full bg-[#fdfdfd] lg:grid lg:grid-cols-[280px,auto] lg:gap-3 lg:overflow-hidden lg:p-2">
      <div className="hidden h-[calc(100%-16px)] w-full rounded-[20px] bg-abgreen p-[30px] lg:block">
        <LogoLg className="h-[38px] w-[200px]" />

        <div className="mt-[45px] flex flex-col gap-5">
          {links.map(({ link, Icon, title }) => (
            <NavLink
              key={title}
              to={link}
              className={({ isActive }) =>
                (isActive ? 'bg-white font-bold' : '') +
                ' flex cursor-pointer items-center gap-3 text-nowrap rounded-full bg-opacity-30 px-[24px] py-[8px] text-white hover:bg-white hover:bg-opacity-40'
              }
              end={link === '/admin/'}
            >
              <Icon />
              <p className="font-montserrat text-sm">{title}</p>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 overflow-scroll px-[10px] pt-20 lg:h-screen lg:max-h-screen lg:min-h-screen lg:px-3 lg:pt-4">
        <div className="box-sh fixed left-[10px] top-[10px] z-10 flex w-[calc(100%-20px)] items-center justify-between rounded-[8px] bg-white px-5 py-3 lg:relative lg:left-0">
          <div className="flex items-center gap-3 lg:hidden">
            <Menu />
            <LogoSm className="h-[26px] w-[24px]" />
          </div>
          <h3 className="hidden text-2xl font-bold capitalize text-[#333] lg:block">
            {getTitle()}
          </h3>

          <div className="flex items-center gap-1 lg:gap-3">
            <div className="flex size-6 items-center justify-center rounded-full border border-black lg:h-[30px] lg:w-[30px]">
              <User className="size-4" />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm">{firstName}</p>
              <p className="text-xs text-[#7C8293]">Admin</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ChevronDown color="#4D5061" className="size-4 lg:size-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <fetcher.Form method="POST" action="/signout">
                    <button className="flex items-center gap-2 text-red-500">
                      <LogOut className="size-5" /> Log out
                    </button>
                  </fetcher.Form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex-1 overflow-scroll px-[14px] pb-10 lg:px-5">
          <Outlet />
        </div>
      </div>
    </section>
  )
}
