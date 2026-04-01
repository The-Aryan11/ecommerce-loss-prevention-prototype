import { useStore } from '../../store/useStore'
import { RiskGauge } from '../common/RiskGauge'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from '../common/Card'

/**
 * PortfolioRiskGauge Component - Overall portfolio risk indicator
 * Displays the combined risk score for the entire product portfolio
 * Features:
 * - Animated risk gauge (0-100 scale)
 * - Color-coded risk levels:
 *   - Red (80+): CRITICAL
 *   - Orange (60-79): HIGH
 *   - Purple (40-59): MEDIUM
 *   - Green (<40): LOW
 * - Last sync timestamp
 * - Sync frequency information
 * - Centered layout in card
 * 
 * Risk Score Calculation:
 * Based on:
 * - Price undercutting percentage across portfolio
 * - Inventory expiry risk for products
 * - Sales velocity impact on perishable inventory
 */
export const PortfolioRiskGauge = () => {
  const metrics = useStore((state) => state.metrics)

  return (
    <Card className="flex flex-col items-center justify-center min-h-80">
      {/* Header */}
      <CardHeader className="text-center">
        <CardTitle>Portfolio Risk Score</CardTitle>
        <CardDescription>
          Based on price undercutting & inventory expiry risk
        </CardDescription>
      </CardHeader>

      {/* Animated Gauge */}
      <RiskGauge score={metrics.portfolioRiskScore} animated={true} />

      {/* Footer with sync info */}
      <div className="mt-6 text-center text-xs text-text-secondary border-t border-dark-border pt-6 w-full">
        <p>
          Last updated:{' '}
          {new Date(metrics.lastSyncTime).toLocaleTimeString('en-IN')}
        </p>
        <p className="mt-1">Sync frequency: {metrics.syncFrequency}</p>
      </div>
    </Card>
  )
}
