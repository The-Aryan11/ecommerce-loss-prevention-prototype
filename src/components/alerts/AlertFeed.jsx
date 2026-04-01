import { AlertCircle, XCircle, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useStore } from '../../store/useStore'
import { Badge } from '../common/Badge'
import { Card } from '../common/Card'
import { formatCurrency, formatDate } from '../../utils/formatters'

/**
 * AlertFeed Component - Displays list of action items and alerts
 * Features:
 * - Displays filtered alerts with full details
 * - Empty state when no alerts
 * - Severity-based color coding (red for critical, orange for high)
 * - Action buttons with loading state (1.5s simulated latency)
 * - Toast notifications on success
 * - Dismiss button for each alert
 * - Fade-in animation on load
 * - Shows current price, suggested price, and revenue impact
 * - Timestamp in human-readable format (Today/Yesterday/Date)
 * 
 * Alert fields displayed:
 * - Title and severity badge
 * - Description of the issue
 * - Current price vs suggested price
 * - Revenue impact (positive/negative in color)
 * - Created timestamp
 * - Action button if actionRequired flag is true
 * 
 * User interactions:
 * - "Match Price" button: Updates product price with loading state
 *   - Shows spinner for 1.5 seconds (network latency simulation)
 *   - Displays green success toast on completion
 *   - Updates store state with new price
 * - Dismiss (X) button: Removes alert from feed
 *   - Shows subtle dismissal toast
 */
export const AlertFeed = () => {
  const filteredAlerts = useStore((state) => state.filteredAlerts)
  const dismissAlert = useStore((state) => state.dismissAlert)
  const matchPrice = useStore((state) => state.matchPrice)

  // Track loading state per alert
  const [loadingAlertId, setLoadingAlertId] = useState(null)

  /**
   * Handle price match with loading state
   * Simulates 1.5 second network latency
   * @param {string} alertId - Alert ID
   * @param {string} productId - Product ID
   * @param {number} newPrice - New price to set
   * @param {string} productName - Product name for toast
   */
  const handleMatchPrice = async (alertId, productId, newPrice, productName) => {
    // Start loading state
    setLoadingAlertId(alertId)

    // Show loading toast
    const loadingToast = toast.loading(
      'Updating price on Flipkart API...',
      {
        id: `price-update-${alertId}`,
      }
    )

    // Simulate network latency (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update price in store
    matchPrice(productId, newPrice)

    // Dismiss loading toast and show success
    toast.dismiss(loadingToast)
    toast.success(
      `✅ Successfully updated ${productName} to ${formatCurrency(newPrice)}`,
      {
        duration: 4000,
        id: `price-success-${alertId}`,
      }
    )

    // End loading state
    setLoadingAlertId(null)
  }

  /**
   * Handle alert dismissal
   * @param {string} alertId - Alert ID to dismiss
   */
  const handleDismissAlert = (alertId) => {
    dismissAlert(alertId)
    toast.success('✓ Alert dismissed', {
      duration: 2000,
      style: {
        background: '#1e293b',
        color: '#cbd5e1',
        border: '1px solid #334155',
      },
    })
  }

  // Empty state
  if (filteredAlerts.length === 0) {
    return (
      <Card className="text-center py-12">
        <CheckCircle2 size={48} className="mx-auto text-neon-green mb-4" />
        <h3 className="text-xl font-bold text-text-primary mb-2">All Clear!</h3>
        <p className="text-text-secondary">
          No alerts to address at the moment.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {filteredAlerts.map((alert) => (
        <div
          key={alert.id}
          className="card-elevated p-5 rounded-lg border-l-4 border-accent-primary hover:border-neon-red transition-all duration-200 animate-fade-in"
        >
          <div className="flex items-start justify-between mb-3">
            {/* Alert Content */}
            <div className="flex items-start gap-4 flex-1">
              {/* Icon */}
              <div className="mt-1">
                {alert.severity === 'CRITICAL' ? (
                  <AlertCircle size={24} className="text-neon-red" />
                ) : (
                  <AlertCircle size={24} className="text-neon-orange" />
                )}
              </div>

              {/* Alert Details */}
              <div className="flex-1">
                {/* Title and Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-text-primary">
                    {alert.title}
                  </h3>
                  <Badge
                    variant={
                      alert.severity === 'CRITICAL' ? 'critical' : 'warning'
                    }
                  >
                    {alert.severity}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary mb-3">
                  {alert.description}
                </p>

                {/* Price and Impact Grid */}
                <div className="grid grid-cols-3 gap-4 text-xs mb-4">
                  {/* Current Price */}
                  <div>
                    <p className="text-text-secondary">Current Price</p>
                    <p className="font-bold text-text-primary">
                      {formatCurrency(alert.currentPrice)}
                    </p>
                  </div>

                  {/* Suggested Price */}
                  <div>
                    <p className="text-text-secondary">Suggested Price</p>
                    <p className="font-bold text-neon-red">
                      {formatCurrency(alert.suggestedPrice)}
                    </p>
                  </div>

                  {/* Revenue Impact */}
                  <div>
                    <p className="text-text-secondary">Revenue Impact</p>
                    <p
                      className={`font-bold ${
                        alert.revenueImpact < 0
                          ? 'text-neon-red'
                          : 'text-neon-green'
                      }`}
                    >
                      {formatCurrency(alert.revenueImpact)}
                    </p>
                  </div>
                </div>

                {/* Timestamp */}
                <p className="text-xs text-text-secondary/70">
                  {formatDate(alert.createdAt)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 ml-4">
              {/* Match Price Button with Loading State */}
              {alert.actionRequired && (
                <button
                  onClick={() =>
                    handleMatchPrice(
                      alert.id,
                      alert.productId,
                      alert.suggestedPrice,
                      alert.productName
                    )
                  }
                  disabled={loadingAlertId === alert.id}
                  className={`text-xs whitespace-nowrap px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                    loadingAlertId === alert.id
                      ? 'bg-accent-primary/50 text-dark-bg/70 cursor-not-allowed'
                      : 'btn-primary hover:scale-105 active:scale-95'
                  }`}
                  title="Update product price to suggested price"
                >
                  {loadingAlertId === alert.id ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Updating...</span>
                    </>
                  ) : (
                    'Match Price'
                  )}
                </button>
              )}

              {/* Dismiss Button */}
              <button
                onClick={() => handleDismissAlert(alert.id)}
                className="p-2 hover:bg-dark-bg rounded-lg transition-all duration-200"
                title="Dismiss this alert"
              >
                <XCircle size={18} className="text-text-secondary" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
