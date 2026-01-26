import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useContent } from '../../context/ContentContext'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { brand, navigation, cta } = useContent()
  const navigate = useNavigate()
  const location = useLocation()

  const navLinks = navigation || []

  // Map navigation keys to route paths
  const routeMap = {
    'home': '/',
    'exams': '/exams',
    'study': '/study-abroad',
    'scholarships': '/scholarships',
    'reviews': '/reviews',
    'more': '/course-modules',
    'course-modules': '/course-modules',
    'career-boost': '/career-boost',
    'course-overview': '/course-overview',
    'community': '/community',
    'registration': '/registration'
  }

  const handleNavClick = (key) => {
    const path = routeMap[key] || '/'
    navigate(path)
    setMobileMenuOpen(false)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    navigate('/')
  }

  // Check if a navigation item is active based on current route
  const isActive = (key) => {
    const path = routeMap[key] || '/'
    return location.pathname === path
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg">
      <div className="max-w-full mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left - Logo + Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a 
              href="/" 
              onClick={handleLogoClick} 
              className=" logo-wave flex items-center gap-2 group"
            >
              <div 
                className="logo-icon w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
                style={{
                  background: 'var(--gradient-primary)',
                }}
              >
                <svg 
                  className="w-5 h-5 text-white" 
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
              <span className="logo-text text-2xl font-bold text-white tracking-tight">
                {(brand?.name || 'Brand')?.split('')?.map((letter, i) => (
                <span key={i}>{letter}</span>
              ))}
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks?.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.key)}
                  className={`
                    relative px-5 py-2.5 text-base font-medium
                    transition-all duration-300
                    ${isActive(link.key) 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-gray-200 hover:underline'
                    }
                  `}
                  style={isActive(link.key) ? {
                    backgroundColor: 'rgba(var(--color-primary-rgb, 2, 132, 199), 0.08)',
                  } : {}}
                >
                  {/* Top Border - touches the very top of header */}
                  {isActive(link.key) && (
                    <div 
                      className="absolute left-0 right-0 h-[3px] rounded-b-sm"
                      style={{
                        top: '-12px',
                        background: 'var(--gradient-primary)',
                        boxShadow: '0 2px 8px var(--color-glow)'
                      }}
                    />
                  )}
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Right - Login + CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {/* Login Button */}
            {/* <button 
              onClick={() => handleNavClick('registration')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Login
            </button> */}

            {/* Be a Partner Button */}
            <button 
              onClick={() => handleNavClick('registration')}
              className="btn-gradient flex items-center gap-2 text-md font-semibold"
            >
              {cta?.partnerButton || 'Be a Partner'}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="6,3 20,12 6,21" />
            </svg>
            </button>
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
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 border-t border-white/10 animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks?.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.key)}
                className={`
                  text-left text-sm font-medium px-4 py-3 rounded-lg
                  transition-all duration-300 relative
                  ${isActive(link.key)
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }
                `}
                style={isActive(link.key) ? {
                  backgroundColor: 'rgba(var(--color-primary-rgb, 2, 132, 199), 0.1)',
                  borderLeft: '3px solid var(--color-primary)'
                } : {}}
              >
                {link.name}
              </button>
            ))}
            <hr className="border-white/10 my-2" />
            
            {/* Mobile Login */}
            {/* <button 
              onClick={() => handleNavClick('registration')}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Login
            </button> */}

            {/* Mobile CTA */}
            <button 
              onClick={() => handleNavClick('registration')}
              className="btn-gradient flex items-center justify-center gap-2 text-sm font-semibold mt-2"
            >
              {cta?.partnerButton || 'Start learning now'}
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
