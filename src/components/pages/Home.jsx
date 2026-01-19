const HomeSection = () => {
  return (
    <section id="home" className="max-w-full mx-auto scroll-mt-24 ">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-8 lg:py-8 px-4 lg:px-8">
        {/* Left Content */}
        <div className="flex-1 max-w-xl lg:max-w-2xl">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-gray-400">
              by <span style={{ color: 'var(--color-accent)' }} className="hover:opacity-80 cursor-pointer transition-opacity">Imoveglobal</span>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Become a{' '}
            <span className="bg-theme-gradient-text">
              Global Education
            </span>{' '}
            Partner
          </h1>

          {/* Subtext */}
          <p className="text-gray-300 text-lg mb-2">
            <span style={{ color: 'var(--color-accent)' }} className="font-semibold">Everything you need</span> in one place:
          </p>
          <p className="text-gray-400 mb-8">
            Comprehensive resources to go from <span className="text-white font-medium">absolute beginner</span> to{' '}
            <span className="text-white font-medium">advanced global educator</span>.
          </p>

          {/* Stats Section */}
          <div className="flex items-center gap-4 mb-8">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(to bottom right, var(--color-glow), var(--color-glow-hover))' }}
            >
              <svg style={{ color: 'var(--color-accent)' }} className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-white">
                <span className="font-bold text-lg">49,100 Students</span>{' '}
                <span className="text-gray-400">already enrolled</span>
              </p>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-400 text-sm">on</span>
                <span className="text-teal-400 text-sm font-medium">Trustpilot</span>
              </div>
            </div>
          </div>

          {/* Video Preview & Price Card */}
          <div className="flex flex-col sm:flex-row items-stretch gap-0 rounded-xl overflow-hidden max-w-md">
            {/* Video Preview */}
            <div 
              className="relative w-full sm:w-48 h-32 flex items-center justify-center group cursor-pointer"
              style={{ background: 'linear-gradient(to bottom right, var(--color-secondary), #1f2937)' }}
            >
              <div 
                className="absolute inset-0" 
                style={{ background: 'linear-gradient(to bottom right, var(--color-glow), rgba(236, 72, 153, 0.2))' }}
              ></div>
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              {/* Decorative elements */}
              <div className="absolute bottom-2 left-2 w-8 h-8 rounded bg-orange-500/30"></div>
              <div 
                className="absolute top-2 right-2 w-6 h-6 rounded"
                style={{ backgroundColor: 'var(--color-glow)' }}
              ></div>
            </div>
            
            {/* Price Card */}
            <div className="bg-gray-800/80 backdrop-blur-sm px-6 py-4 flex flex-col justify-center">
              <p className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>Free</p>
              <p className="text-gray-400 text-sm">Access for life. Join now!</p>
            </div>
          </div>
        </div>

        {/* Right Content - 3D Illustration */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative">
            {/* Main Image Container */}
            <div 
              className="w-full max-w-lg lg:max-w-xl rounded-2xl overflow-hidden p-1"
              style={{ background: 'linear-gradient(to bottom right, var(--color-glow), rgba(236, 72, 153, 0.3))' }}
            >
              <div className="relative aspect-square bg-gradient-to-br from-[#1a1a3e] to-[#2d1b4e] rounded-xl overflow-hidden">
                {/* Placeholder for 3D illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div 
                      className="w-32 h-32 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(to bottom right, rgba(236, 72, 153, 0.3), var(--color-glow))' }}
                    >
                      <svg style={{ color: 'var(--color-accent)' }} className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <p className="text-4xl font-bold text-white/30">01</p>
                    <p style={{ color: 'var(--color-accent)', opacity: 0.5 }} className="text-lg">Basics</p>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/10"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded bg-pink-500/20"></div>
                <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded bg-yellow-500/20"></div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 border border-white/10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-glow)' }}
              >
                <svg style={{ color: 'var(--color-accent)' }} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 border border-white/10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeSection
