import { Home, AlertCircle, BarChart3, Settings } from 'lucide-react'
import { useStore } from '../../store/useStore'

/**
 * Sidebar Navigation Component
 * Displays main navigation menu with badge indicators
 * Features:
 * - Navigation tabs (Dashboard, Alerts, Products)
 * - Critical alert count badge
 * - Settings button
 * - Sticky positioning
 */
export const Sidebar = ({ activeTab, setActiveTab }) => {
  const alerts = useStore((state) => state.alerts)
  const criticalCount = alerts.filter((a) => a.severity === 'CRITICAL').length

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'alerts', label: 'Alerts', icon: AlertCircle, badge: criticalCount },
    { id: 'products', label: 'Products', icon: BarChart3 },
  ]

  return (
    <aside className="w-64 bg-dark-card border-r border-dark-border h-screen flex flex-col p-6 sticky top-0">
      {/* Branding */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gradient">LOSS PREVENTION</h1>
        <p className="text-xs text-text-secondary mt-1">
          E-Commerce Intelligence Suite
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-accent-primary text-dark-bg'
                  : 'text-text-secondary hover:bg-dark-bg'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />
                <span>{item.label}</span>
              </div>

              {/* Badge for critical alerts */}
              {item.badge > 0 && (
                <span className="px-2 py-1 text-xs font-bold bg-neon-red text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Settings Section */}
      <div className="border-t border-dark-border pt-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-dark-bg transition-all duration-200">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </aside>
  )
}
