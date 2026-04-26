import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi'
import { Terminal } from './ui/Terminal'
import { Meteors } from './ui/Meteors'
import { ShimmerButton } from './ui/ShimmerButton'
import { useTheme } from '../ThemeContext'
import { personal } from '../data/resume'

function ProfilePicture({ theme }) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Outer ambient glow */}
      <div
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: 250,
          height: 250,
          background: `radial-gradient(circle, ${theme.glowAccent1} 0%, transparent 70%)`,
          filter: 'blur(28px)',
        }}
      />

      {/* Spinning gradient ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute rounded-full"
        style={{
          width: 216,
          height: 216,
          background: `conic-gradient(${theme.accent1}, ${theme.accent2}, ${theme.button}, ${theme.accent1})`,
        }}
      />

      {/* Gap ring (same color as bg so it looks like a gap) */}
      <div
        className="absolute rounded-full"
        style={{ width: 208, height: 208, background: theme.bg }}
      />

      {/* Profile image — static, no float */}
      <div
        className="relative rounded-full overflow-hidden z-10"
        style={{
          width: 200,
          height: 200,
        }}
      >
        <img
          src="./pp2.jpg"
          alt="Shadman Sakib"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  )
}

function Typewriter({ words }) {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[idx]
    if (!deleting && displayed.length < word.length) {
      const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === word.length) {
      const t = setTimeout(() => setDeleting(true), 1800)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIdx((i) => (i + 1) % words.length)
    }
  }, [displayed, deleting, idx, words])

  return (
    <span>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export function Hero() {
  const { theme } = useTheme()

  const socials = [
    { icon: FiGithub, href: personal.github, label: 'GitHub' },
    { icon: FiLinkedin, href: personal.linkedin, label: 'LinkedIn' },
    { icon: FiMail, href: `mailto:${personal.email}`, label: 'Email' },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pb-32 pt-16"
      style={{ background: theme.bg }}
    >
      <Meteors count={14} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 20%, ${theme.glowAccent1} 0%, transparent 65%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left: Text + Terminal */}
          <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p
                className="font-mono text-sm mb-3 tracking-widest uppercase"
                style={{ color: theme.accent2 }}
              >
                Hello, world 👋
              </p>
              <h1
                className="text-5xl lg:text-6xl font-bold mb-3 leading-tight"
                style={{ color: theme.text }}
              >
                {personal.name}
              </h1>
              <h2
                className="text-xl lg:text-2xl font-mono font-medium"
                style={{ color: theme.textMuted }}
              >
                <Typewriter words={personal.roles} />
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed" style={{ color: theme.textMuted }}>
                {personal.tagline}
              </p>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-3 justify-center lg:justify-start flex-wrap"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="p-2.5 rounded-xl transition-all duration-200"
                  style={{
                    background: theme.card,
                    border: `1px solid ${theme.border}`,
                    color: theme.textMuted,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.accent1
                    e.currentTarget.style.borderColor = theme.borderHover
                    e.currentTarget.style.boxShadow = `0 0 16px ${theme.glowAccent1}`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.textMuted
                    e.currentTarget.style.borderColor = theme.border
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <Icon size={20} />
                </a>
              ))}
              <ShimmerButton href="./Shadman_Sakib_Resume.pdf" icon={<FiDownload />}>
                Resume
              </ShimmerButton>
            </motion.div>

            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-full"
            >
              <Terminal />
            </motion.div>
          </div>

          {/* Right: Profile Picture */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <ProfilePicture theme={theme} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
