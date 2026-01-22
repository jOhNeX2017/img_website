const CourseOverview = () => {
  const stats = [
    {
      id: 1,
      number: '7',
      label: 'Chapters',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 2,
      number: '66',
      label: 'Lessons',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 3,
      number: '93',
      label: 'Hours of tutorial',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  return (
    <section 
      id="course-overview" 
      className="max-w-full mx-auto mt-12 scroll-mt-24"
    >
      <div className="glass-card p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <h2 className="text-[28px] md:text-[44px] font-bold text-white mb-8">
            The Only Prep Test You Need
          </h2>

          {/* Description */}
          <div className="text-base sm:text-lg text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
            <p className="mb-4">
              You will start by discovering what <span className="font-semibold text-white">WebGL</span> is and why using the{' '}
              <span className="font-semibold text-white">Three.js</span> library is a must. You will then discover the various components of Three.js and once the{' '}
              <span className="font-semibold text-white">basics</span> are acquired, you will move on to more{' '}
              <span className="font-semibold text-white">advanced techniques</span> and build up{' '}
              <span className="font-semibold text-white">experience</span> through tons of exercises.
            </p>
            <p>
              At the end of the course, you will have enough experience and skills to{' '}
              <span className="font-semibold text-white">create your own projects</span>.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className="flex flex-col items-center group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                }}
              >
                {/* Number */}
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-3 bg-gradient-to-br from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110">
                  {stat.number}
                </div>

                {/* Label with Icon */}
                <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                  <span className="opacity-70">{stat.icon}</span>
                  <span className="font-medium">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseOverview
