import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiLogOut } from 'react-icons/fi'
import { supabase } from '../lib/supabase'
import { SparklesText } from '../components/ui/SparklesText'
import { ConfettiEffect } from '../components/ui/ConfettiEffect'
import { gallery, getImageUrl } from '../data/gallery'

// Romantic palette — independent of portfolio themes
const R = {
  bg: '#fff8fa',
  bgCard: '#ffffff',
  bgSection: '#fff0f5',
  text: '#4a1030',
  textMuted: '#9d6080',
  accent1: '#e91e8c',
  accent2: '#ff85c2',
  accent3: '#ffc1d8',
  border: 'rgba(233,30,140,0.12)',
  cardShadow: '0 4px 24px rgba(233,30,140,0.1)',
}

const HEARTS = ['❤️', '💕', '💖', '💗', '💓', '💝', '🌸', '🌺']
const FLOWERS = ['🌸', '🌺', '🌹', '🌷', '💐', '🌻']

function FloatingHeart({ left, delay, emoji, size }) {
  return (
    <motion.div
      style={{
        position: 'fixed',
        bottom: '-60px',
        left,
        fontSize: size,
        pointerEvents: 'none',
        zIndex: 0,
        userSelect: 'none',
      }}
      animate={{ y: [0, -window.innerHeight - 80], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 6 + Math.random() * 4,
        delay,
        repeat: Infinity,
        repeatDelay: 2 + Math.random() * 6,
        ease: 'easeOut',
      }}
    >
      {emoji}
    </motion.div>
  )
}

function FloatingHearts() {
  const [hearts] = useState(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${4 + Math.random() * 92}%`,
      delay: Math.random() * 5,
      emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
      size: `${14 + Math.random() * 18}px`,
    }))
  )

  return (
    <>
      {hearts.map((h) => (
        <FloatingHeart key={h.id} {...h} />
      ))}
    </>
  )
}

function GalleryPlaceholder() {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '60px 24px',
        borderRadius: 20,
        border: `2px dashed ${R.accent3}`,
        background: 'rgba(255,193,216,0.1)',
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>📸</div>
      <p style={{ color: R.textMuted, fontSize: 15, margin: 0 }}>
        Our photo album is on its way...
      </p>
      <p style={{ color: R.accent2, fontSize: 13, marginTop: 8, fontFamily: 'JetBrains Mono, monospace' }}>
        Add your Cloudinary images to <code>src/data/gallery.js</code> 💕
      </p>
    </div>
  )
}

function GalleryGrid() {
  if (gallery.length === 0) return <GalleryPlaceholder />

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 20,
      }}
    >
      {gallery.map((img, i) => (
        <motion.div
          key={img.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ scale: 1.03 }}
          style={{
            borderRadius: 18,
            overflow: 'hidden',
            background: R.bgCard,
            boxShadow: R.cardShadow,
            border: `1px solid ${R.border}`,
          }}
        >
          <img
            src={getImageUrl(img.id)}
            alt={img.caption}
            loading="lazy"
            style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }}
          />
          {(img.caption || img.date) && (
            <div style={{ padding: '12px 16px' }}>
              {img.caption && (
                <p style={{ color: R.text, fontSize: 14, margin: 0, fontWeight: 500 }}>
                  {img.caption}
                </p>
              )}
              {img.date && (
                <p style={{ color: R.textMuted, fontSize: 12, margin: '4px 0 0', fontFamily: 'JetBrains Mono, monospace' }}>
                  {img.date}
                </p>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export function SecretPage() {
  const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(t)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/userlogin', { replace: true })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: R.bg,
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Confetti */}
      {showConfetti && <ConfettiEffect duration={4500} />}

      {/* Floating hearts */}
      <FloatingHearts />

      {/* Logout button */}
      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 100,
          background: 'rgba(255,255,255,0.85)',
          border: `1px solid ${R.border}`,
          borderRadius: 12,
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          color: R.textMuted,
          fontSize: 13,
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          fontFamily: 'Inter, sans-serif',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        }}
      >
        <FiLogOut size={14} />
        Logout
      </motion.button>

      {/* ─── Hero / Greeting ─── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Decorative top flowers */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 32, marginBottom: 24, letterSpacing: 8 }}
        >
          {FLOWERS.join(' ')}
        </motion.div>

        {/* Sparkles greeting */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
        >
          <SparklesText
            colors={['#FFD700', '#ff69b4', '#ff1493', '#fff', R.accent1]}
            sparkleCount={7}
            style={{ display: 'block' }}
          >
            <h1
              style={{
                fontSize: 'clamp(28px, 6vw, 52px)',
                fontWeight: 800,
                color: R.text,
                margin: 0,
                lineHeight: 1.25,
                padding: '0 10px',
              }}
            >
              Hey Babe! 💕
            </h1>
          </SparklesText>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          style={{
            fontSize: 'clamp(16px, 3vw, 22px)',
            color: R.text,
            fontWeight: 600,
            marginTop: 16,
            maxWidth: 600,
          }}
        >
          Welcome to our secret hideout 🌸
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            fontSize: 'clamp(14px, 2.2vw, 18px)',
            color: R.textMuted,
            marginTop: 10,
            maxWidth: 480,
            lineHeight: 1.6,
          }}
        >
          Hope you like it! This little corner of the internet is just for us — our memories, our moments, our little world. 💖
        </motion.p>

        {/* Big heart */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.0, type: 'spring', stiffness: 120 }}
          style={{ marginTop: 36, fontSize: 72 }}
        >
          ❤️
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            color: R.accent2,
            fontSize: 13,
          }}
        >
          <span>scroll down</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ fontSize: 18 }}
          >
            ↓
          </motion.span>
        </motion.div>
      </section>

      {/* ─── Gallery ─── */}
      <section
        style={{
          padding: '80px 24px 120px',
          maxWidth: 1100,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <p style={{ color: R.accent1, fontSize: 13, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 10 }}>
            🌺 our memories
          </p>
          <h2 style={{ color: R.text, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, margin: 0 }}>
            <SparklesText
              colors={['#FFD700', '#ff69b4', R.accent1]}
              sparkleCount={5}
            >
              Our Photo Album
            </SparklesText>
          </h2>
          <div
            style={{
              width: 60,
              height: 3,
              borderRadius: 99,
              background: `linear-gradient(to right, ${R.accent1}, ${R.accent2})`,
              margin: '16px auto 0',
            }}
          />
        </motion.div>

        <GalleryGrid />
      </section>
    </div>
  )
}
