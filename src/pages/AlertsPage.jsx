import { AlertFilter } from '../components/alerts/AlertFilter'
import { AlertFeed } from '../components/alerts/AlertFeed'
import { Card, CardHeader, CardTitle } from '../components/common/Card'
import { useStore } from '../store/useStore'
import { formatCurrency } from '../utils/formatters'

/**
 * AlertsPage Component - Alerts and action items view
 * Displays all critical and high-priority alerts requiring user action
 * Features:
 * - Summary metrics (total alerts, revenue at risk, action items)
 * - Filterable alert feed by severity
 * - Real-time alert count updates
 * - Action buttons for each alert
 * - Alert dismissal capability
 * 
 * Layout:
 * ┌─────────────────────────────────┐
 * │   Summary Metrics (3 cards)     │
 * ├─────────────────────────────────┤
 * │        Alert Feed               │
 * │  ┌─────────────────────────┐   │
 * │  │  Filter Buttons         │   │
 * │  ├─────────────────────────┤   │
 * │  │  Alert List             │   │
 * │  │  - Alert 1              │   │
 * │  │  - Alert 2              │   │
 * │  │  - Alert 3              │   │
 * │  └─────────────────────────┘   │
 * └─────────────────────────────────┘
 * 
 * Summary Cards:
 * 1. Total Alerts - Combined critical + high alerts
 * 2. Revenue at Risk - Total revenue threatened by current alerts
 * 3. Action Items - Alerts requiring immediate action
 * 
 * Filter Options:
 * - All Alerts - Shows all alerts
 * - Critical - Shows only critical severity alerts
 * - High - Shows only high severity alerts
 */
export const AlertsPage = () => {
  const metrics = useStore((state) => state.metrics)

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Alerts Card */}
        <Card>
          <p className="text-xs text-text-secondary font-semibold uppercase">
            Total Alerts
          </p>
          <h3 className="text-3xl font-bold text-text-primary mt-2">
            {metrics.criticalAlerts + metrics.highAlerts}
          </h3>
        </Card>

        {/* Revenue at Risk Card */}
        <Card>
          <p className="text-xs text-text-secondary font-semibold uppercase">
            Revenue at Risk
          </p>
          <h3 className="text-3xl font-bold text-neon-red mt-2">
            {formatCurrency(metrics.revenueAtRisk)}
          </h3>
        </Card>

        {/* Action Items Card */}
        <Card>
          <p className="text-xs text-text-secondary font-semibold uppercase">
            Action Items
          </p>
          <h3 className="text-3xl font-bold text-neon-orange mt-2">
            {metrics.criticalAlerts + metrics.highAlerts}
          </h3>
        </Card>
      </div>

      {/* Alert Feed Section */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Feed</CardTitle>
        </CardHeader>

        <div>
          {/* Alert Filter Buttons */}
          <AlertFilter />

          {/* Alert List */}
          <AlertFeed />
        </div>
      </Card>
    </div>
  )
}
