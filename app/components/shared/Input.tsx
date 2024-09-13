import { useRef, useState } from 'react'
import { EyeClose, EyeOpen } from './icons'

export default function Input({
  label,
  type,
  name,
  error,
  callback,
  disabled,
  defaultValue,
}: {
  label: string
  type: string
  name: string
  error?: string
  callback?: (val: string) => void
  disabled?: boolean
  defaultValue?: string | Date | number
}) {
  const [value, setValue] = useState(defaultValue ?? '')
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  const togglePassword = () => {
    setIsOpen((iso) => !iso)
  }

  return (
    <div className="flex-1">
      <div
        className={`input-group font-poppins flex flex-1 rounded-[10px] border border-[#667085] ${
          (value as any)?.length > 0 ? 'isFilled' : ''
        } ${disabled ? 'bg-[#f1f2f5]' : ''} `}
      >
        <input
          ref={ref}
          value={value as any}
          onChange={(e) => {
            setValue(e.target.value)
            callback?.(e.target.value)
          }}
          type={isOpen ? 'text' : type}
          className="w-full"
          name={name}
          disabled={disabled}
        />
        <label className="">{label}</label>

        {type == 'password' &&
          (isOpen ? (
            <EyeClose cursor="pointer" onClick={togglePassword} />
          ) : (
            <EyeOpen cursor="pointer" onClick={togglePassword} />
          ))}
      </div>
      {(error?.length as number) > 0 && (
        <p className="font-montserrat mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}
