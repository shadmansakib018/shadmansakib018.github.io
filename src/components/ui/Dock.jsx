import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState, useCallback, useEffect } from 'react'
import { useTheme } from '../../ThemeContext'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

function DockItem({ icon: Icon, label, onClick, mouseX, size, magnification }) {
  const ref = useRef(null)
  const { theme } = useTheme()
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile()

  const distanceCalc = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const sizeSync = useTransform(
    distanceCalc,
    [-140, 0, 140],
    [size, isMobile ? size : magnification, size]
  )
  const animatedSize = useSpring(sizeSync, { mass: 0.1, stiffness: 160, damping: 14 })

  return (
    <div className="relative flex flex-col items-center justify-end pb-1">
      {hovered && !isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-11 text-xs px-3 py-1.5 rounded-xl whitespace-nowrap font-mono pointer-events-none z-50"
          style={{
            background: theme.bgSecondary,
            color: theme.accent1,
            border: `1px solid ${theme.border}`,
            boxShadow: `0 4px 20px ${theme.glowAccent1}`,
          }}
        >
          {label}
        </motion.div>
      )}

      <motion.button
        ref={ref}
        style={{
          width: animatedSize,
          height: animatedSize,
          background: hovered ? theme.cardHover : theme.card,
          border: `1px solid ${hovered ? theme.borderHover : theme.border}`,
          color: hovered ? theme.accent1 : theme.textMuted,
          boxShadow: hovered ? `0 0 22px ${theme.glowAccent1}` : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '14px',
          cursor: 'pointer',
          padding: 0,
          flexShrink: 0,
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={onClick}
        whileTap={{ scale: 0.88 }}
      >
        <Icon style={{ width: '46%', height: '46%' }} />
      </motion.button>
    </div>
  )
}

export function Dock({ items }) {
  const mouseX = useMotionValue(Infinity)
  const { theme } = useTheme()
  const isMobile = useIsMobile()

  const iconSize = isMobile ? 40 : 56
  const iconMag = isMobile ? 40 : 82

  const handleMouseMove = useCallback((e) => mouseX.set(e.clientX), [mouseX])
  const handleMouseLeave = useCallback(() => mouseX.set(Infinity), [mouseX])

  return (
    /*
      Centering wrapper: fixed, full-width, flexbox center.
      This is NOT animated so its layout is never disturbed.
      framer-motion y-animation lives only on the inner div,
      keeping transform: translateX(-50%) out of the equation entirely.
    */
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 110, damping: 20 }}
        style={{ pointerEvents: 'auto' }}
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: isMobile ? '6px' : '10px',
            padding: isMobile ? '8px 12px' : '10px 18px',
            background: `${theme.bg}ee`,
            border: `1px solid ${theme.border}`,
            borderRadius: '26px',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: `0 10px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)`,
          }}
        >
          {items.map((item, i) => (
            <DockItem
              key={i}
              mouseX={mouseX}
              size={iconSize}
              magnification={iconMag}
              {...item}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
