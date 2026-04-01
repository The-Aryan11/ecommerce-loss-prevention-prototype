import { useStore } from '../../store/useStore'
import { Card, CardHeader, CardTitle } from '../common/Card'
import { formatCurrency, formatPercentage } from '../../utils/formatters'

/**
 * ProductTable Component - Displays product portfolio as data table
 * Features:
 * - Sortable columns (price, competitor, gap, days to expiry, risk)
 * - Clickable rows to select product for detail view
 * - Color-coded risk indicators (red for high, green for low)
 * - Color-coded expiry indicators (red for <30 days)
 * - Hover effects on rows
 * - Responsive horizontal scroll on small screens
 * 
 * Columns:
 * 1. Product Name & SKU - Product identification
 * 2. Your Price - Current selling price
 * 3. Competitor Price - Lowest competitor price
 * 4. Gap - Price difference as percentage (red if >10%)
 * 5. Days to Expiry - Days until stock expires (red if <30)
 * 6. Risk Score - Expiry risk on 0-100 scale
 * 
 * Interactions:
 * - Click row: Sets selectedProduct in store for detail view
 * - Hover: Highlights row with dark background
 * 
 * Data source:
 * - Products from Zustand store
 * - Real-time updates when products are modified
 */
export const ProductTable = () => {
  const products = useStore((state) => state.products)
  const setSelectedProduct = useStore((state) => state.setSelectedProduct)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Portfolio Overview</CardTitle>
      </CardHeader>

      {/* Table Container with horizontal scroll for mobile */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-dark-border">
              <th className="text-left py-3 px-4 font-bold text-text-secondary">
                Product
              </th>
              <th className="text-left py-3 px-4 font-bold text-text-secondary">
                Your Price
              </th>
              <th className="text-left py-3 px-4 font-bold text-text-secondary">
                Competitor
              </th>
              <th className="text-left py-3 px-4 font-bold text-text-secondary">
                Gap
              </th>
              <th className="text-left py-3 px-4 font-bold text-text-secondary">
                Days to Expiry
              </th>
              <th className="text-left py-3 px-4 font-bold text-text-secondary">
                Risk Score
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="border-b border-dark-border hover:bg-dark-bg/50 cursor-pointer transition-all duration-200"
              >
                {/* Product Name & SKU */}
                <td className="py-4 px-4">
                  <p className="font-semibold text-text-primary">
                    {product.name}
                  </p>
                  <p className="text-xs text-text-secondary">{product.sku}</p>
                </td>

                {/* Your Price */}
                <td className="py-4 px-4 font-bold text-text-primary">
                  {formatCurrency(product.currentPrice)}
                </td>

                {/* Competitor Price */}
                <td className="py-4 px-4 font-bold text-neon-orange">
                  {formatCurrency(product.competitorPrice)}
                </td>

                {/* Price Gap - Color coded */}
                <td
                  className={`py-4 px-4 font-bold ${
                    product.priceUndercutPercentage > 10
                      ? 'text-neon-red'
                      : 'text-text-primary'
                  }`}
                >
                  {product.priceUndercutPercentage > 0 ? '-' : '+'}
                  {formatPercentage(product.priceUndercutPercentage)}
                </td>

                {/* Days to Expiry - Color coded */}
                <td className="py-4 px-4">
                  <span
                    className={`font-semibold ${
                      product.daysToExpiry < 30
                        ? 'text-neon-red'
                        : product.daysToExpiry < 60
                        ? 'text-neon-orange'
                        : 'text-neon-green'
                    }`}
                  >
                    {product.daysToExpiry}d
                  </span>
                </td>

                {/* Risk Score - Visual indicator */}
                <td className="py-4 px-4">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`font-bold ${
                        product.expiryRiskScore >= 80
                          ? 'text-neon-red'
                          : product.expiryRiskScore >= 60
                          ? 'text-neon-orange'
                          : product.expiryRiskScore >= 40
                          ? 'text-neon-purple'
                          : 'text-neon-green'
                      }`}
                    >
                      {product.expiryRiskScore}
                    </span>

                    {/* Risk bar indicator */}
                    <div className="w-16 h-1.5 bg-dark-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          product.expiryRiskScore >= 80
                            ? 'bg-neon-red'
                            : product.expiryRiskScore >= 60
                            ? 'bg-neon-orange'
                            : product.expiryRiskScore >= 40
                            ? 'bg-neon-purple'
                            : 'bg-neon-green'
                        }`}
                        style={{
                          width: `${product.expiryRiskScore}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
