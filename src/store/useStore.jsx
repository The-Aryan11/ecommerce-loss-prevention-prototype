import { create } from 'zustand'
import { dummyProducts, dummyAlerts, dummyMetrics } from '../data/dummyData'

/**
 * Global state management using Zustand
 * Manages:
 * - Products inventory and pricing
 * - Alerts and notifications
 * - UI state (selected product, filters)
 * - Metrics and dashboard data
 */
export const useStore = create((set) => ({
  // State
  products: dummyProducts,
  alerts: dummyAlerts,
  metrics: dummyMetrics,
  selectedProduct: null,
  filteredAlerts: dummyAlerts,
  filterType: 'ALL',

  // Actions
  /**
   * Set the currently selected product for detail view
   * @param {Object} product - Product object to select
   */
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  /**
   * Filter alerts by severity type
   * @param {string} type - Filter type: 'ALL', 'CRITICAL', 'HIGH'
   */
  setFilterType: (type) => set((state) => {
    const filtered = type === 'ALL'
      ? state.alerts
      : state.alerts.filter((alert) => alert.severity === type)
    return { filterType: type, filteredAlerts: filtered }
  }),

  /**
   * Remove an alert from the feed
   * @param {string} alertId - ID of alert to dismiss
   */
  dismissAlert: (alertId) => set((state) => ({
    alerts: state.alerts.filter((alert) => alert.id !== alertId),
    filteredAlerts: state.filteredAlerts.filter((alert) => alert.id !== alertId),
  })),

  /**
   * Update a product's price to match competitor
   * @param {string} productId - Product ID to update
   * @param {number} newPrice - New price to set
   */
  matchPrice: (productId, newPrice) => set((state) => ({
    products: state.products.map((product) =>
      product.id === productId
        ? {
            ...product,
            currentPrice: newPrice,
            priceMatchStatus: 'MATCHED'
          }
        : product
    ),
  })),

  /**
   * Get a product by ID from the store
   * @param {string} id - Product ID
   * @returns {Object} Product object or undefined
   */
  getProductById: (id) => {
    const state = useStore.getState()
    return state.products.find((p) => p.id === id)
  },
}))
