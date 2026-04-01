import { Bell, User } from 'lucide-react'
import { useStore } from '../../store/useStore'

/**
 * Top Navigation Bar Component
 * Displays page title, real-time alert indicator, and user menu
 * Features:
 * - Dynamic page title and description
 * - Notification bell with critical alert count
 * - Animated pulse on alerts
 * - User profile menu
 * - Sticky positioning
 */
export const TopBar = () => {
  const alerts = useStore((state) => state.alerts)
  const criticalCount = alerts.filter((a) => a.severity === 'CRITICAL').length

  return (
    <div className="bg-dark-card border-b border-dark-border px-8 py-4 flex items-center justify-between sticky top-0 z-40">
      {/* Page Title Section */}
      <div>
        <h2 className="text-xl font-bold">Market Intelligence Dashboard</h2>
        <p className="text-xs text-text-secondary mt-1">
          Real-time competitor monitoring & expiry risk management
        </p>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative">
          <button className="relative p-2 hover:bg-dark-bg rounded-lg transition-all duration-200">
            <Bell size={20} className="text-text-secondary" />

            {/* Critical Alert Badge */}
            {criticalCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-neon-red rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
                {criticalCount}
              </span>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-dark-border"></div>

        {/* User Menu */}
        <button className="flex items-center gap-2 hover:bg-dark-bg px-3 py-2 rounded-lg transition-all duration-200">
          <User size={18} className="text-text-secondary" />
          <span className="text-sm font-medium text-text-secondary">User</span>
        </button>
      </div>
    </div>
  )
}
