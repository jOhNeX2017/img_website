import { createContext, useContext, useState, useEffect } from 'react'

// Theme configurations for 8 aesthetic themes
export const themes = {
  'purple-galaxy': {
    name: 'Purple Galaxy',
    primary: '#7c3aed',
    accent: '#a855f7',
    secondary: '#6d28d9',
    glow: 'rgba(124, 58, 237, 0.4)',
    glowHover: 'rgba(124, 58, 237, 0.6)',
  },
  'ocean-breeze': {
    name: 'Ocean Breeze',
    primary: '#0891b2',
    accent: '#22d3ee',
    secondary: '#0e7490',
    glow: 'rgba(8, 145, 178, 0.4)',
    glowHover: 'rgba(8, 145, 178, 0.6)',
  },
  'sunset-glow': {
    name: 'Sunset Glow',
    primary: '#ea580c',
    accent: '#fb923c',
    secondary: '#c2410c',
    glow: 'rgba(234, 88, 12, 0.4)',
    glowHover: 'rgba(234, 88, 12, 0.6)',
  },
  'forest-night': {
    name: 'Forest Night',
    primary: '#059669',
    accent: '#34d399',
    secondary: '#047857',
    glow: 'rgba(5, 150, 105, 0.4)',
    glowHover: 'rgba(5, 150, 105, 0.6)',
  },
  'rose-petal': {
    name: 'Rose Petal',
    primary: '#e11d48',
    accent: '#fb7185',
    secondary: '#be123c',
    glow: 'rgba(225, 29, 72, 0.4)',
    glowHover: 'rgba(225, 29, 72, 0.6)',
  },
  'golden-hour': {
    name: 'Golden Hour',
    primary: '#d97706',
    accent: '#fbbf24',
    secondary: '#b45309',
    glow: 'rgba(217, 119, 6, 0.4)',
    glowHover: 'rgba(217, 119, 6, 0.6)',
  },
  'arctic-aurora': {
    name: 'Arctic Aurora',
    primary: '#0284c7',
    accent: '#38bdf8',
    secondary: '#0369a1',
    glow: 'rgba(2, 132, 199, 0.4)',
    glowHover: 'rgba(2, 132, 199, 0.6)',
  },
  'lavender-dream': {
    name: 'Lavender Dream',
    primary: '#8b5cf6',
    accent: '#c4b5fd',
    secondary: '#7c3aed',
    glow: 'rgba(139, 92, 246, 0.4)',
    glowHover: 'rgba(139, 92, 246, 0.6)',
  },
  'midnight-blue': {
    name: 'Midnight Blue',
    primary: '#1e40af',
    accent: '#60a5fa',
    secondary: '#1e3a8a',
    glow: 'rgba(30, 64, 175, 0.4)',
    glowHover: 'rgba(30, 64, 175, 0.6)',
  },
  'coral-reef': {
    name: 'Coral Reef',
    primary: '#f43f5e',
    accent: '#fda4af',
    secondary: '#e11d48',
    glow: 'rgba(244, 63, 94, 0.4)',
    glowHover: 'rgba(244, 63, 94, 0.6)',
  },
  'mint-fresh': {
    name: 'Mint Fresh',
    primary: '#14b8a6',
    accent: '#5eead4',
    secondary: '#0d9488',
    glow: 'rgba(20, 184, 166, 0.4)',
    glowHover: 'rgba(20, 184, 166, 0.6)',
  },
  'cherry-blossom': {
    name: 'Cherry Blossom',
    primary: '#db2777',
    accent: '#f9a8d4',
    secondary: '#be185d',
    glow: 'rgba(219, 39, 119, 0.4)',
    glowHover: 'rgba(219, 39, 119, 0.6)',
  },
  'clean-white': {
    name: 'Clean White',
    primary: '#ffffff',
    accent: '#60a5fa',
    secondary: '#2563eb',
    glow: 'rgba(59, 130, 246, 0.3)',
    glowHover: 'rgba(59, 130, 246, 0.5)',
  },
}

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Get saved theme from localStorage or default to purple-galaxy
    const saved = localStorage.getItem('theme')
    return saved && themes[saved] ? saved : 'purple-galaxy'
  })

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('theme', theme)
    // Apply theme to document
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
