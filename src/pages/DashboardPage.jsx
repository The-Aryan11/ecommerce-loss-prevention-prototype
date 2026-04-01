import { DashboardMetrics } from '../components/dashboard/DashboardMetrics'
import { PortfolioRiskGauge } from '../components/dashboard/PortfolioRiskGauge'
import { PriceTrendChart } from '../components/dashboard/PriceTrendChart'

/**
 * DashboardPage Component - Main dashboard view
 * Displays key metrics, portfolio risk, and price trends
 * Features:
 * - KPI metrics grid at top (4 cards)
 * - Two-column layout for charts and risk gauge
 * - Responsive grid (1 col on mobile, 3 cols on desktop)
 * - Real-time data updates from store
 * - Animated gauge and chart transitions
 * 
 * Layout:
 * ┌─────────────────────────────────┐
 * │   DashboardMetrics (4 cards)    │
 * ├─────────────────────────────────┤
 * │  PriceTrendChart   │ RiskGauge  │
 * │   (2/3 width)      │ (1/3 width)│
 * └─────────────────────────────────┘
 * 
 * Components:
 * 1. DashboardMetrics - Total Revenue, Revenue at Risk, Alerts, Matched Prices
 * 2. PriceTrendChart - 7-day price history comparison
 * 3. PortfolioRiskGauge - Overall portfolio risk score
 */
export const DashboardPage = () => {
  return (
    <div className="space-y-8">
      {/* KPI Metrics Grid */}
      <DashboardMetrics />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Trend Chart - Takes 2/3 width on desktop */}
        <div className="lg:col-span-2">
          <PriceTrendChart />
        </div>

        {/* Portfolio Risk Gauge - Takes 1/3 width on desktop */}
        <div>
          <PortfolioRiskGauge />
        </div>
      </div>
    </div>
  )
}
