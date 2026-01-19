import { useState } from 'react'

const InstitutionalScholarships = () => {
  const [showInfo, setShowInfo] = useState(false)

  const scholarships = [
    {
      id: 1,
      title: 'Global Excellence Scholarship',
      institution: 'Oxford University',
      date: '15 February 2026',
      description: 'Full scholarship for international students pursuing masters degree.',
      image: null,
      socialLinks: { twitter: '#', linkedin: '#' }
    },
    {
      id: 2,
      title: 'STEM Innovation Grant',
      institution: 'MIT Foundation',
      date: '20 January 2026',
      description: 'Research funding for innovative STEM projects.',
      image: null,
      socialLinks: { twitter: '#', linkedin: '#' }
    },
    {
      id: 3,
      title: 'Cultural Exchange Program',
      institution: 'European Council',
      date: '10 March 2026',
      description: 'Funded exchange program across European universities.',
      image: null,
      socialLinks: { twitter: '#', linkedin: '#' }
    },
    {
      id: 4,
      title: 'Leadership Fellowship',
      institution: 'Harvard Business School',
      date: '05 April 2026',
      description: 'Executive education fellowship for emerging leaders.',
      image: null,
      socialLinks: { twitter: '#', linkedin: '#' }
    },
  ]

  return (
    <section id="scholarships" className="max-w-full mx-auto mt-16 mb-16 scroll-mt-24">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3">
          Institutional Scholarships & Events
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4">
          A selection of the best scholarships and events curated by Imoveglobal's partners.
        </p>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          style={{ color: 'var(--color-accent)' }}
          className="hover:opacity-80 underline text-sm font-medium transition-opacity"
        >
          How does it work?
        </button>
        
        {/* Info Dropdown */}
        {showInfo && (
          <div className="mt-4 p-4 bg-white/5 rounded-xl max-w-lg mx-auto text-left text-gray-300 text-sm animate-fadeIn">
            <p className="mb-2"><span style={{ color: 'var(--color-accent)' }} className="font-semibold">1.</span> Browse available scholarships and events</p>
            <p className="mb-2"><span style={{ color: 'var(--color-accent)' }} className="font-semibold">2.</span> Click on any card to view full details</p>
            <p><span style={{ color: 'var(--color-accent)' }} className="font-semibold">3.</span> Apply directly through the institution</p>
          </div>
        )}
      </div>

      {/* Scholarship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {scholarships.map((scholarship) => (
          <div 
            key={scholarship.id}
            className="group relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
            style={{ background: 'linear-gradient(to bottom right, #1a1a3e, #2d1b4e)' }}
          >
            <div className="flex flex-col sm:flex-row">
              {/* Image/Placeholder Section */}
              <div 
                className="relative w-full sm:w-1/2 h-48 sm:h-auto overflow-hidden"
                style={{ background: 'linear-gradient(to bottom right, var(--color-secondary), rgba(236, 72, 153, 0.3))' }}
              >
                {/* Decorative Background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-full h-full" 
                    style={{ background: 'linear-gradient(to bottom right, var(--color-glow), rgba(236, 72, 153, 0.2))' }}
                  ></div>
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-lg bg-orange-500/30 transform rotate-12"></div>
                  <div className="absolute bottom-6 right-6 w-8 h-8 rounded bg-teal-500/30"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="text-center">
                      <p className="text-white/80 font-bold text-lg">{scholarship.institution.split(' ')[0]}</p>
                      <p style={{ color: 'var(--color-accent)', opacity: 0.6 }} className="text-sm">{scholarship.institution.split(' ').slice(1).join(' ')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: 'var(--color-glow)' }}
                ></div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-5">
                {/* Date & Social Links */}
                <div className="flex items-center justify-between mb-3">
                  <span style={{ color: 'var(--color-accent)' }} className="text-sm font-medium">
                    {scholarship.date}
                  </span>
                  <div className="flex items-center gap-2">
                    <a href={scholarship.socialLinks.twitter} className="text-gray-400 hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a href={scholarship.socialLinks.linkedin} className="text-gray-400 hover:text-blue-400 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-lg mb-1 transition-colors" style={{ ':hover': { color: 'var(--color-accent)' } }}>
                  {scholarship.title}
                </h3>

                {/* Institution */}
                <p style={{ color: 'var(--color-accent)' }} className="font-medium text-sm mb-3">
                  {scholarship.institution}
                </p>

                {/* Description */}
                <p className="text-gray-400 text-sm line-clamp-2">
                  {scholarship.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-10">
        <button className="btn-gradient px-8 py-3 text-sm font-medium">
          View All Scholarships & Events
        </button>
      </div>
    </section>
  )
}

export default InstitutionalScholarships
