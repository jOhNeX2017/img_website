import { useState } from 'react'
import { useContent } from '../../context/ContentContext'

const Review = ({ onBack }) => {
  const [activeFilter, setActiveFilter] = useState('all')
  const { reviews, brand } = useContent()

  const defaultTestimonials = [
    {
      id: 1,
      name: 'User',
      handle: '@user',
      avatar: 'https://ui-avatars.com/api/?name=U&background=7c3aed&color=fff',
      content: 'Great experience!',
      institution: 'University',
      type: 'student'
    }
  ]

  const testimonials = reviews?.testimonials || defaultTestimonials
  const filters = reviews?.filters || [
    { key: 'all', label: 'All Stories' },
    { key: 'student', label: 'Students' },
    { key: 'institution', label: 'Institutions' },
  ]

  const filteredTestimonials = activeFilter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.type === activeFilter)

  return (
    <section id="reviews" className="max-w-full mx-auto mt-8 scroll-mt-20">
      <div className="glass-card p-8 md:p-12">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="text-[28px] md:text-[44px] font-bold text-white mb-3">
            {reviews?.title || 'Reviews of Institutions & success stories'}
          </div>
          <p style={{ color: 'var(--color-accent)' }} className="text-xl font-bold mb-6">
            {reviews?.subtitle || 'Wall of Fame'}
          </p>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4">
            <span className="text-[var(--color-primary)] font-bold">{reviews?.studentCount || '49,089 Students'}</span> {reviews?.description || "have joined the course already! Here's a collection of what they're building."}
          </p>
          <p className="text-gray-10">
            Use the <a href="#" style={{ color: 'var(--color-accent)' }} className="hover:opacity-80 underline font-bold transition-opacity">{reviews?.hashtag || `#${brand?.name || 'Brand'}Journey`}</a> hashtag on {reviews?.hashtagPlatform || 'Twitter'}
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
                    : 'text-gray-10 hover:text-white hover:bg-white/5'
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
                    <p className="text-gray-10 text-sm">{testimonial.handle} • <span style={{ color: 'var(--color-accent)' }}>Follow</span></p>
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
      </div>
    </section>
  )
}

export default Review
