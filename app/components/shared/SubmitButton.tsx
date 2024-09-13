import { useNavigation } from '@remix-run/react'

export default function SubmitButton({
  label,
  className,
}: {
  label: string
  className: string
}) {
  const isLoading = useNavigation().state == 'submitting'

  return (
    <button disabled={isLoading} className={className}>
      {isLoading ? 'Loading...' : label}
    </button>
  )
}
