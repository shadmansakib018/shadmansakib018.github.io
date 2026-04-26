import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../ThemeContext'

// Terminal is always on a dark background (#1e1e1e), so text colors are fixed,
// never pulled from the theme (which may be light in mutedPastels mode).
const FIXED = {
  out: '#cccccc',
  ok: '#6ee7b7',
  info: '#93c5fd',
  prompt: '#a78bfa',
}

const LINES = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Shadman Sakib — Software Engineer & AI/ML Researcher' },
  { type: 'gap' },
  { type: 'cmd', text: 'cat role.txt' },
  { type: 'out', text: 'Graduate Research & Teaching Assistant @ Missouri State' },
  { type: 'out', text: 'Open to: Full-time SWE | ML Engineer | Research roles' },
  { type: 'gap' },
  { type: 'cmd', text: 'echo $STACK' },
  { type: 'out', text: 'React · Next.js · Vue.js · Node.js · TypeScript · Python' },
  { type: 'out', text: 'PyTorch · TensorFlow · AWS · Docker · PostgreSQL · MongoDB' },
  { type: 'out', text: 'GraphQL · React Native · Flask · Django · Jenkins · Git' },
  { type: 'gap' },
  { type: 'cmd', text: 'cat education.txt' },
  { type: 'ok', text: '[✓] M.S. Computer Science — Missouri State University' },
  { type: 'ok', text: '[✓] Graduated: December 2025' },
  { type: 'ok', text: '[✓] Data Science Certification | GPA: 3.80 / 4.00' },
]

const CHAR_SPEED = 28
const LINE_DELAY = 180

function useTypewriter(lines) {
  const [displayed, setDisplayed] = useState([])
  const [cursor, setCursor] = useState(true)
  const indexRef = useRef(0)
  const charRef = useRef(0)

  useEffect(() => {
    const blink = setInterval(() => setCursor((c) => !c), 500)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    let timeout
    const next = () => {
      if (indexRef.current >= lines.length) return
      const line = lines[indexRef.current]

      if (line.type === 'gap') {
        setDisplayed((prev) => [...prev, { type: 'gap', text: '' }])
        indexRef.current++
        timeout = setTimeout(next, LINE_DELAY)
        return
      }

      if (charRef.current === 0) {
        setDisplayed((prev) => [...prev, { type: line.type, text: '' }])
      }

      if (charRef.current < line.text.length) {
        setDisplayed((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            type: line.type,
            text: line.text.slice(0, charRef.current + 1),
          }
          return updated
        })
        charRef.current++
        timeout = setTimeout(next, line.type === 'cmd' ? CHAR_SPEED : CHAR_SPEED * 0.55)
      } else {
        charRef.current = 0
        indexRef.current++
        timeout = setTimeout(next, LINE_DELAY)
      }
    }

    timeout = setTimeout(next, 800)
    return () => clearTimeout(timeout)
  }, [])

  return { displayed, cursor }
}

export function Terminal() {
  const { theme } = useTheme()
  const { displayed, cursor } = useTypewriter(LINES)
  const bodyRef = useRef(null)

  // Scroll only the terminal's own div — never the page
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [displayed])

  const lineColor = (type) => {
    if (type === 'cmd') return theme.accent1
    if (type === 'ok') return FIXED.ok
    if (type === 'info') return FIXED.info
    return FIXED.out
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="rounded-2xl overflow-hidden w-full max-w-2xl"
      style={{
        background: theme.termBg,
        border: `1px solid ${theme.border}`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)`,
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: theme.termBar, borderBottom: `1px solid rgba(255,255,255,0.08)` }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#28CA42' }} />
        <span className="mx-auto text-xs font-mono" style={{ color: '#666' }}>
          shadman@portfolio: ~
        </span>
      </div>

      {/* Body — contained scroll, never touches the page */}
      <div
        ref={bodyRef}
        className="p-5 font-mono text-sm leading-relaxed overflow-y-auto"
        style={{ minHeight: 280, maxHeight: 360 }}
      >
        {displayed.map((line, i) => (
          <div key={i} style={{ height: line.type === 'gap' ? '0.6rem' : 'auto' }}>
            {line.type !== 'gap' && (
              <span style={{ color: lineColor(line.type) }}>
                {line.type === 'cmd' && (
                  <span style={{ color: FIXED.prompt }}>$ </span>
                )}
                {line.text}
              </span>
            )}
          </div>
        ))}
        <span
          className="inline-block w-2 h-4 ml-0.5 align-middle"
          style={{
            background: theme.accent1,
            opacity: cursor ? 1 : 0,
            transition: 'opacity 0.1s',
          }}
        />
      </div>
    </motion.div>
  )
}
