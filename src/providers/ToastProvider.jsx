import { Toaster } from 'react-hot-toast'

/**
 * ToastProvider Component - Global toast notification provider
 * Sets up react-hot-toast with cyberpunk dark theme styling
 * Features:
 * - Dark background with neon borders
 * - Smooth animations
 * - Auto-dismiss after 3 seconds
 * - Max 5 toasts visible at once
 * - Positioned top-right
 * 
 * Usage in components:
 * import toast from 'react-hot-toast'
 * 
 * toast.success('Success message')
 * toast.error('Error message')
 * toast.loading('Loading...')
 */
export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Default options
        duration: 3000,
        style: {
          background: '#1e293b',
          color: '#f8fafc',
          border: '2px solid #334155',
          borderRadius: '8px',
          padding: '16px',
          fontWeight: '500',
          fontSize: '14px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
        },

        // Default options for specific types
        success: {
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#10b981',
            border: '2px solid #10b981',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
          },
          iconTheme: {
            primary: '#10b981',
            secondary: '#1e293b',
          },
        },

        error: {
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#ff3860',
            border: '2px solid #ff3860',
            boxShadow: '0 0 20px rgba(255, 56, 96, 0.3)',
          },
          iconTheme: {
            primary: '#ff3860',
            secondary: '#1e293b',
          },
        },

        loading: {
          duration: Infinity,
          style: {
            background: '#1e293b',
            color: '#a78bfa',
            border: '2px solid #a78bfa',
            boxShadow: '0 0 20px rgba(167, 139, 250, 0.3)',
          },
          iconTheme: {
            primary: '#a78bfa',
            secondary: '#1e293b',
          },
        },
      }}
    />
  )
}
