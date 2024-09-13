import { Link, Outlet } from '@remix-run/react'
import {
  FooterLogo,
  Instagram,
  LinkedIn,
  LogoGreen,
  XLogo,
} from '~/components/shared/icons'

export default function Home() {
  return (
    <div>
      <div className="box-sh fixed left-0 right-0 top-5 z-10 mx-auto flex w-full max-w-[1380px] items-center justify-between rounded-[20px] bg-white px-[30px] py-[18px]">
        <LogoGreen className="h-[25px] w-[180px]" />

        <div className="flex gap-[30px]">
          <button className="font-bold">Campaigns</button>
          <Link to={'/become-a-donor-company'}>
            <button className="rounded-full border border-primary bg-primary px-[30px] py-2 font-bold text-white lg:block">
              Become A Donor Company
            </button>
          </Link>
        </div>
      </div>
      <Outlet />
      <div className="mx-auto max-w-[1440px] px-[50px]">
        <footer className="mt-[150px] flex justify-between border-t p-[50px]">
          <FooterLogo className="h-[96px] w-[97px]" />

          <div>
            <h3 className="font-bold text-ablack">Get in touch</h3>
            <a
              href="mailto:info@thebigalliance.org.uk"
              className="mb-[36px] mt-[28px] inline-block text-ablack underline"
            >
              info@thebigalliance.org.uk
            </a>

            <div className="flex gap-5">
              <Instagram className="size-6" />
              <LinkedIn className="size-6" />
              <XLogo className="size-6" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-ablack">Find us</h3>
            <p className="mt-5 max-w-[186px]">
              13 Elliott's Place, Islington, London N1 8HX
            </p>
          </div>
        </footer>
      </div>
      <div className="border py-10">
        <p className="text-center text-[#4D5061]">
          © 2024 The Alliance Donate Project. All Rights Reserved
        </p>
      </div>
    </div>
  )
}
