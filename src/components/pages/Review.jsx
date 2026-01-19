import { useState } from 'react'

const Review = ({ onBack }) => {
  const [activeFilter, setActiveFilter] = useState('all')

  const testimonials = [
    {
      id: 1,
      name: 'SahilK027',
      handle: '@SahilK027',
      avatar: 'https://ui-avatars.com/api/?name=SK&background=7c3aed&color=fff',
      content: 'Evolved My Crystal Bird 🦅 into Crystal Horse. 🐴',
      institution: 'IIT Delhi',
      type: 'student'
    },
    {
      id: 2,
      name: 'Shubham Yelekar',
      handle: '@shubu_y',
      avatar: 'https://ui-avatars.com/api/?name=SY&background=a855f7&color=fff',
      content: 'Threejs journey christmas challenge : WIP Re-modeled the cat',
      institution: 'MIT Pune',
      type: 'student'
    },
    {
      id: 3,
      name: 'Priya Sharma',
      handle: '@priya_dev',
      avatar: 'https://ui-avatars.com/api/?name=PS&background=6d28d9&color=fff',
      content: 'Our students at Delhi Technical University have been excelling with Imoveglobal courses. 15 placements this month! 🎉',
      institution: 'Delhi Technical University',
      type: 'institution'
    },
    {
      id: 4,
      name: 'Rahul Verma',
      handle: '@rahul_3d',
      avatar: 'https://ui-avatars.com/api/?name=RV&background=7c3aed&color=fff',
      content: 'Just completed the advanced React course. The projects were amazing! 🚀',
      institution: 'BITS Pilani',
      type: 'student'
    },
    {
      id: 5,
      name: 'Dr. Anjali Mehta',
      handle: '@anjali_edu',
      avatar: 'https://ui-avatars.com/api/?name=AM&background=a855f7&color=fff',
      content: 'As Training Head at NIT Trichy, I recommend Imoveglobal to all our CSE students. Excellent curriculum! ⭐',
      institution: 'NIT Trichy',
      type: 'institution'
    },
    {
      id: 6,
      name: 'Arjun Reddy',
      handle: '@arjun_codes',
      avatar: 'https://ui-avatars.com/api/?name=AR&background=6d28d9&color=fff',
      content: 'From zero to full-stack developer in 6 months. Thank you Imoveglobal! 💪',
      institution: 'VIT Vellore',
      type: 'student'
    },
  ]

  const filters = [
    { key: 'all', label: 'All Stories' },
    { key: 'student', label: 'Students' },
    { key: 'institution', label: 'Institutions' },
  ]

  const filteredTestimonials = activeFilter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.type === activeFilter)

  return (
    <section id="reviews" className="max-w-full mx-auto mt-24 scroll-mt-24">
      <div className="max-w-full mx-auto">
        {/* Back Button */}
        {/* <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button> */}

        {/* Header Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="text-4xl sm:text-5xl font-bold text-white mb-3">
            Reviews of Institutions & success stories
          </div>
          <p style={{ color: 'var(--color-accent)' }} className="text-xl font-bold mb-6">
            Wall of Fame
          </p>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4">
            <span className="text-[var(--color-primary)] font-bold">49,089 Students</span> have joined the course already! 
            Here's a collection of what they're building.
          </p>
          <p className="text-gray-400">
            Use the <a href="#" style={{ color: 'var(--color-accent)' }} className="hover:opacity-80 underline font-bold transition-opacity">#ImoveglobalJourney</a> hashtag on Twitter
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-[rgba(255,255,255,0.05)] rounded-full p-1">
            {filters?.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'btn-gradient'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials?.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="glass-card p-5 transition-all duration-300 hover:transform hover:scale-[1.02] animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-white font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.handle} · <span style={{ color: 'var(--color-accent)' }}>Follow</span></p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>

              {/* Content */}
              <p className="text-gray-200 mb-4 leading-relaxed">{testimonial.content}</p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {testimonial.institution}
                </span>
                <span 
                  className={`text-xs px-2 py-1 rounded-full ${
                    testimonial.type === 'institution' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                  style={testimonial.type === 'institution' ? { 
                    backgroundColor: 'var(--color-glow)',
                    color: 'var(--color-accent)'
                  } : {}}
                >
                  {testimonial.type === 'institution' ? 'Institution' : 'Student'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-gradient text-sm">
            Load More Stories
          </button>
        </div>
      </div>
    </section>
  )
}

export default Review
