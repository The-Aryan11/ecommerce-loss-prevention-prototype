import { useStore } from '../../store/useStore'
import { Card, CardHeader, CardTitle } from '../common/Card'
import { formatCurrency } from '../../utils/formatters'

/**
 * ProductDetailPanel Component - Sidebar panel showing selected product details
 * Features:
 * - Displays details of selected product from ProductTable
 * - Falls back to first product if none selected
 * - Shows key metrics in card format
 * - Color-coded values based on risk level
 * - Real-time updates when product selection changes
 * 
 * Metrics displayed:
 * 1. Your Price - Current selling price (purple text)
 * 2. Competitor Price - Lowest competitor price (orange text)
 * 3. Days to Expiry - Countdown to stock expiry (red if critical)
 * 4. Risk Score - Overall product risk on 0-100 scale
 * 
 * Use case:
 * Users click a product in ProductTable and see detailed information
 * in this side panel. Updates automatically when selection changes.
 * 
 * Layout:
 * - Stacked vertical metric cards
 * - Large font for main values
 * - Secondary gray text for labels
 * - Responsive padding
 */
export const ProductDetailPanel = () => {
  const selectedProduct = useStore((state) => state.selectedProduct)
  const products = useStore((state) => state.products)

  // Use selected product, fallback to first product
  const product = selectedProduct || products[0]

  // Handle missing data
  if (!product) {
    return (
      <Card>
        <p className="text-text-secondary">No product selected</p>
      </Card>
    )
  }

  return (
    <Card>
      {/* Header */}
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>

      {/* Details Grid */}
      <div className="space-y-4">
        {/* Your Price */}
        <div>
          <p className="text-xs text-text-secondary">Your Price</p>
          <p className="text-2xl font-bold text-text-primary">
            {formatCurrency(product.currentPrice)}
          </p>
        </div>

        {/* Competitor Price */}
        <div>
          <p className="text-xs text-text-secondary">Competitor Price</p>
          <p className="text-2xl font-bold text-neon-orange">
            {formatCurrency(product.competitorPrice)}
          </p>
        </div>

        {/* Price Difference */}
        <div>
          <p className="text-xs text-text-secondary">Price Difference</p>
          <p
            className={`text-2xl font-bold ${
              product.priceUndercutPercentage > 0
                ? 'text-neon-red'
                : 'text-neon-green'
            }`}
          >
            {product.priceUndercutPercentage > 0 ? '-' : '+'}
            {product.priceUndercutPercentage.toFixed(1)}%
          </p>
        </div>

        {/* Days to Expiry */}
        <div>
          <p className="text-xs text-text-secondary">Days to Expiry</p>
          <p
            className={`text-2xl font-bold ${
              product.daysToExpiry < 30 ? 'text-neon-red' : 'text-text-primary'
            }`}
          >
            {product.daysToExpiry}
          </p>
        </div>

        {/* Risk Score */}
        <div>
          <p className="text-xs text-text-secondary">Risk Score</p>
          <p
            className={`text-2xl font-bold ${
              product.expiryRiskScore >= 80
                ? 'text-neon-red'
                : product.expiryRiskScore >= 60
                ? 'text-neon-orange'
                : product.expiryRiskScore >= 40
                ? 'text-neon-purple'
                : 'text-neon-green'
            }`}
          >
            {product.expiryRiskScore}/100
          </p>
        </div>

        {/* Divider */}
        <div className="divider-light my-4"></div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          {/* Inventory Quantity */}
          <div>
            <p className="text-text-secondary">Inventory</p>
            <p className="text-lg font-bold text-text-primary mt-1">
              {product.inventoryQuantity}
            </p>
          </div>

          {/* Sales Velocity */}
          <div>
            <p className="text-text-secondary">Sales Velocity</p>
            <p className="text-lg font-bold text-text-primary mt-1">
              {product.salesVelocity}/day
            </p>
          </div>

          {/* Revenue 24h */}
          <div>
            <p className="text-text-secondary">Revenue (24h)</p>
            <p className="text-lg font-bold text-text-primary mt-1">
              {formatCurrency(product.revenue24h)}
            </p>
          </div>

          {/* Revenue at Risk */}
          <div>
            <p className="text-text-secondary">At Risk</p>
            <p
              className={`text-lg font-bold mt-1 ${
                product.revenueAtRisk > 0
                  ? 'text-neon-red'
                  : 'text-neon-green'
              }`}
            >
              {formatCurrency(product.revenueAtRisk)}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-6 p-3 bg-dark-bg rounded-lg">
          <p className="text-xs text-text-secondary mb-2">Status</p>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                product.priceMatchStatus === 'MATCHED'
                  ? 'bg-neon-green/20 text-neon-green'
                  : product.priceMatchStatus === 'SAFE'
                  ? 'bg-neon-green/20 text-neon-green'
                  : product.priceMatchStatus === 'UNDERCUT'
                  ? 'bg-neon-orange/20 text-neon-orange'
                  : 'bg-neon-red/20 text-neon-red'
              }`}
            >
              {product.priceMatchStatus === 'CRITICAL_UNDERCUT_AND_EXPIRY'
                ? 'CRITICAL'
                : product.priceMatchStatus === 'CRITICAL_UNDERCUT'
                ? 'CRITICAL'
                : product.priceMatchStatus === 'CRITICAL_EXPIRY'
                ? 'CRITICAL'
                : product.priceMatchStatus}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
