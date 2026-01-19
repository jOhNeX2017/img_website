import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

const ThemeSwitcher = () => {
  const { theme, setTheme, themeList } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div 
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Theme Options */}
      <div className={`flex flex-col gap-2 p-2 transition-all duration-300 border border-white/10 rounded-xl  ${
        isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {themeList?.map((t) => (
          <button
            key={t.key}
            onClick={() => setTheme(t.key)}
            className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
              theme === t.key 
                ? 'bg-white/20 border border-white/30 scale-105' 
                : 'bg-white/10 border border-white/10 hover:bg-white/15 hover:scale-102'
            }`}
            style={{
              boxShadow: theme === t.key ? `0 4px 20px ${t.glow}` : 'none'
            }}
          >
            {/* Color Swatch */}
            <div 
              className="w-6 h-6 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{ 
                background: `linear-gradient(135deg, ${t.primary} 0%, ${t.accent} 100%)`,
                boxShadow: `0 2px 10px ${t.glow}`
              }}
            />
            {/* Theme Name */}
            <span className="text-sm font-medium text-white whitespace-nowrap">
              {t.name}
            </span>
            {/* Active Indicator */}
            {theme === t.key && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-105 shadow-xl"
        style={{
          boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3)`
        }}
      >
        {/* Palette Icon */}
        <svg 
          className="w-6 h-6 text-white transition-transform duration-300"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" 
          />
        </svg>
      </button>
    </div>
  )
}

export default ThemeSwitcher
