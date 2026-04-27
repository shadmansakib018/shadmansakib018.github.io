import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading') // 'loading' | 'auth' | 'unauth'

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setStatus('auth')
      } else {
        setStatus('unauth')
        navigate('/userlogin', { replace: true })
      }
    })

    // Listen for auth state changes (e.g. token expiry)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        setStatus('unauth')
        navigate('/userlogin', { replace: true })
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  if (status === 'loading') {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0d0d18',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '3px solid #3bafa8',
            borderTopColor: 'transparent',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      </div>
    )
  }

  if (status === 'unauth') return null
  return children
}
