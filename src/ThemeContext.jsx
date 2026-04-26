import { createContext, useContext, useState, useEffect } from 'react'
import { mutedPastels, jewelTones } from './themes'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)
  const theme = isDark ? jewelTones : mutedPastels

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--bg', theme.bg)
    root.style.setProperty('--bg-secondary', theme.bgSecondary)
    root.style.setProperty('--text', theme.text)
    root.style.setProperty('--text-muted', theme.textMuted)
    root.style.setProperty('--accent1', theme.accent1)
    root.style.setProperty('--accent2', theme.accent2)
    root.style.setProperty('--button', theme.button)
    root.style.setProperty('--button-text', theme.buttonText)
    root.style.setProperty('--border', theme.border)
    root.style.setProperty('--card', theme.card)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
