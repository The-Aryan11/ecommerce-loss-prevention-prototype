import { useState, useEffect } from 'react'
import { calculateRiskColor, getRiskLevel } from '../../utils/formatters'

/**
 * Risk Gauge Component - Animated circular risk indicator
 * Displays portfolio or product risk on a 0-100 scale
 * Features:
 * - Animated score counter
 * - Color-coded risk levels (red/orange/purple/green)
 * - SVG-based circular progress indicator
 * - Smooth animations and transitions
 * 
 * @param {Object} props
 * @param {number} props.score - Risk score 0-100 (default: 0)
 * @param {boolean} props.animated - Enable counter animation (default: true)
 */
export const RiskGauge = ({ score = 0, animated = true }) => {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score)
  const riskColor = calculateRiskColor(score)
  const riskLevel = getRiskLevel(score)
  const circumference = 2 * Math.PI * 45

  // Animate score counter from 0 to target
  useEffect(() => {
    if (!animated) {
      setDisplayScore(score)
      return
    }

    let current = 0
    const target = score
    const increment = target / 60

    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(interval)
      }
      setDisplayScore(current)
    }, 16)

    return () => clearInterval(interval)
  }, [score, animated])

  const offset = circumference - (displayScore / 100) * circumference

  const getColorClass = (color) => {
    switch (color) {
      case 'neon-red':
        return '#ff3860'
      case 'neon-orange':
        return '#ff8c42'
      case 'neon-purple':
        return '#a78bfa'
      case 'neon-green':
        return '#10b981'
      default:
        return '#334155'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Circular Progress SVG */}
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#334155"
            strokeWidth="8"
            opacity="0.3"
          />

          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={getColorClass(riskColor)}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`text-4xl font-bold ${
              riskColor === 'neon-red'
                ? 'risk-critical'
                : riskColor === 'neon-orange'
                ? 'risk-high'
                : riskColor === 'neon-purple'
                ? 'risk-medium'
                : 'risk-low'
            }`}
          >
            {Math.round(displayScore)}
          </span>
          <span className="text-xs font-semibold text-text-secondary mt-1">
            / 100
          </span>
        </div>
      </div>

      {/* Risk Level Label */}
      <div className="mt-4 text-center">
        <p
          className={`text-sm font-bold ${
            riskColor === 'neon-red'
              ? 'text-neon-red'
              : riskColor === 'neon-orange'
              ? 'text-neon-orange'
              : riskColor === 'neon-purple'
              ? 'text-neon-purple'
              : 'text-neon-green'
          }`}
        >
          {riskLevel}
        </p>
        <p className="text-xs text-text-secondary mt-1">Portfolio Risk</p>
      </div>
    </div>
  )
}
