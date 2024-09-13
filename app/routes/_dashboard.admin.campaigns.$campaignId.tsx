import { Link } from '@remix-run/react'
import { ChevronLeftCircle } from 'lucide-react'
import { Progress } from '~/components/ui/progress'
import { PaymentMethod } from './admin.campaigns.create'

export default function CampaignDetails() {
  return (
    <section className="pt-[20px] lg:pt-[50px]">
      <div className="flex items-center justify-between">
        <Link to={'/admin/campaigns'}>
          <ChevronLeftCircle className="size-6 lg:size-9" />
        </Link>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-[#F04438] px-6 py-2 font-bold text-[#F04438]">
            End
          </button>
          <button className="hidden rounded-full border border-[#006B4B] px-6 py-2 font-bold text-[#006B4B] lg:block">
            Update
          </button>
          <button className="hidden rounded-full border border-[#006B4B] bg-[#006B4B] px-6 py-2 font-bold text-white lg:block">
            Publish
          </button>
        </div>
      </div>
      <h1 className="mt-[30px] text-[20px] font-bold text-[#333] lg:mt-[40px] lg:text-2xl">
        Support Annie’s Cancer Treatment
      </h1>
      <p className="mt-[10px] text-[10px] lg:text-base">
        Published: 20 August, 2024
      </p>
      <div className="flex flex-col gap-[25px] lg:flex-row">
        <div className="lg:flex-[1.5]">
          <img
            className="mt-5 h-[229px] w-full rounded-[10px] object-cover lg:h-[600px]"
            src="https://s3-alpha-sig.figma.com/img/4f4b/43e7/9e4bb24cd49fc410c89045988af9d938?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aiBzVnAt1RiQXxmr3cGq~A3yc9pyZyhnVTUTYZkKv4bJ432hUOm2BWG-FCDRWPjWagnl0UOaJjN8DHpbUcp3ZgbZOdupSNp5BLqjNhW3a22j9TOFD2qjMiYe3hfaveG6bvfa~WHAkoRXNhYULxgBURQpB62fjaRY~Ze4Al3ZYTHYWYadejp-eaPwWK0K-WaWrQQD3VthjoP6MAbF1TcXTQSOQtHSUL51cNYF7wv05CQatclDo4Zcd7OeLmAnqDHt-uXEE1maDlc7wioCVAY7CMGM66UZDNn~2mMEjzz1lcRFM35B4FXxxclq5M2wFkh5pig8t~WhCaJ3BSEVicjMvw__"
            alt="poster"
          />

          <div className="mt-5 text-sm text-ablack lg:text-base">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
              vitae mattis tellus. Nullam quis imperdiet augue.
            </p>

            <p>
              Vestibulum auctor ornare leo, non suscipit magna interdum eu.
              Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
              amet. Pellentesque commodo lacus at sodales sodales. Quisque
              sagittis orci ut diam condimentum, vel euismod erat placerat. In
              iaculis arcu eros, eget tempus orci facilisis id.
            </p>
          </div>
        </div>

        <div className="lg:sticky lg:top-20 lg:mt-5 lg:flex-1">
          <div className="box-sh rounded-[20px] p-[25px]">
            <p className="mb-[10px] text-sm font-bold text-[#4D5061] lg:mb-[15px] lg:text-base">
              Target: $100,000
            </p>
            <Progress value={30} className="mb-[10px] h-2 lg:mb-[7px]" />
            <div className="flex items-center justify-between pb-[10px]">
              <p className="text-xs text-[#7C8293] lg:text-sm lg:font-bold">
                $23,580 raised
              </p>
              <p className="text-xs text-[#7C8293] lg:text-sm lg:font-bold">
                25%
              </p>
            </div>

            <div className="mt-[30px]">
              <h4 className="text-sm font-bold text-ablack lg:text-base">
                Donations
              </h4>
              <p className="mt-[14px] text-sm text-[#7C8293]">
                23,459 donations
              </p>

              <div className="mt-5">
                <div className="flex flex-col gap-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-[#4D5061]">Oliver Otchere</p>

                      <p className="font-bold text-[#4D5061]">£200</p>
                    </div>
                  ))}
                </div>
                <button className="ml-auto mt-[15px] block w-auto text-xs font-bold text-blue-500">
                  See All
                </button>
              </div>
            </div>
          </div>

          <div className="box-sh mt-[25px] rounded-[20px] p-[25px]">
            <p className="text-sm font-bold text-ablack">
              Accepted Payment Methods
            </p>

            <div className="mt-[14px] grid grid-cols-2 gap-3">
              {PaymentMethod.map(({ Icon, name }) => (
                <div
                  className="flex items-center gap-[10px] rounded-[10px] border border-[#D0D5DD] px-[14px] py-3"
                  key={name}
                >
                  <Icon className="size-4" />
                  <p className="text-[10px] lg:text-xs">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
