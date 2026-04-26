import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../ThemeContext'

export function MagicCard({ children, className = '', style = {} }) {
  const ref = useRef(null)
  const { theme } = useTheme()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.012 }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: theme.card,
        border: `1px solid ${hovered ? theme.borderHover : theme.border}`,
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? `0 8px 40px rgba(0,0,0,0.3), 0 0 0 1px ${theme.border}` : '0 2px 12px rgba(0,0,0,0.2)',
        ...style,
      }}
    >
      {hovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
          style={{
            opacity: 0.06,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${theme.accent1}, transparent 40%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}
