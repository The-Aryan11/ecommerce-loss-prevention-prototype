/**
 * MetricCard Component - Display key metrics with icons and trends
 * Used for dashboard KPI display
 * Features:
 * - Icon display (lucide-react icons)
 * - Value with optional unit
 * - Trend indicator (up/down with percentage)
 * - Hover effects
 * - Responsive design
 * 
 * @param {Object} props
 * @param {string} props.label - Metric label/title
 * @param {string|number} props.value - Main metric value
 * @param {string} props.unit - Optional unit suffix
 * @param {React.Component} props.icon - Lucide icon component
 * @param {number} props.trend - Trend percentage
 * @param {boolean} props.trendPositive - Trend direction
 */
export const MetricCard = ({
  label,
  value,
  unit = '',
  icon: Icon,
  trend = null,
  trendPositive = false
}) => {
  return (
    <div className="card-elevated p-4 rounded-lg border border-dark-border hover:border-accent-primary transition-all duration-200">
      {/* Header with icon */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-text-secondary font-semibold uppercase tracking-wide">
            {label}
          </p>
          <h3 className="text-2xl font-bold text-text-primary mt-1">
            {value}
            {unit && (
              <span className="text-lg text-text-secondary ml-1">{unit}</span>
            )}
          </h3>
        </div>

        {/* Icon */}
        {Icon && (
          <div className="p-2 bg-dark-bg rounded-lg">
            <Icon size={20} className="text-accent-primary" />
          </div>
        )}
      </div>

      {/* Trend indicator */}
      {trend !== null && (
        <div
          className={`text-xs font-semibold flex items-center gap-1 ${
            trendPositive ? 'text-neon-green' : 'text-neon-red'
          }`}
        >
          <span>{trendPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(trend)}% vs last 24h</span>
        </div>
      )}
    </div>
  )
}
