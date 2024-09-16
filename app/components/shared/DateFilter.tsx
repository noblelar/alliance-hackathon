import { useSearchParams } from '@remix-run/react'
import { CalendarDaysIcon } from 'lucide-react'
import { useState } from 'react'
import { Calendar } from '~/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export default function DateFilter() {
  const [selected, setSelected] = useState<Date | undefined>(new Date())
  const [searchParam, setSearchParams] = useSearchParams()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-4 rounded-full border border-black px-6 py-3">
          <CalendarDaysIcon />
          Jan 2021 - Dec 2021
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(d) => {
            setSelected(d)
            searchParam.set('date', d?.toISOString()!)
            setSearchParams(searchParam)
          }}
          disabled={(date) => date < new Date('1900-01-01')}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
