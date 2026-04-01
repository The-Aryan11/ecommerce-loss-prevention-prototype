import { useState } from 'react'
import { MainLayout } from './layouts/MainLayout'
import { DashboardPage } from './pages/DashboardPage'
import { AlertsPage } from './pages/AlertsPage'
import { ProductsPage } from './pages/ProductsPage'
import { ToastProvider } from './providers/ToastProvider'

/**
 * App Component - Main application root with toast provider
 * Manages overall application state and routing
 * Features:
 * - Tab-based navigation (Dashboard, Alerts, Products)
 * - Global toast notification system
 * - Centralized state management via activeTab
 * - Page switching based on active tab
 * - MainLayout wrapper for consistent navigation
 * 
 * Navigation Flow:
 * User clicks Sidebar button → setActiveTab updates state → 
 * renderPage() switches pages → MainLayout displays new page
 * 
 * Available pages:
 * 1. Dashboard - KPI metrics, price trends, portfolio risk
 * 2. Alerts - Critical alerts, action items, revenue at risk
 * 3. Products - Product portfolio, pricing, expiry tracking
 * 
 * Toast notifications:
 * - Success: Green neon border, auto-dismiss 3s
 * - Error: Red neon border, auto-dismiss 4s
 * - Loading: Purple neon border, persists until dismissed
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  /**
   * Render the appropriate page based on active tab
   * @returns {React.ReactNode} Page component
   */
  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />
      case 'alerts':
        return <AlertsPage />
      case 'products':
        return <ProductsPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <>
      {/* Global Toast Provider */}
      <ToastProvider />

      {/* Main Application Layout */}
      <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderPage()}
      </MainLayout>
    </>
  )
}
