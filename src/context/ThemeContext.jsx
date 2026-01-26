import { createContext, useContext, useState, useEffect } from 'react'

// Theme configurations for 8 aesthetic themes
export const themes = {
  'arctic-aurora': {
    name: 'Arctic Aurora',
    primary: '#0284c7',
    accent: '#38bdf8',
    secondary: '#0369a1',
    glow: 'rgba(2, 132, 199, 0.4)',
    glowHover: 'rgba(2, 132, 199, 0.6)',
  },
}

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved && themes[saved] ? saved : 'arctic-aurora'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const themeConfig = themes[theme]
  const themeList = Object.entries(themes).map(([key, value]) => ({
    key,
    ...value,
  }))

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeConfig, themeList }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
