import { ChevronLeftCircle } from 'lucide-react'
import NavBar from '~/components/ui/NavBar'
import { Progress } from '~/components/ui/progress'

export default function CampaignDetails() {
  return (
    <div>
      <NavBar />

      <div className="mx-auto max-w-[1440px] px-[100px] pt-[160px]">
        <ChevronLeftCircle className="size-[35px]" />
        <div className="flex gap-[60px]">
          <div className="flex-1 pb-20">
            <h1 className="mt-[30px] text-[20px] font-bold text-[#333] lg:mt-[40px] lg:text-2xl">
              Support Annie’s Cancer Treatment
            </h1>
            <p className="mt-[10px] text-[10px] lg:text-base">
              Published: 20 August, 2024
            </p>
            <div className="flex flex-col gap-[25px] lg:flex-row">
              <div className="lg:flex-[1.5]">
                <img
                  className="mt-5 h-[229px] w-full rounded-[20px] object-cover lg:h-[400px]"
                  src="https://s3-alpha-sig.figma.com/img/4f4b/43e7/9e4bb24cd49fc410c89045988af9d938?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aiBzVnAt1RiQXxmr3cGq~A3yc9pyZyhnVTUTYZkKv4bJ432hUOm2BWG-FCDRWPjWagnl0UOaJjN8DHpbUcp3ZgbZOdupSNp5BLqjNhW3a22j9TOFD2qjMiYe3hfaveG6bvfa~WHAkoRXNhYULxgBURQpB62fjaRY~Ze4Al3ZYTHYWYadejp-eaPwWK0K-WaWrQQD3VthjoP6MAbF1TcXTQSOQtHSUL51cNYF7wv05CQatclDo4Zcd7OeLmAnqDHt-uXEE1maDlc7wioCVAY7CMGM66UZDNn~2mMEjzz1lcRFM35B4FXxxclq5M2wFkh5pig8t~WhCaJ3BSEVicjMvw__"
                  alt="poster"
                />

                <div className="mt-5 text-sm text-ablack lg:text-base">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                    amet sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
                    augue.
                  </p>

                  <p>
                    Vestibulum auctor ornare leo, non suscipit magna interdum
                    eu. Curabitur pellentesque nibh nibh, at maximus ante
                    fermentum sit amet. Pellentesque commodo lacus at sodales
                    sodales. Quisque sagittis orci ut diam condimentum, vel
                    euismod erat placerat. In iaculis arcu eros, eget tempus
                    orci facilisis id.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[390px;]">
            <div className="box-sh mt-[120px] rounded-[20px] p-[25px]">
              <p className="mb-[10px] text-sm font-bold text-[#4D5061] lg:mb-[15px] lg:text-base">
                Target: $100,000
              </p>
              <Progress value={30} className="mb-[10px] h-2 lg:mb-[7px]" />
              <div className="flex items-center justify-between pb-[10px]">
                <p className="text-xs text-[#7C8293] lg:text-sm">
                  $23,580 raised
                </p>
                <p className="text-xs text-[#7C8293] lg:text-sm">25%</p>
              </div>

              <div className="mt-[30px]">
                <h4 className="text-sm font-bold text-ablack lg:text-base">
                  Donations
                </h4>
                <p className="mt-[14px] text-sm text-[#7C8293]">
                  23,459 donations
                </p>

                <div className="mt-5">
                  <button className="w-full rounded-full border-2 border-primary py-[14px] font-bold text-primary hover:bg-agreen hover:bg-opacity-20">
                    Donate as an Individual
                  </button>
                  <button className="mt-5 w-full rounded-full border-2 border-primary py-[14px] font-bold text-primary hover:bg-agreen hover:bg-opacity-20">
                    Donate as a Company
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
