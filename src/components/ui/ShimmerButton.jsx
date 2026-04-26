import { motion } from 'framer-motion'
import { useTheme } from '../../ThemeContext'

export function ShimmerButton({ children, onClick, href, className = '', icon }) {
  const { theme } = useTheme()

  const content = (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm overflow-hidden ${className}`}
      style={{
        background: theme.button,
        color: theme.buttonText,
        border: `1px solid ${theme.borderHover}`,
      }}
    >
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 2.4s linear infinite',
        }}
      />
      {icon && <span className="z-10">{icon}</span>}
      <span className="z-10">{children}</span>
    </motion.button>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {content}
      </a>
    )
  }
  return content
}
