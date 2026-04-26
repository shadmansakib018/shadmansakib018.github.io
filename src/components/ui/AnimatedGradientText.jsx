import { useTheme } from '../../ThemeContext'

export function AnimatedGradientText({ children, className = '' }) {
  const { theme } = useTheme()

  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: theme.gradient,
        backgroundSize: '200% 200%',
        animation: 'gradient-x 4s ease infinite',
      }}
    >
      {children}
    </span>
  )
}
