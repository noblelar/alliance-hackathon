import { useState } from 'react'
import { Checkbox } from '../ui/checkbox'

export default function PaymentOption({
  Icon,
  name,
  value,
}: {
  name: string
  Icon: any
  value: string
}) {
  const [checked, setChecked] = useState(false)
  return (
    <div
      className={`flex w-full items-center gap-5 rounded-[10px] border px-5 py-4 ${checked ? 'border-primary' : ''}`}
    >
      <Checkbox
        name="acceptPaymentMethods"
        value={value}
        onCheckedChange={() => setChecked((i) => !i)}
      />

      <div className="flex items-center gap-3">
        <Icon className="size-[24px]" />
        <p>{name}</p>
      </div>
    </div>
  )
}
