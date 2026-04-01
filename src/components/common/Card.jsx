/**
 * Card Component - Base reusable card container
 * Provides consistent styling for content cards
 * Features:
 * - Dark theme with border and shadow
 * - Flexible padding and className props
 * - Hover effect transitions
 */
export const Card = ({ className = '', children, ...props }) => (
  <div className={`card-elevated rounded-lg p-6 ${className}`} {...props}>
    {children}
  </div>
)

/**
 * CardHeader Component - Container for card header content
 * Typically includes title and description
 */
export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
)

/**
 * CardTitle Component - Large bold text for card headers
 * Provides consistent typography
 */
export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-bold text-text-primary ${className}`}>
    {children}
  </h3>
)

/**
 * CardDescription Component - Secondary text below card title
 * Provides context or subtitle information
 */
export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-text-secondary mt-1 ${className}`}>
    {children}
  </p>
)

/**
 * CardContent Component - Main content wrapper
 * Allows custom styling of card body
 */
export const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
)
