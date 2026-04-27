import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export function ConfettiEffect({ duration = 4000 }) {
  useEffect(() => {
    const end = Date.now() + duration
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffd1dc', '#ff85c2', '#a8dadc', '#3bafa8', '#ffd700']

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors,
        zIndex: 9999,
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors,
        zIndex: 9999,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }

    // Short delay so the page renders first
    const t = setTimeout(frame, 300)
    return () => clearTimeout(t)
  }, [duration])

  return null
}
