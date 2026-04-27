import { motion } from 'framer-motion'

/**
 * Wraps children in a card with a rotating gradient border beam.
 * The outer div clips the rotating gradient to only expose the border strip.
 */
export function BorderBeam({
  children,
  colorFrom = '#a8dadc',
  colorTo = '#3bafa8',
  duration = 8,
  borderWidth = 2,
  borderRadius = 20,
  className = '',
  style = {},
}) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        padding: borderWidth,
        borderRadius,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Rotating conic gradient — clipped to border strip by the padding + overflow:hidden above */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `conic-gradient(
            transparent 0deg,
            transparent 60deg,
            ${colorFrom} 120deg,
            ${colorTo} 200deg,
            transparent 260deg,
            transparent 360deg
          )`,
          pointerEvents: 'none',
        }}
      />
      {/* Card content sits on top, with its own background */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: borderRadius - borderWidth,
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  )
}
