import { useContent } from '../../context/ContentContext'
import { useState, useEffect, useRef } from 'react'

const CourseModules = () => {
  const { basics, classicTechniques, advancedTechniques, shaders } = useContent()
  const [activeStep, setActiveStep] = useState(1)
  const containerRef = useRef(null)
  const sectionRefs = useRef([])
  const isScrollingProgrammatically = useRef(false)

  // Course sections data
  const sections = [
    {
      id: 1,
      number: '01',
      title: basics?.title || 'Basics',
      lessonCount: basics?.lessonCount || '13 lessons',
      duration: basics?.duration || '10h 12m of tutorial',
      description: (
        <>
          Create your first scene and understand fundamentals like{' '}
          <span className="text-white font-semibold">cameras</span>,{' '}
          <span className="text-white font-semibold">geometries</span>,{' '}
          <span className="text-white font-semibold">materials</span>,{' '}
          <span className="text-white font-semibold">textures</span>. Add a{' '}
          <span className="text-white font-semibold">debug panel</span>,{' '}
          <span className="text-white font-semibold">animate</span> everything and put your project online.
        </>
      ),
      lessons: basics?.lessons || [
        { id: '01', title: 'Introduction', duration: '35m', isFree: true },
        { id: '02', title: 'What is WebGL and why use Three.js', duration: '23m', isFree: true },
        { id: '03', title: 'First Three.js Project', duration: '1h 19m', isFree: true },
        { id: '04', title: 'Transform objects', duration: '46m', isFree: false },
        { id: '05', title: 'Animations', duration: '30m', isFree: false },
        { id: '06', title: 'Cameras', duration: '57m', isFree: false },
      ],
      accentColor: '#ff6b6b',
      numberColor: 'text-orange-500',
      hoverBorder: 'hover:border-orange-500/30',
    },
    {
      id: 2,
      number: '02',
      title: classicTechniques?.title || 'Classic techniques',
      lessonCount: classicTechniques?.lessonCount || '6 lessons',
      duration: classicTechniques?.duration || '7h 55m of tutorial',
      description: (
        <>
          Illuminate your scene with various <span className="text-white font-semibold">lights</span> casting{' '}
          <span className="text-white font-semibold">shadows</span>, create millions of{' '}
          <span className="text-white font-semibold">particles</span> and{' '}
          <span className="text-white font-semibold">animate on scroll</span>.
        </>
      ),
      lessons: classicTechniques?.lessons || [
        { id: '14', title: 'Lights', duration: '42m', isFree: false },
        { id: '15', title: 'Shadows', duration: '1h 00m', isFree: false },
        { id: '16', title: 'Haunted House', duration: '2h 50m', isFree: true },
        { id: '17', title: 'Particles', duration: '49m', isFree: false },
        { id: '18', title: 'Galaxy Generator', duration: '1h 08m', isFree: false },
        { id: '19', title: 'Scroll based animation', duration: '1h 23m', isFree: false },
      ],
      accentColor: '#22d3ee',
      numberColor: 'text-cyan-400',
      hoverBorder: 'hover:border-cyan-400/30',
    },
    {
      id: 3,
      number: '03',
      title: advancedTechniques?.title || 'Advanced techniques',
      lessonCount: advancedTechniques?.lessonCount || '7 lessons',
      duration: advancedTechniques?.duration || '12h 29m of tutorial',
      description: (
        <>
          Make your world even more realistic with <span className="text-white font-semibold">physics</span>, then import your own model made with{' '}
          <span className="text-white font-semibold">Blender</span>, make it look as{' '}
          <span className="text-white font-semibold">realistic</span> as possible and learn how to{' '}
          <span className="text-white font-semibold">structure</span> your code for more{' '}
          <span className="text-white font-semibold">complex project</span>.
        </>
      ),
      lessons: advancedTechniques?.lessons || [
        { id: '20', title: 'Physics', duration: '1h 57m', isFree: false },
        { id: '21', title: 'Imported models', duration: '1h 07m', isFree: false },
        { id: '22', title: 'Raycaster and Mouse Events', duration: '1h 07m', isFree: false },
        { id: '23', title: 'Custom models with Blender', duration: '1h 59m', isFree: false },
        { id: '24', title: 'Environment map', duration: '1h 44m', isFree: false },
      ],
      accentColor: '#eab308',
      numberColor: 'text-yellow-500',
      hoverBorder: 'hover:border-yellow-500/30',
    },
    {
      id: 4,
      number: '04',
      title: shaders?.title || 'Shaders',
      lessonCount: '3 lessons',
      duration: '5h 21m of tutorial',
      description: (
        <>
          Using <span className="text-white font-semibold">Three.js</span> materials is great but creating your own is even better. Master{' '}
          <span className="text-white font-semibold">GLSL</span>, the{' '}
          <span className="text-white font-semibold">shaders</span> language, to create unseen effects and learn how to enhance and improve existing materials.
        </>
      ),
      lessons: shaders?.lessons || [
        { id: '27', title: 'Shaders', duration: '2h 17m', isFree: false },
        { id: '28', title: 'Shader patterns', duration: '1h 49m', isFree: false },
        { id: '29', title: 'Raging sea', duration: '1h 15m', isFree: false },
      ],
      accentColor: '#a855f7',
      numberColor: 'text-purple-400',
      hoverBorder: 'hover:border-purple-500/30',
    },
  ]

  // Scroll-based step activation
  useEffect(() => {
    const handleScroll = () => {
      // Don't update active step during programmatic scrolling
      if (isScrollingProgrammatically.current) return

      const container = containerRef.current
      if (!container) return

      const containerHeight = container.clientHeight

      // Find which section is in the center of viewport
      sectionRefs.current.forEach((section, index) => {
        if (!section) return

        const rect = section.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        const sectionTop = rect.top - containerRect.top
        const sectionMiddle = sectionTop + rect.height / 2

        // Check if section middle is near viewport center
        if (sectionMiddle > 0 && sectionMiddle < containerHeight * 0.6) {
          setActiveStep(index + 1)
        }
      })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      handleScroll() // Initial check
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // Click to scroll to section
  const scrollToStep = (stepNumber) => {
    // Immediately set the active step
    setActiveStep(stepNumber)
    
    // Mark that we're scrolling programmatically
    isScrollingProgrammatically.current = true

    const section = sectionRefs.current[stepNumber - 1]
    if (section && containerRef.current) {
      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      const sectionRect = section.getBoundingClientRect()
      
      const scrollTop = container.scrollTop + sectionRect.top - containerRect.top

      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      })

      // Re-enable scroll listener after animation completes
      setTimeout(() => {
        isScrollingProgrammatically.current = false
      }, 800) // Slightly longer than smooth scroll duration
    }
  }

  return (
    <section 
      id="course-modules"
      className="w-full scroll-mt-24 mt-12 relative"
      style={{ 
        background: 'linear-gradient(180deg, rgba(30, 20, 50, 0.95) 0%, rgba(45, 30, 65, 0.98) 50%, rgba(60, 40, 80, 0.98) 100%)',
        minHeight: '70vh',
      }}
    >
      <div className="flex h-[70vh] sticky top-0">
        {/* Left Step Bar - Sticky */}
        <div className="hidden lg:flex flex-col justify-start w-24 flex-shrink-0 bg-gray-900/40 backdrop-blur-sm border border-white/20 rounded-md">
          <div className="flex flex-col gap-2">
            {sections?.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToStep(section.id)}
                className={`
                  relative flex items-center justify-center py-4 px-6 transition-all duration-300
                  ${activeStep === section.id ? 'bg-gray-800/60' : 'hover:bg-gray-800/30'}
                `}
              >
                {/* Active indicator bar - on the RIGHT side */}
                {activeStep === section.id && (
                  <div 
                    className="absolute right-0 w-1 h-full rounded-l-full transition-all duration-300"
                    style={{
                      backgroundColor: section.accentColor,
                      boxShadow: `0 0 20px ${section.accentColor}90`
                    }}
                  />
                )}
                
                <span 
                  className={`
                    font-bold transition-all duration-300
                    ${activeStep === section.id 
                      ? 'text-white text-3xl' 
                      : 'text-gray-500 text-2xl hover:text-gray-400'
                    }
                  `}
                >
                  {section?.number}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Center - Animated SVG Icons */}
        <div className="hidden xl:flex flex-col justify-center max-w-2xl flex-shrink-0 px-8 py-16">
          <div className="flex flex-col items-center justify-center h-full">
            {/* Display images based on active step */}
            {activeStep === 1 && (
              <div>
                <img src="/camera.webp" alt="Camera" />
              </div>
            )}
            {activeStep === 2 && (
              <div>
                <img src="/lamp.webp" alt="Lamp" />
              </div>
            )}
            {activeStep === 3 && (
              <div>
                <img src="/computer.webp" alt="Computer" />
              </div>
            )}
            {activeStep === 4 && (
              <div>
                <img src="/shader.webp" alt="shader" />
              </div>
            )}
          </div>
        </div>

        {/* Right Content Area - Scrollable */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide"
          style={{ 
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            {sections?.map((section, index) => (
              <div
                key={section.id}
                ref={(el) => (sectionRefs.current[index] = el)}
                className={`
                  min-h-[70vh] flex flex-col justify-start pt-8 pb-2
                  transition-all duration-500
                  ${activeStep === section.id ? 'opacity-100' : 'opacity-50'}
                `}
              >
                {/* Title */}
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 animate-fadeInUp">
                  {section.title}
                </h2>

                {/* Lesson Info */}
                <div className="flex items-center gap-2 mb-6 text-gray-300 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium text-sm">
                    {section.lessonCount} — {section.duration}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-base lg:text-lg mb-10 leading-relaxed animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                  {section.description}
                </p>

                {/* Lessons List */}
                <div className="space-y-0">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className={`
                        group flex items-center justify-between py-4 
                        border-b border-dotted border-white/50 
                        ${section.hoverBorder}
                        transition-all duration-300 cursor-pointer
                        animate-fadeInUp
                      `}
                      style={{ animationDelay: `${300 + lessonIndex * 50}ms` }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <span 
                          className={`${section.numberColor} font-bold text-base min-w-[2.5rem]`}
                        >
                          {lesson.id}
                        </span>
                        <span className="text-gray-300 font-normal group-hover:text-white transition-colors text-base">
                          {lesson.title}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        {lesson.isFree && (
                          <span 
                            className="px-2.5 py-1 text-white text-xs font-bold rounded-md"
                            style={{ backgroundColor: '#ff6b6b' }}
                          >
                            free
                          </span>
                        )}
                        <span className="text-gray-400 font-normal min-w-[4.5rem] text-right text-sm">
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Animated SVG Components for each section
const AnimatedCamera = () => (
  <svg viewBox="0 0 300 300" className="w-64 h-64 drop-shadow-2xl">
    <defs>
      <linearGradient id="camBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f5f5f5', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d4d4d4', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="camLensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4a5568', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2d3748', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    
    <rect x="50" y="100" width="180" height="120" rx="25" fill="url(#camBodyGrad)">
      <animate attributeName="y" values="100;95;100" dur="3s" repeatCount="indefinite" />
    </rect>
    <rect x="80" y="85" width="50" height="20" rx="10" fill="#ff6b6b">
      <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
    </rect>
    <circle cx="105" cy="95" r="5" fill="#fff" opacity="0.9" />
    <circle cx="200" cy="160" r="50" fill="url(#camLensGrad)">
      <animateTransform attributeName="transform" type="rotate" from="0 200 160" to="360 200 160" dur="10s" repeatCount="indefinite" />
    </circle>
    <circle cx="200" cy="160" r="40" fill="#1a202c" />
    <circle cx="200" cy="160" r="28" fill="#2d3748" />
    <circle cx="190" cy="150" r="12" fill="#4a5568" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3s" repeatCount="indefinite" />
    </circle>
    <rect x="70" y="135" width="35" height="15" rx="7" fill="#ff6b6b" />
    <rect x="70" y="165" width="35" height="15" rx="7" fill="#ff6b6b" />
  </svg>
)

const AnimatedLamp = () => (
  <svg viewBox="0 0 300 300" className="w-64 h-64 drop-shadow-2xl">
    <defs>
      <linearGradient id="lampGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff9680', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ff7a5c', stopOpacity: 1 }} />
      </linearGradient>
      <radialGradient id="lightGlowLamp">
        <stop offset="0%" style={{ stopColor: '#fff9e6', stopOpacity: 0.9 }} />
        <stop offset="100%" style={{ stopColor: '#ffeb99', stopOpacity: 0 }} />
      </radialGradient>
    </defs>
    
    <ellipse cx="130" cy="110" rx="60" ry="30" fill="url(#lightGlowLamp)">
      <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" />
    </ellipse>
    <path d="M 80 110 L 60 135 L 200 135 L 180 110 Z" fill="url(#lampGrad)">
      <animateTransform attributeName="transform" type="rotate" values="0 130 120;-3 130 120;0 130 120" dur="4s" repeatCount="indefinite" />
    </path>
    <ellipse cx="130" cy="135" rx="70" ry="12" fill="#ff6b5c" opacity="0.7" />
    <rect x="170" y="105" width="70" height="8" rx="4" fill="url(#lampGrad)" transform="rotate(-40 170 109)" />
    <circle cx="170" cy="109" r="8" fill="#ff6b5c" />
    <circle cx="220" cy="70" r="8" fill="#ff6b5c" />
    <rect x="215" y="70" width="10" height="110" rx="5" fill="url(#lampGrad)" />
    <ellipse cx="220" cy="190" rx="45" ry="12" fill="#ff6b5c" opacity="0.8" />
    <ellipse cx="220" cy="185" rx="40" ry="10" fill="url(#lampGrad)" />
    {[1, 2, 3, 4, 5].map((i) => (
      <circle key={i} cx={100 + i * 15} cy={120} r="2" fill="#fff9e6">
        <animate attributeName="cy" values="120;145;120" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0;1" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
      </circle>
    ))}
  </svg>
)

const AnimatedComputer = () => (
  <svg viewBox="0 0 300 300" className="w-64 h-64 drop-shadow-2xl">
    <defs>
      <linearGradient id="serverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#b4b4c8', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#8e8ea8', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    
    <rect x="90" y="80" width="120" height="140" rx="8" fill="url(#serverGrad)">
      <animate attributeName="y" values="80;75;80" dur="4s" repeatCount="indefinite" />
    </rect>
    <rect x="85" y="75" width="120" height="140" rx="8" fill="#9a9ab4" opacity="0.4" />
    <rect x="100" y="95" width="100" height="100" rx="4" fill="#6a6a84" />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={115 + i * 25} cy="115" r="4" fill={i === 0 ? "#4ade80" : i === 1 ? "#22d3ee" : "#a78bfa"}>
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
      </circle>
    ))}
    {[0, 1, 2, 3, 4].map((i) => (
      <line key={i} x1="105" y1={140 + i * 12} x2="185" y2={140 + i * 12} stroke="#4a4a64" strokeWidth="2" />
    ))}
    <ellipse cx="150" cy="240" rx="30" ry="45" fill="#d4d4e0">
      <animateTransform attributeName="transform" type="rotate" values="0 150 240;-2 150 240;0 150 240" dur="3s" repeatCount="indefinite" />
    </ellipse>
    <line x1="150" y1="200" x2="150" y2="230" stroke="#8e8ea8" strokeWidth="2" />
    <rect x="145" y="210" width="10" height="15" rx="5" fill="#7a7a94" />
  </svg>
)

const AnimatedShaderSphere = () => (
  <svg viewBox="0 0 300 300" className="w-64 h-64 drop-shadow-2xl">
    <defs>
      <radialGradient id="sphereGrad">
        <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </radialGradient>
      <pattern id="shaderWaves" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 0 20 Q 10 15, 20 20 T 40 20" stroke="#fff" strokeWidth="2" fill="none" opacity="0.4">
          <animate attributeName="d" values="M 0 20 Q 10 15, 20 20 T 40 20;M 0 20 Q 10 25, 20 20 T 40 20;M 0 20 Q 10 15, 20 20 T 40 20" dur="3s" repeatCount="indefinite" />
        </path>
      </pattern>
    </defs>
    
    <circle cx="150" cy="150" r="80" fill="url(#sphereGrad)">
      <animateTransform attributeName="transform" type="rotate" from="0 150 150" to="360 150 150" dur="15s" repeatCount="indefinite" />
    </circle>
    <circle cx="150" cy="150" r="80" fill="url(#shaderWaves)" />
    <ellipse cx="130" cy="120" rx="25" ry="35" fill="#fff" opacity="0.4" />
    <g opacity="0.7">
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M 80 ${140 + i * 20} Q 115 ${135 + i * 20}, 150 ${140 + i * 20} T 220 ${140 + i * 20}`} stroke="#fff" strokeWidth="2" fill="none">
          <animate attributeName="d" values={`M 80 ${140 + i * 20} Q 115 ${135 + i * 20}, 150 ${140 + i * 20} T 220 ${140 + i * 20};M 80 ${140 + i * 20} Q 115 ${145 + i * 20}, 150 ${140 + i * 20} T 220 ${140 + i * 20};M 80 ${140 + i * 20} Q 115 ${135 + i * 20}, 150 ${140 + i * 20} T 220 ${140 + i * 20}`} dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
        </path>
      ))}
    </g>
    {[0, 1, 2, 3].map((i) => (
      <circle key={i} cx="150" cy="70" r="3" fill="#fbbf24">
        <animateTransform attributeName="transform" type="rotate" from={`${i * 90} 150 150`} to={`${360 + i * 90} 150 150`} dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
    ))}
  </svg>
)

export default CourseModules
