import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'

const Header = ({ onNavigate, currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const { theme, setTheme, themeList } = useTheme()
  const themeMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setThemeMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { name: 'Exams', key: 'exams' },
    { name: 'Study Abroad Scope', key: 'study' },
    { name: 'Scholarships & Events', key: 'scholarships' },
    { name: 'Reviews', key: 'reviews' },
    { name: 'More', key: 'more' },
  ]

  const scrollToSection = (sectionKey) => {
    window.location.hash = sectionKey;
    onNavigate(sectionKey);
    setTimeout(() => {
      const section = document.getElementById(sectionKey);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (key) => scrollToSection(key);

  const handleLogoClick = (e) => {
    e.preventDefault();
    scrollToSection('home');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-1 backdrop-blur-lg bg-[rgba(15,15,26,0.8)] border-b border-[rgba(255,255,255,0.1)]">
      <div className="max-w-full mx-auto flex items-center justify-between">
        {/* Left Section - Logo + Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="logo-wave flex items-center gap-2 group">
            <div 
              className="logo-icon w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: 'var(--gradient-primary)',
                boxShadow: '0 4px 15px var(--color-glow)'
              }}
            >
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 10V3L4 14h7v7l9-11h-7z" 
                />
              </svg>
            </div>
            <span className="logo-text text-xl font-bold text-white tracking-tight">
              {'Imoveglobal'.split('').map((letter, i) => (
                <span key={i}>{letter}</span>
              ))}
            </span>
          </a>

          {/* Desktop Navigation - Next to Logo */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks?.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.key)}
                className={`font-medium px-4 py-2.5 ${
                  currentPage === link.key 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                style={currentPage === link.key ? {
                  backgroundColor: 'var(--glass-bg)',
                  borderBottom: '3px solid var(--color-primary)',
                } : {}}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Section - Login + Be a Partner */}
        <div className="hidden md:flex items-center gap-4">
          {/* <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 text-md font-medium px-4 py-2 rounded-lg hover:bg-white/5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Login
          </button> */}
          <button 
            onClick={() => scrollToSection('registration')}
            className="btn-gradient flex items-center gap-2 text-md"
          >
            Be a Partner
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="6,3 20,12 6,21" />
            </svg>
          </button>

          {/* Theme Switcher */}
          <div className="relative" ref={themeMenuRef}>
            <button
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              className="flex"
              title="Change Theme"
            >
              <svg 
                className="w-5 h-5 text-white transition-transform duration-300" 
                style={{ transform: themeMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </button>

            {/* Theme Dropdown */}
            <div 
              className={`absolute right-0 top-full mt-2 w-48 max-h-80 overflow-y-auto py-2 rounded-xl backdrop-blur-lg shadow-xl z-50 transition-all duration-300 origin-top-right ${
                themeMenuOpen 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
              style={{ 
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)'
              }}
            >
                {themeList?.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => {
                      setTheme(t.key)
                      setThemeMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 transition-all duration-200 ${
                      theme === t.key 
                        ? 'bg-black/10' 
                        : 'hover:bg-black/5'
                    }`}
                  >
                    <div 
                      className="w-5 h-5 rounded-md border border-black/10"
                      style={{ 
                        background: `linear-gradient(135deg, ${t.primary} 0%, ${t.accent} 100%)`
                      }}
                    />
                    <span className="text-sm" style={{ color: theme === 'clean-white' ? '#1e293b' : 'white' }}>{t.name}</span>
                    {theme === t.key && (
                      <svg className="w-4 h-4 ml-auto" style={{ color: 'var(--color-primary)' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 py-4 border-t border-white/10 animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks?.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.key)}
                className={`text-left text-sm font-medium px-4 py-3 rounded-lg transition-all duration-300 ${
                  currentPage === link.key
                    ? 'text-gray-300 hover:text-white hover:bg-white/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                style={currentPage === link.key ? {
                  color: 'var(--color-accent)',
                  backgroundColor: 'rgba(var(--color-primary-rgb, 124, 58, 237), 0.1)'
                } : {}}
              >
                {link.name}
              </button>
            ))}
            <hr className="border-white/10 my-2" />
            {/* <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium px-4 py-3 rounded-lg hover:bg-white/5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Login
            </button> */}
            <button 
              onClick={() => scrollToSection('registration')}
              className="btn-gradient flex items-center justify-center gap-2 text-md mx-4 mt-2"
            >
              Be a Partner
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
