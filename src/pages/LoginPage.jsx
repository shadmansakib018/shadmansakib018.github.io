import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi'
import { TbLeaf } from 'react-icons/tb'
import { supabase } from '../lib/supabase'
import { BorderBeam } from '../components/ui/BorderBeam'

const T = {
  bg: '#0a0a12',
  bgCard: '#111120',
  text: '#f0f0f0',
  textMuted: '#888',
  accent1: '#3DBBD5',
  accent2: '#2EBF9A',
  border: 'rgba(61,187,213,0.15)',
  inputBg: 'rgba(255,255,255,0.04)',
  inputBorder: 'rgba(61,187,213,0.2)',
  inputFocus: 'rgba(61,187,213,0.5)',
  error: '#f87171',
}

function InputField({ icon: Icon, type, placeholder, value, onChange, rightEl }) {
  return (
    <div style={{ position: 'relative' }}>
      <span
        style={{
          position: 'absolute',
          left: 14,
          top: '50%',
          transform: 'translateY(-50%)',
          color: T.textMuted,
          display: 'flex',
          pointerEvents: 'none',
        }}
      >
        <Icon size={16} />
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        style={{
          width: '100%',
          background: T.inputBg,
          border: `1px solid ${T.inputBorder}`,
          borderRadius: 12,
          padding: '12px 42px',
          color: T.text,
          fontSize: 14,
          fontFamily: 'Inter, sans-serif',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = T.accent1
          e.target.style.boxShadow = `0 0 0 3px ${T.accent1}20`
        }}
        onBlur={(e) => {
          e.target.style.borderColor = T.inputBorder
          e.target.style.boxShadow = 'none'
        }}
      />
      {rightEl && (
        <span
          style={{
            position: 'absolute',
            right: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            color: T.textMuted,
            cursor: 'pointer',
            display: 'flex',
          }}
        >
          {rightEl}
        </span>
      )}
    </div>
  )
}

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('Invalid credentials. Try again.')
      setLoading(false)
    } else {
      navigate('/shadhuishu', { replace: true })
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: T.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient blobs */}
      <div style={{
        position: 'absolute', width: 400, height: 400,
        borderRadius: '50%', top: '-10%', left: '-10%',
        background: `radial-gradient(circle, rgba(61,187,213,0.07) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 300, height: 300,
        borderRadius: '50%', bottom: '-5%', right: '-5%',
        background: `radial-gradient(circle, rgba(46,191,154,0.07) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: 420 }}
      >
        <BorderBeam
          colorFrom={T.accent1}
          colorTo={T.accent2}
          duration={10}
          borderWidth={1.5}
          borderRadius={24}
        >
          <div
            style={{
              background: T.bgCard,
              borderRadius: 23,
              padding: '40px 36px',
            }}
          >
            {/* Icon + Title */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: 40, marginBottom: 12, display: 'inline-block' }}
              >
                <TbLeaf style={{ color: T.accent2, width: 48, height: 48 }} />
              </motion.div>
              <h1 style={{ color: T.text, fontSize: 22, fontWeight: 700, margin: 0 }}>
                Secret Access
              </h1>
              <p style={{ color: T.textMuted, fontSize: 13, marginTop: 6, fontFamily: 'JetBrains Mono, monospace' }}>
                You know who you are 🌿
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <InputField
                icon={FiMail}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                icon={FiLock}
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightEl={
                  <span onClick={() => setShowPass((v) => !v)}>
                    {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </span>
                }
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: T.error, fontSize: 13, textAlign: 'center', margin: 0 }}
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${T.accent1}, ${T.accent2})`,
                  border: 'none',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  fontFamily: 'Inter, sans-serif',
                  marginTop: 4,
                  boxShadow: `0 4px 20px rgba(61,187,213,0.25)`,
                  transition: 'opacity 0.2s',
                }}
              >
                {loading ? (
                  <span style={{
                    width: 18, height: 18, borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.4)',
                    borderTopColor: '#fff',
                    animation: 'spin 0.7s linear infinite',
                    display: 'inline-block',
                  }} />
                ) : (
                  <><FiLogIn size={16} /> Sign In</>
                )}
              </motion.button>
            </form>
          </div>
        </BorderBeam>
      </motion.div>
    </div>
  )
}
