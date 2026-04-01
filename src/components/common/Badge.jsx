/**
 * Badge Component - Small label/tag component
 * Used for status indicators, severity levels, etc.
 * Features:
 * - Multiple color variants
 * - Flexible className prop
 * - Consistent sizing and padding
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Badge content/text
 * @param {string} props.variant - Badge style variant
 *   - 'default': purple accent
 *   - 'critical': red for critical status
 *   - 'warning': orange for warnings
 *   - 'success': green for success/resolved
 * @param {string} props.className - Additional CSS classes
 */
export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-accent-primary/20 text-accent-primary',
    critical: 'badge-critical',
    warning: 'badge-warning',
    success: 'badge-success',
  }

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
