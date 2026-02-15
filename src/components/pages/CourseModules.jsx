import { useContent } from '../../context/ContentContext'
import { useState, useEffect, useRef } from 'react'
import CareerBoost from './CareerBoost';
import CourseOverview from './CourseOverview';
import ActiveCommunity from './ActiveCommunity';

const CourseModules = () => {
  const { egpt_primary, egpt_junior, egpt_senior, egpt_unite, egpt_braille } = useContent()
  const [activeStep, setActiveStep] = useState(1)
  const containerRef = useRef(null)
  const sectionRefs = useRef([])
  const isScrollingProgrammatically = useRef(false)

  // Helper to render description which can be an object or undefined
  const renderDescription = (desc) => {
    if (!desc) return null
    if (typeof desc === 'object') {
      return (
        <>
          {desc.line1} <span className="text-white font-semibold">{desc.line2}</span> {desc.line3}
        </>
      )
    }
    // If it's a string or other, just render it directly (though current JSON structure suggests objects for primary)
    return desc
  }

  // Course sections data
  const sections = [
    {
      id: 1,
      number: '01',
      title: egpt_primary?.title || 'EGPT Primary',
      image: '/courses/primary.png',
      description: renderDescription(egpt_primary?.description),
      lessons: egpt_primary?.lessons || [],
      accentColor: '#ff6b6b',
      numberColor: 'text-orange-500',
      hoverBorder: 'hover:border-orange-500/30',
    },
    {
      id: 2,
      number: '02',
      title: egpt_junior?.title || 'EGPT Junior',
      image: '/courses/junior.png',
      description: renderDescription(egpt_junior?.description),
      lessons: egpt_junior?.lessons || [],
      accentColor: '#22d3ee',
      numberColor: 'text-cyan-400',
      hoverBorder: 'hover:border-cyan-400/30',
    },
    {
      id: 3,
      number: '03',
      title: egpt_senior?.title || 'EGPT Senior',
      image: '/courses/senior.png',
      description: renderDescription(egpt_senior?.description),
      lessons: egpt_senior?.lessons || [],
      accentColor: '#eab308',
      numberColor: 'text-yellow-500',
      hoverBorder: 'hover:border-yellow-500/30',
    },
    {
      id: 4,
      number: '04',
      title: egpt_unite?.title || 'EGPT Unite',
      image: '/courses/unite.png',
      description: renderDescription(egpt_unite?.description),
      lessons: egpt_unite?.lessons || [],
      accentColor: '#a855f7',
      numberColor: 'text-purple-400',
      hoverBorder: 'hover:border-purple-500/30',
    },
    {
      id: 5,
      number: '05',
      title: egpt_braille?.title || 'EGPT Braille',
      image: '/courses/braille.png', // Placeholder or reuse
      description: renderDescription(egpt_braille?.description),
      lessons: [], // No lessons for Braille yet
      accentColor: '#ec4899', // Pink for Braille
      numberColor: 'text-pink-500',
      hoverBorder: 'hover:border-pink-500/30',
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
      <ActiveCommunity />
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
            <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-6">
              {sections?.map((section, index) => (
                <div
                  key={section.id}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  className={`
                    min-h-[70vh] flex flex-col xl:flex-row items-center justify-center gap-10 xl:gap-48 pt-12 pb-16
                    transition-all duration-500
                    ${activeStep === section.id ? 'opacity-100' : 'opacity-20 translate-y-4 scale-95'}
                  `}
                >
                   {/* Section Content */}
                   <div className="flex-1 max-w-2xl">
                     {/* Title */}
                     <h2 className="text-3xl font-bold text-white tracking-tight animate-fadeInUp">
                       {section.title}
                     </h2>

                     {/* Description */}
                     <p className="text-gray-400 text-md mb-3 leading-relaxed animate-fadeInUp font-light" style={{ animationDelay: '200ms' }}>
                       {section.description}
                     </p>

                     {/* Lessons List */}
                     <div className="space-y-1">
                       {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id}>
                          <div
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
                            
                            {/* <div className="flex items-center gap-6">
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
                            </div> */}
                          </div>
                          
                          {/* Lesson Content Description */}
                          {lesson.content && (
                            <div className="pl-16 pr-4 pb-4 pt-0 animate-fadeInUp" style={{ animationDelay: `${350 + lessonIndex * 50}ms` }}>
                               <p className="text-gray-400 text-sm leading-relaxed font-light opacity-80 border-l-2 border-white/10 pl-4">
                                {lesson.content}
                              </p>
                            </div>
                          )}
                        </div>
                       ))}
                     </div>
                   </div>

                   {/* Section Icon/Image with background glow */}
                   <div className="relative flex-shrink-0 w-64 h-64 sm:w-80 sm:h-80 xl:w-[450px] xl:h-[450px] flex items-center justify-center group">
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
                 </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CareerBoost />
      <CourseOverview />
    </>
  )
}

export default CourseModules
