import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { useStore } from '../../store/useStore'
import { Card, CardHeader, CardTitle } from '../common/Card'

/**
 * PriceTrendChart Component - Line chart showing price trends
 * Displays 7-day historical price comparison between own price and competitor price
 * Features:
 * - Interactive line chart with Recharts
 * - Smooth animations
 * - Hover tooltips with formatted currency
 * - Color-coded lines (purple for own, orange for competitor)
 * - Responsive container
 * - Handles missing data gracefully
 * 
 * Data source:
 * - Selected product from store, or first product if none selected
 * - Uses priceHistory array with date, price, competitor fields
 */
export const PriceTrendChart = () => {
  const selectedProduct = useStore((state) => state.selectedProduct)
  const products = useStore((state) => state.products)

  // Use selected product, fallback to first product
  const product = selectedProduct || products[0]

  // Handle missing data
  if (!product || !product.priceHistory) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price Trend Analysis</CardTitle>
        </CardHeader>
        <div className="h-80 flex items-center justify-center">
          <p className="text-text-secondary">No data available</p>
        </div>
      </Card>
    )
  }

  // Transform price history for chart
  const chartData = product.priceHistory.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric'
    }),
    'Our Price': item.price,
    'Competitor Price': item.competitor,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Trend: {product.name}</CardTitle>
      </CardHeader>

      {/* Recharts ResponsiveContainer */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          {/* Grid background */}
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

          {/* X Axis - Dates */}
          <XAxis
            dataKey="date"
            stroke="#cbd5e1"
            style={{ fontSize: '12px' }}
          />

          {/* Y Axis - Price */}
          <YAxis
            stroke="#cbd5e1"
            style={{ fontSize: '12px' }}
            label={{ value: 'Price (Rs.)', angle: -90, position: 'insideLeft' }}
          />

          {/* Tooltip on hover */}
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f8fafc',
            }}
            formatter={(value) => `Rs.${value.toFixed(0)}`}
          />

          {/* Legend */}
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />

          {/* Own Price Line - Purple */}
          <Line
            type="monotone"
            dataKey="Our Price"
            stroke="#a78bfa"
            strokeWidth={3}
            dot={{ fill: '#a78bfa', r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={500}
          />

          {/* Competitor Price Line - Orange */}
          <Line
            type="monotone"
            dataKey="Competitor Price"
            stroke="#ff8c42"
            strokeWidth={3}
            dot={{ fill: '#ff8c42', r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
