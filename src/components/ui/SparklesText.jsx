import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function StarSvg({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M80 0 C80 0 85 75 160 80 C85 85 80 160 80 160 C80 160 75 85 0 80 C75 75 80 0 80 0 Z" />
    </svg>
  )
}

export function SparklesText({
  children,
  colors = ['#FFD700', '#FFC0CB', '#FF69B4', '#fff'],
  sparkleCount = 6,
  className = '',
  style = {},
}) {
  const [sparkles, setSparkles] = useState([])
  const idRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const id = idRef.current++
      setSparkles((prev) => [
        ...prev.slice(-(sparkleCount - 1)),
        {
          id,
          x: `${10 + Math.random() * 80}%`,
          y: `${5 + Math.random() * 90}%`,
          size: 10 + Math.random() * 14,
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      ])
    }, 350)
    return () => clearInterval(interval)
  }, [colors, sparkleCount])

  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ ...style }}
    >
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            style={{
              position: 'absolute',
              left: s.x,
              top: s.y,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 10,
              display: 'inline-flex',
            }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 20 }}
            exit={{ scale: 0, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <StarSvg color={s.color} size={s.size} />
          </motion.span>
        ))}
      </AnimatePresence>
      {children}
    </span>
  )
}
