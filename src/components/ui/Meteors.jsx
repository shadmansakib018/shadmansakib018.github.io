import { useTheme } from '../../ThemeContext'

export function Meteors({ count = 18 }) {
  const { theme } = useTheme()

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const top = Math.random() * 100
        const left = Math.random() * 100
        const delay = Math.random() * 6
        const duration = 4 + Math.random() * 4
        const size = 1 + Math.random() * 1.5

        return (
          <span
            key={i}
            className="absolute inline-block rounded-full"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${80 + Math.random() * 60}px`,
              background: `linear-gradient(to bottom, ${theme.accent1}, transparent)`,
              opacity: 0.5 + Math.random() * 0.4,
              transform: 'rotate(215deg)',
              animation: `meteor ${duration}s ${delay}s linear infinite`,
            }}
          />
        )
      })}
    </div>
  )
}
