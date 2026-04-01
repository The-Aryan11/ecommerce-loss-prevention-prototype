import { Sidebar } from '../components/common/Sidebar'
import { TopBar } from '../components/common/TopBar'

/**
 * MainLayout Component - Primary application layout wrapper
 * Provides the main structure for all pages with sidebar and top navigation
 * Features:
 * - Two-column layout (sidebar + main content)
 * - Sticky sidebar navigation
 * - Fixed top bar with navigation
 * - Scrollable main content area
 * - Responsive design
 * - Dark theme styling
 * 
 * Layout structure:
 * ┌─────────────────────────────────────┐
 * │          TopBar (sticky)            │
 * ├──────────┬────────────────────────┤
 * │          │                        │
 * │ Sidebar  │    Main Content        │
 * │(sticky)  │   (scrollable)         │
 * │          │                        │
 * └──────────┴────────────────────────┘
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content to render
 * @param {string} props.activeTab - Currently active tab ('dashboard', 'alerts', 'products')
 * @param {Function} props.setActiveTab - Callback to change active tab
 */
export const MainLayout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex h-screen bg-dark-bg">
      {/* Sidebar Navigation - Sticky */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar - Sticky */}
        <TopBar />

        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
