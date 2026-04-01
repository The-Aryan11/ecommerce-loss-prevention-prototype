/**
 * Format a number as Indian currency (Rs.)
 * @param {number} value - Value to format
 * @param {string} currency - Currency symbol (default: 'Rs.')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'Rs.') => {
  if (!value && value !== 0) return 'Rs.0'
  return currency + new Intl.NumberFormat('en-IN').format(value.toFixed(0))
}

/**
 * Format a number with K (thousands) or M (millions) suffix
 * @param {number} value - Value to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (value) => {
  if (!value && value !== 0) return '0'
  if (Math.abs(value) >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M'
  }
  if (Math.abs(value) >= 1000) {
    return (value / 1000).toFixed(1) + 'K'
  }
  return value.toFixed(0)
}

/**
 * Format a decimal number as percentage
 * @param {number} value - Value to format (0-100)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value) => {
  if (!value && value !== 0) return '0%'
  return value.toFixed(1) + '%'
}

/**
 * Format a date string as human-readable text
 * Shows "Today" or "Yesterday" for recent dates
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return `Today, ${date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    })}`
  }

  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    })}`
  }

  return date.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

/**
 * Calculate risk color based on risk score
 * @param {number} score - Risk score (0-100)
 * @returns {string} Color name ('neon-red', 'neon-orange', 'neon-purple', 'neon-green')
 */
export const calculateRiskColor = (score) => {
  if (score >= 80) return 'neon-red'
  if (score >= 60) return 'neon-orange'
  if (score >= 40) return 'neon-purple'
  return 'neon-green'
}

/**
 * Get human-readable risk level label
 * @param {number} score - Risk score (0-100)
 * @returns {string} Risk level ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')
 */
export const getRiskLevel = (score) => {
  if (score >= 80) return 'CRITICAL'
  if (score >= 60) return 'HIGH'
  if (score >= 40) return 'MEDIUM'
  return 'LOW'
}

/**
 * Calculate days until expiry
 * @param {string} expiryDate - Expiry date ISO string
 * @returns {number} Days until expiry (0 if already expired)
 */
export const calculateDaysToExpiry = (expiryDate) => {
  const today = new Date()
  const expiry = new Date(expiryDate)
  const diffTime = expiry - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
}

/**
 * Get badge CSS class based on alert severity
 * @param {string} severity - Severity level ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')
 * @returns {string} CSS class name
 */
export const getSeverityBadgeClass = (severity) => {
  switch (severity) {
    case 'CRITICAL':
      return 'badge-critical'
    case 'HIGH':
      return 'badge-warning'
    case 'MEDIUM':
      return 'badge-warning'
    case 'LOW':
      return 'badge-success'
    default:
      return 'badge-success'
  }
}

/**
 * Get text color class based on price match status
 * @param {string} status - Price match status
 * @returns {string} Text color class
 */
export const getPriceMatchStatusColor = (status) => {
  switch (status) {
    case 'CRITICAL_UNDERCUT':
    case 'CRITICAL_EXPIRY':
    case 'CRITICAL_UNDERCUT_AND_EXPIRY':
      return 'text-neon-red'
    case 'UNDERCUT':
      return 'text-neon-orange'
    case 'MATCHED':
      return 'text-neon-green'
    case 'SAFE':
      return 'text-neon-green'
    default:
      return 'text-text-secondary'
  }
}

/**
 * Calculate potential revenue loss for a product
 * @param {number} currentPrice - Current selling price
 * @param {number} competitorPrice - Competitor price
 * @param {number} inventoryQuantity - Quantity in stock
 * @param {number} salesVelocity - Units sold per day
 * @returns {number} Estimated daily revenue loss
 */
export const calculateRevenueLoss = (currentPrice, competitorPrice, inventoryQuantity, salesVelocity) => {
  const priceDiff = currentPrice - competitorPrice
  if (priceDiff <= 0) return 0
  return priceDiff * Math.min(salesVelocity, inventoryQuantity)
}

/**
 * Determine if a product is critically undercut
 * @param {number} percentage - Price undercut percentage
 * @returns {boolean} True if critically undercut (> 20%)
 */
export const isCriticallyUndercut = (percentage) => {
  return percentage > 20
}

/**
 * Determine if stock is expiring soon
 * @param {number} daysToExpiry - Days until expiry
 * @returns {boolean} True if expiring within 30 days
 */
export const isExpiringSoon = (daysToExpiry) => {
  return daysToExpiry <= 30 && daysToExpiry > 0
}
