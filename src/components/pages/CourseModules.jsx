import { useContent } from '../../context/ContentContext'
import { useState, useEffect, useRef } from 'react'
import CareerBoost from './CareerBoost';
import CourseOverview from './CourseOverview';
import ActiveCommunity from './ActiveCommunity';

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
      image: '/camera.webp',
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
      image: '/lamp.webp',
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
      image: '/computer.webp',
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
      image: '/shader.webp',
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
    <>
      <section 
        id="course-modules"
        className="w-full scroll-mt-20 mt-8 relative"
      >
        <div className="flex glass-card h-[70vh] sticky top-0">
          {/* Left Step Bar - Sticky */}
          <div className="hidden lg:flex flex-col justify-start w-24 flex-shrink-0 bg-gray-900/40 backdrop-blur-sm border border-white/20 rounded-tl-[18px] rounded-bl-[18px]">
            <div className="flex flex-col gap-2">
              {sections?.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToStep(section.id)}
                  className={`
                    relative flex items-center justify-center py-4 px-6 transition-all duration-300
                    ${activeStep === section.id ? 'bg-gray-800/60 rounded-tl-[18px]' : 'hover:bg-gray-800/30 rounded-tl-[18px]'}
                  `}
                >
                  {/* Active indicator bar */}
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

          {/* Combined Content Area - Icons + Content are now together */}
          <div 
            ref={containerRef}
            className="flex-1 overflow-y-auto scrollbar-hide"
            style={{ 
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
              {sections?.map((section, index) => (
                <div
                  key={section.id}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  className={`
                    min-h-[70vh] flex flex-col xl:flex-row items-center justify-center gap-10 xl:gap-32 pt-12 pb-16
                    transition-all duration-500
                    ${activeStep === section.id ? 'opacity-100' : 'opacity-20 translate-y-4 scale-95'}
                  `}
                >
                  {/* Section Icon/Image with background glow */}
                  <div className="relative flex-shrink-0 w-64 h-64 sm:w-80 sm:h-80 xl:w-[450px] xl:h-[450px] flex items-center justify-center order-1 xl:order-none group">
                    {/* Background glow effect */}
                    <div 
                      className="absolute inset-0 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                      style={{ backgroundColor: section.accentColor }}
                    />
                    
                    <img 
                      src={section.image} 
                      alt={section.title} 
                      className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Section Content */}
                  <div className="flex-1 max-w-2xl">
                    {/* Title */}
                    <h2 className="text-3xl font-bold text-white tracking-tight animate-fadeInUp">
                      {section.title}
                    </h2>

                    {/* Lesson Info */}
                    <div className="flex items-center gap-3 mb-3 text-gray-300 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                      <span className="font-semibold text-md tracking-wide uppercase text-gray-400">
                        {section.lessonCount} <span className="mx-2 text-white/20">|</span> {section.duration}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-md mb-3 leading-relaxed animate-fadeInUp font-light" style={{ animationDelay: '200ms' }}>
                      {section.description}
                    </p>

                    {/* Lessons List */}
                    <div className="space-y-1">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className={`
                            group flex items-center justify-between py-3 px-4
                            rounded-xl hover:bg-white/[0.03]
                            border-b border-white/5 last:border-0
                            transition-all duration-300 cursor-pointer
                            animate-fadeInUp
                          `}
                          style={{ animationDelay: `${300 + lessonIndex * 50}ms` }}
                        >
                          <div className="flex items-center gap-6 flex-1">
                            <span 
                              className={`${section.numberColor} font-black text-md min-w-[3rem] opacity-50 group-hover:opacity-100 transition-opacity`}
                            >
                              {lesson.id}
                            </span>
                            <span className="text-gray-300 font-medium group-hover:text-white transition-colors text-md">
                              {lesson.title}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            {lesson.isFree && (
                              <span 
                                className="px-3 py-1 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg"
                                style={{ backgroundColor: '#ff6b6b' }}
                              >
                                free
                              </span>
                            )}
                            <span className="text-gray-500 font-mono text-sm tracking-tighter w-16 text-right">
                              {lesson.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CareerBoost />
      <CourseOverview />
      <ActiveCommunity />
    </>
  )
}

export default CourseModules
