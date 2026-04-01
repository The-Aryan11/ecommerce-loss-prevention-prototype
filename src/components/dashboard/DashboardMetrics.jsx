import { TrendingDown, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { MetricCard } from '../common/MetricCard'
import { formatCurrency } from '../../utils/formatters'

/**
 * DashboardMetrics Component - KPI Summary Grid
 * Displays key performance indicators in a 4-column grid
 * Features:
 * - Total Revenue metric with trend
 * - Revenue at Risk metric with trend
 * - Critical Alerts count
 * - Prices Matched counter
 * - Real-time data from Zustand store
 * - Responsive grid layout
 * 
 * Metrics displayed:
 * 1. Total Revenue - Daily revenue generated
 * 2. Revenue at Risk - Revenue lost due to undercutting/expiry
 * 3. Critical Alerts - Number of critical issues requiring attention
 * 4. Prices Matched - Count of products matching competitor prices
 */
export const DashboardMetrics = () => {
  const metrics = useStore((state) => state.metrics)
  const alerts = useStore((state) => state.alerts)
  const products = useStore((state) => state.products)

  // Calculate number of products with matched prices
  const matchedProducts = products.filter(
    (p) => p.priceMatchStatus === 'MATCHED'
  ).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Revenue Card */}
      <MetricCard
        label="Total Revenue"
        value={formatCurrency(metrics.totalRevenue)}
        icon={TrendingUp}
        trend={8.5}
        trendPositive={true}
      />

      {/* Revenue at Risk Card */}
      <MetricCard
        label="Revenue at Risk"
        value={formatCurrency(metrics.revenueAtRisk)}
        icon={TrendingDown}
        trend={15.2}
        trendPositive={false}
      />

      {/* Critical Alerts Card */}
      <MetricCard
        label="Critical Alerts"
        value={alerts.filter((a) => a.severity === 'CRITICAL').length}
        icon={AlertCircle}
      />

      {/* Prices Matched Card */}
      <MetricCard
        label="Prices Matched"
        value={matchedProducts}
        unit={`/ ${products.length}`}
        icon={CheckCircle2}
      />
    </div>
  )
}
