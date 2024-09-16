import { Form, Link, useParams } from '@remix-run/react'
import { ChevronDown, ChevronLeftCircle } from 'lucide-react'
import Input from '~/components/shared/Input'
// import NavBar from '~/components/ui/NavBar'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Label } from '~/components/ui/label'
import { Progress } from '~/components/ui/progress'
import { getFormError } from '~/lib/getFormError'
import { PaymentMethod } from './admin.campaigns.create'

export default function CampaignDetails() {
  const [displayOther, setDisplayOther] = useState(false)

  const { id } = useParams()
  return (
    <>
      <div className="flex lg:h-[100vh]">
        <div className="flex-1 bg-primary/5 p-[50px] pb-20">
          <Link className={'absolute'} to={'/campaigns'}>
            <ChevronLeftCircle className="size-[35px]" />
          </Link>
          <div className="m-auto flex h-full w-[75%]">
            <div className="box-sh my-auto rounded-[20px] bg-white p-[30px]">
              <h1 className="text-[20px] font-bold text-[#333] lg:text-2xl">
                Support Annie’s Cancer Treatment
              </h1>

              <div className="flex flex-col gap-[25px] lg:flex-row">
                <div className="lg:flex-[1.5]">
                  <img
                    className="mt-5 h-[229px] w-full rounded-[20px] object-cover lg:h-[250px]"
                    src="https://s3-alpha-sig.figma.com/img/4f4b/43e7/9e4bb24cd49fc410c89045988af9d938?Expires=1727049600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aiBzVnAt1RiQXxmr3cGq~A3yc9pyZyhnVTUTYZkKv4bJ432hUOm2BWG-FCDRWPjWagnl0UOaJjN8DHpbUcp3ZgbZOdupSNp5BLqjNhW3a22j9TOFD2qjMiYe3hfaveG6bvfa~WHAkoRXNhYULxgBURQpB62fjaRY~Ze4Al3ZYTHYWYadejp-eaPwWK0K-WaWrQQD3VthjoP6MAbF1TcXTQSOQtHSUL51cNYF7wv05CQatclDo4Zcd7OeLmAnqDHt-uXEE1maDlc7wioCVAY7CMGM66UZDNn~2mMEjzz1lcRFM35B4FXxxclq5M2wFkh5pig8t~WhCaJ3BSEVicjMvw__"
                    alt="poster"
                  />

                  <div className="mb-8 mt-5 text-sm text-ablack lg:text-base">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut et massa mi. Aliquam in hendrerit urna. Pellentesque
                      sit amet sapien fringilla, mattis ligula consectetur,
                      ultrices mauris. Maecenas vitae mattis tellus. Nullam quis
                      imperdiet augue{' '}
                      <span>
                        ....{' '}
                        <Link
                          to={'/'}
                          className="font-semibold text-[#0085FF] underline"
                        >
                          {' '}
                          see more
                        </Link>
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-[10px] text-sm font-bold text-[#4D5061] lg:mb-[15px] lg:text-base">
                      Target: $100,000
                    </p>
                    <Progress
                      value={30}
                      className="mb-[10px] h-2 lg:mb-[7px]"
                    />
                    <div className="flex items-center justify-between pb-[10px]">
                      <p className="text-xs text-[#7C8293] lg:text-sm">
                        $23,580 raised
                      </p>
                      <p className="text-xs text-[#7C8293] lg:text-sm">25%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[50%] p-[0px]">
          <div className="flex h-full items-center justify-center rounded-[20px]">
            <Form className="flex">
              <div className="m-auto h-full max-w-[760px]">
                <div className="pb-[50px] text-center text-2xl font-bold">
                  <h3>You&apos;re Donating to</h3>
                  <h3 className="text-primary">
                    Annie&apos;s Cancer Treatment
                  </h3>
                </div>
                <div>
                  <p className="mb-5">
                    What company are you donating on behalf of?
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size={'sm'}
                        variant="outline"
                        className="input-group font-poppins flex w-full flex-1 justify-between rounded-[10px] border border-[#667085]"
                      >
                        Select company
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-full">
                      <DropdownMenuItem onClick={() => {}}>
                        Prefer not to say
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDisplayOther(true)}
                        textValue="other"
                      >
                        Other
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className={!displayOther ? 'hidden' : ''}>
                  <p className="mb-5">Other</p>
                  <Input
                    label="Enter Company name"
                    type="text"
                    name={'other'}
                    error={getFormError('other', [])}
                  />
                </div>

                <div className="mx-auto mt-[30px] max-w-[530px]">
                  <div>
                    <p className="mb-5">Email</p>
                    <Input
                      label="someone@email.com"
                      type="text"
                      name={'email'}
                      error={getFormError('email', [])}
                    />
                  </div>

                  <div className="mt-10 mx-auto max-w-[400px]">
                    <div className="flex">
                      <Checkbox name="newsletter" id="newsletter" />
                      <Label htmlFor="newsletter">
                        <p className="mb-5 pl-2 leading-5">
                          Gift Aid my donation
                        </p>
                      </Label>
                    </div>
                    <div className="flex">
                      <Checkbox name="newsletter" id="newsletter" />
                      <Label htmlFor="newsletter">
                        <p className="mb-5 pl-2 leading-5">
                          This donation is my own money. I am not receiving
                          anything in returen for this donation
                        </p>
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="box-sh mt-[25px] rounded-[20px] p-[25px]">
                  <p className="text-sm font-bold text-ablack">
                    Accepted Payment Methods
                  </p>

                  <div className="mt-[14px] grid grid-cols-2 gap-3">
                    {PaymentMethod.map(({ Icon, name }) => {
                      if (name == 'Paypal') {
                        return (
                          <div
                            className="flex items-center gap-[10px] rounded-[10px] border border-[#D0D5DD] px-[14px] py-3"
                            key={name}
                          >
                            <Icon className="size-4" />
                            <p className="text-[10px] lg:text-xs">{name}</p>
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>

                <div className="flex justify-between lg:pb-[50px] lg:pt-[87px]">
                  <Link to="/admin/campaigns">
                    <button
                      type="button"
                      className="rounded-full border-2 border-primary px-[54px] py-3 font-bold text-primary"
                    >
                      Cancel
                    </button>
                  </Link>

                  <button
                    // onClick={() => setStep(2)}
                    type="button"
                    className="rounded-full border-2 border-primary bg-primary px-[54px] py-3 font-bold text-white"
                  >
                    Donate
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
