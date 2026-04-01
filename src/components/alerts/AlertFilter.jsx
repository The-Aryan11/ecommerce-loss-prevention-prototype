import { useStore } from '../../store/useStore'

/**
 * AlertFilter Component - Severity-based alert filter buttons
 * Features:
 * - Three filter options: All, Critical, High
 * - Badge count on each filter showing matching alert count
 * - Active state highlighting
 * - Real-time count updates from store
 * - Responsive button layout
 * 
 * Filters:
 * - ALL: Shows all alerts regardless of severity
 * - CRITICAL: Shows only severity='CRITICAL' alerts
 * - HIGH: Shows only severity='HIGH' alerts
 * 
 * Button states:
 * - Active: Purple background with dark text
 * - Inactive: Dark background with border, hovers to purple border
 * 
 * Use case:
 * Users can quickly focus on critical issues by filtering the alert feed
 */
export const AlertFilter = () => {
  const alerts = useStore((state) => state.alerts)
  const filterType = useStore((state) => state.filterType)
  const setFilterType = useStore((state) => state.setFilterType)

  // Count alerts by severity
  const criticalCount = alerts.filter(
    (a) => a.severity === 'CRITICAL'
  ).length
  const highCount = alerts.filter((a) => a.severity === 'HIGH').length
  const totalCount = alerts.length

  const filters = [
    { id: 'ALL', label: 'All Alerts', count: totalCount },
    { id: 'CRITICAL', label: 'Critical', count: criticalCount },
    { id: 'HIGH', label: 'High', count: highCount },
  ]

  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setFilterType(filter.id)}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
            filterType === filter.id
              ? 'bg-accent-primary text-dark-bg'
              : 'bg-dark-card border border-dark-border text-text-secondary hover:border-accent-primary'
          }`}
        >
          {filter.label}
          <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-dark-bg/50">
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  )
}
