import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node'
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from '@remix-run/react'
import dayjs from 'dayjs'
import { Check, ChevronLeftCircle, ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Input from '~/components/shared/Input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '~/components/ui/accordion'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { Progress } from '~/components/ui/progress'
import { donateDTO } from '~/dto/campaign.dto'
import { formatMoney } from '~/lib/formatMoney'
import { formatZodErrors, IError } from '~/lib/formatZodError'
import { getFormError } from '~/lib/getFormError'
import { cn } from '~/lib/utils'
import { getCampaign } from '~/server/campaign'
import { getAllDonor } from '~/server/donorCompany.server'
import { PaymentMethod } from './admin.campaigns.create'

export async function loader({ params }: LoaderFunctionArgs) {
  const campaignId = params.campaignId as string

  try {
    const campaign = await getCampaign(parseInt(campaignId), false)
    const companies = await getAllDonor('VERIFIED')

    return json({
      campaign: campaign.campaign,
      companies: companies.companies,
      campaignId: parseInt(campaignId),
    })
  } catch (error) {
    return redirect('/campaigns')
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const fullname = formData.get('fullname')
  const email = formData.get('email')
  const amount = (formData.get('amount') as string).length
    ? formData.get('amount')
    : '0'
  const companyId = formData.get('companyId')
  const isGiftAided = formData.get('isGiftAided') === 'on' // Convert checkbox value to boolean
  const isMyOwnMoney = formData.get('isMyOwnMoney') === 'on' // Convert checkbox value to boolean
  const isCompanyMoney = formData.get('isCompanyMoney') === 'on' // Convert checkbox value to boolean
  const address = formData.get('address') ?? ''
  const donorType = formData.get('donorType')

  try {
    console.log({
      fullname,
      email,
      amount: parseFloat(amount as string),
      companyId: companyId ? parseInt(companyId as string) : undefined, // Convert to number if exists
      isGiftAided,
      isMyOwnMoney,
      isCompanyMoney,
      address,
      donorType,
    })
    const result = donateDTO.parse({
      fullname,
      email,
      amount: parseFloat(amount as string),
      companyId: companyId ? parseInt(companyId as string) : undefined, // Convert to number if exists
      isGiftAided,
      isMyOwnMoney,
      isCompanyMoney,
      address,
      donorType,
    })

    return json({
      errors: [] as IError[],
      response: '',
      success: true,
      result,
    })
  } catch (error: any) {
    return json({
      errors: formatZodErrors(error.errors),
      response: 'Validation Errors',
      success: false,
      result: null,
    })
  }
}

export default function DonateCampaign() {
  const { campaign, companies, campaignId } = useLoaderData<typeof loader>()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [searchParam, setSearchParam] = useSearchParams()

  const [isAided, setIsAided] = useState(false)
  const router = useNavigate()

  const actionData = useActionData<typeof action>()

  useEffect(() => {
    if (actionData && !actionData.success) {
      toast.error(actionData.response)
    }
  }, [actionData])

  function createOrder() {
    if (!actionData?.result) return ''
    return fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...actionData.result,
      }),
    })
      .then((response) => response.json())
      .then((order) => {
        return order.id as string
      })
  }

  function onApprove(data: any) {
    if (!actionData?.result) return
    return fetch('/capture-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: data.orderID,
        campaignId,
        ...actionData.result,
      }),
    })
      .then((response) => response.json())
      .then((orderData) => {
        if (orderData.status === 'COMPLETED') {
          router(orderData.redirectUrl)
        } else {
          alert('Payment was not successful')
        }
      })
  }

  const donorType = searchParam.get('type') ?? 'individual'
  return (
    <main className="w-[full] overflow-y-hidden bg-white p-6 lg:grid lg:h-screen lg:grid-cols-2 lg:bg-[#fbf8f6] lg:p-0">
      <div className="relative lg:flex-shrink-0 lg:bg-[#fbf8f6] lg:pl-16 lg:pt-8">
        <Link className="absolute top-16" to="/campaigns">
          <ChevronLeftCircle className="size-[35px]" />
        </Link>

        <div className="lg:mt-[px]">
          <div className="box-sh mx-auto flex max-w-[450px] flex-col rounded-[20px] bg-white p-[30px]">
            <Link to={`/campaigns/${campaign.id}`}>
              <h3 className="mb-5 line-clamp-1 text-2xl font-bold">
                {campaign.title}
              </h3>
            </Link>
            <div className="relative h-[165px] w-full overflow-hidden rounded-[10px] lg:h-[390px]">
              <img
                className="h-full w-full object-cover"
                src={campaign.image as string}
              />

              <p className="absolute left-[10px] top-[10px] rounded-full bg-[#191919] bg-opacity-20 px-[7px] py-[5px] text-[8px] font-bold text-white">
                {dayjs(campaign.createdAt).format('DD MMM, YYYY')}
              </p>
            </div>
            <div className="mt-[15px] flex flex-1 flex-col justify-between pl-[5px]">
              <div className="mt-[14px] lg:mt-5">
                <p className="mb-[10px] text-sm font-bold text-[#4D5061] lg:mb-[15px]">
                  Target: {formatMoney(campaign.targetAmount)}
                </p>
                <Progress
                  value={
                    (campaign.totalPaymentsRaised / campaign.targetAmount) * 100
                  }
                  className="mb-[10px] h-2 lg:mb-[7px]"
                />
                <div className="flex items-center justify-between pb-[10px]">
                  <p className="text-xs text-[#7C8293] lg:font-bold">
                    {formatMoney(campaign.totalPaymentsRaised)} raised
                  </p>
                  <p className="text-xs text-[#7C8293] lg:font-bold">
                    {(
                      (campaign.totalPaymentsRaised / campaign.targetAmount) *
                      100
                    ).toFixed(0)}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative lg:h-full lg:flex-shrink-0 lg:overflow-y-scroll lg:bg-white lg:shadow-lg">
        {(!actionData || !actionData.success) && (
          <Form method="POST">
            <input className="hidden" name="donorType" value={donorType} />
            <div className={`mx-auto mt-[70px] h-full max-w-[400px]`}>
              <h3 className="text-center text-2xl font-bold">
                You’re donating to{' '}
              </h3>
              <h3 className="line-clamp-1 text-center text-2xl font-bold text-agreen">
                {campaign.title}
              </h3>

              <div className="mx-auto mt-[30px] max-w-[530px]">
                {donorType == 'company' && (
                  <div>
                    <p className="mb-3">
                      What company are you donating on behalf of?
                    </p>

                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          {value
                            ? companies.find(
                                (company) => company.id.toString() === value
                              )?.name
                            : 'Select company...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="!w-[400px] p-0">
                        <Command>
                          <CommandInput
                            name="companyId"
                            placeholder="Search company..."
                          />
                          <CommandList>
                            <CommandEmpty>No company found.</CommandEmpty>
                            <CommandGroup>
                              {companies.map((company) => (
                                <CommandItem
                                  key={company.id}
                                  value={company.id?.toString()}
                                  onSelect={(currentValue) => {
                                    setValue(
                                      currentValue === value ? '' : currentValue
                                    )
                                    setOpen(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      value === company.id.toString()
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {company.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <input className="hidden" value={value} name="companyId" />
                    {getFormError('companyId', actionData?.errors) && (
                      <p className="mb-1 text-xs text-red-500">
                        {getFormError('companyId', actionData?.errors)}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-5">
                  <p className="mb-3">Full Name</p>
                  <Input
                    label="Full name"
                    type="text"
                    name={'fullname'}
                    error={getFormError('fullname', actionData?.errors)}
                  />
                </div>

                <div className="mt-5">
                  <p className="mb-3">Email</p>
                  <Input
                    label="Email"
                    type="email"
                    name={'email'}
                    error={getFormError('email', actionData?.errors)}
                  />
                </div>

                <div className="mt-5">
                  <p className="mb-3">Donation Amount</p>

                  <div className="flex overflow-hidden rounded-[10px] border">
                    <div className="bg-[#D0D5DD4D] py-4 pl-5 pr-4">
                      <p>GBP</p>
                    </div>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="flex-1 px-4 outline-none"
                      name="amount"
                    />
                  </div>
                  {getFormError('amount', actionData?.errors) && (
                    <p className="text-xs text-red-500">
                      {getFormError('amount', actionData?.errors)}
                    </p>
                  )}
                </div>

                {donorType == 'company' ? (
                  <div>
                    <div className="mt-10 flex items-start gap-2">
                      <Checkbox name="isCompanyMoney" />
                      <p className="text-sm">
                        I am approved to make this transfer from company's funds
                        and I am not receiving anything in return for this
                        donation.
                      </p>
                    </div>

                    {getFormError('isCompanyMoney', actionData?.errors) && (
                      <p className="text-xs text-red-500">
                        {getFormError('isCompanyMoney', actionData?.errors)}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="mt-10 flex items-start gap-2">
                      <Checkbox
                        name="isGiftAided"
                        onCheckedChange={(v) => setIsAided((i) => !i)}
                      />
                      <p className="text-sm">Gift Aid my donation</p>
                    </div>
                    <Accordion
                      value={isAided ? 'item-1' : ''}
                      type="single"
                      collapsible
                    >
                      <AccordionItem value="item-1" className="border-none">
                        <AccordionContent className="border-none">
                          <div className="mt-5">
                            <p className="mb-3">Address</p>
                            <Input
                              label="Address"
                              type="text"
                              name={'address'}
                              error={getFormError('address', [])}
                            />
                            {getFormError('address', actionData?.errors) && (
                              <p className="text-xs text-red-500">
                                {getFormError('address', actionData?.errors)}
                              </p>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <div>
                      <div className="mt-3 flex items-start gap-2">
                        <Checkbox name="isMyOwnMoney" />
                        <p className="text-sm">
                          This donation is my own money. I am not receiving
                          anything in return for this donation
                        </p>
                      </div>
                      {getFormError('isMyOwnMoney', actionData?.errors) && (
                        <p className="text-xs text-red-500">
                          {getFormError('isMyOwnMoney', actionData?.errors)}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div className="box-sh mt-5 rounded-[20px] p-5">
                  <p className="text-sm font-bold">Accepted Payment Methods</p>
                  <div className="mt-[14px] grid grid-cols-2 gap-3">
                    {PaymentMethod.filter((p) =>
                      campaign.acceptPaymentMethods.includes(p.value as any)
                    ).map(({ Icon, name }) => (
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
                <div className="flex justify-between lg:pb-[50px] lg:pt-[30px]">
                  <Link to="/campaigns">
                    <button
                      type="button"
                      className="rounded-full border-2 border-agreen px-[54px] py-3 font-bold text-agreen"
                    >
                      Back
                    </button>
                  </Link>

                  <button className="rounded-full border-2 border-agreen bg-agreen px-[54px] py-3 font-bold text-white">
                    Donate
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}

        {actionData?.success && (
          <div className="mx-auto mt-10 max-w-[400px]">
            <h3 className="text-center text-2xl font-bold">
              You’re donating to{' '}
            </h3>
            <h3 className="mb-5 line-clamp-1 text-center text-2xl font-bold text-agreen">
              {campaign.title}
            </h3>

            <PayPalScriptProvider
              options={{
                clientId:
                  'AZZgi2S2kGx6SdfK9oagFIvvdesDXb3K2zuvHr6c4DzQTVghcBbGmYCFqhwMquPL8OKCaEhx_kOUhubf',
                currency: 'GBP',
                intent: 'capture',
              }}
            >
              <PayPalButtons
                createOrder={createOrder as any}
                onApprove={onApprove as any}
                style={{ layout: 'horizontal' }}
              />
            </PayPalScriptProvider>
          </div>
        )}
      </div>
    </main>
  )
}
