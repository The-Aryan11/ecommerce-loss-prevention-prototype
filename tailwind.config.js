/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f172a',
        'dark-card': '#1e293b',
        'dark-border': '#334155',
        'neon-red': '#ff3860',
        'neon-orange': '#ff8c42',
        'neon-purple': '#a78bfa',
        'neon-green': '#10b981',
        'accent-primary': '#a78bfa',
        'text-primary': '#f8fafc',
        'text-secondary': '#cbd5e1',
      },
      fontFamily: {
        'sans': ['Inter', 'Geist', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': ['2.25rem', '2.5rem'],
        'h2': ['1.875rem', '2.25rem'],
        'h3': ['1.5rem', '1.875rem'],
        'body': ['1rem', '1.5rem'],
        'small': ['0.875rem', '1.25rem'],
      },
      spacing: {
        'safe-area-inset-bottom': 'env(safe-area-inset-bottom)',
        'safe-area-inset-left': 'env(safe-area-inset-left)',
        'safe-area-inset-right': 'env(safe-area-inset-right)',
        'safe-area-inset-top': 'env(safe-area-inset-top)',
      },
      boxShadow: {
        'neon-red': '0 0 20px rgba(255, 56, 96, 0.5)',
        'neon-purple': '0 0 20px rgba(167, 139, 250, 0.5)',
        'neon-green': '0 0 20px rgba(16, 185, 129, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-in': 'slideInDown 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(167, 139, 250, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(167, 139, 250, 0.8)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
