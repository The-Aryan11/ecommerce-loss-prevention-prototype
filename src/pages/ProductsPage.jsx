import { useStore } from '../store/useStore'
import { ProductTable } from '../components/products/ProductTable'
import { ProductDetailPanel } from '../components/products/ProductDetailPanel'

/**
 * ProductsPage Component - Product portfolio management view
 * Displays all products with detailed information and comparison tools
 * Features:
 * - Product table with sortable columns
 * - Product detail sidebar
 * - Interactive row selection
 * - Real-time price updates
 * - Risk score visualization
 * - Inventory tracking
 * 
 * Layout (3-column on desktop, 1-column on mobile):
 * ┌──────────────────┬──────────────┐
 * │                  │              │
 * │  ProductTable    │ DetailPanel  │
 * │  (2/3 width)     │ (1/3 width)  │
 * │                  │              │
 * │ - Product 1      │ Selected     │
 * │ - Product 2      │ Product      │
 * │ - Product 3      │ Details      │
 * │ - Product 4      │              │
 * │ - Product 5      │              │
 * │                  │              │
 * └──────────────────┴──────────────┘
 * 
 * Interactions:
 * - Click row in ProductTable to select product
 * - ProductDetailPanel updates automatically
 * - Shows current vs competitor pricing
 * - Displays expiry countdown
 * - Shows revenue metrics
 */
export const ProductsPage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Table - Takes 2/3 width on desktop */}
        <div className="lg:col-span-2">
          <ProductTable />
        </div>

        {/* Product Detail Panel - Takes 1/3 width on desktop */}
        <div>
          <ProductDetailPanel />
        </div>
      </div>
    </div>
  )
}
