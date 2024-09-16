import { Cell, Pie, PieChart } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig

// Colors for each segment
const COLORS = ['#eaaf30', '#00c78b'] // Red for Ended, Blue for Published

// Custom label component to display the total in the center

const DonationTypesChart = ({
  data,
}: {
  data: { name: string; value: number }[]
}) => {
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx
    const y = cy

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xl font-bold"
      >
        {`${data.reduce((acc, entry) => acc + entry.value, 0)}`}{' '}
        {/* Total Value */}
      </text>
    )
  }
  return (
    <ChartContainer config={chartConfig} className="min-h-[321px] w-full">
      <PieChart>
        <Pie
          data={data}
          cx="50%" // Center X
          cy="50%" // Center Y
          innerRadius={80}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          labelLine={false}
          label={renderCustomLabel} // Custom label to display total
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend />
      </PieChart>
    </ChartContainer>
  )
}

export default DonationTypesChart
