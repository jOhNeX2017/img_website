const CareerBoost = () => {
  const features = [
    {
      id: 1,
      icon: '/heart.svg',
      title: '4-Skill Focused Training Structured improvement in Listening, Reading, Speaking, and Writing, with targeted strategies for each section',
    },
    {
      id: 2,
      icon: '/goal.svg',
      title: 'Performance-Driven Assessment Detailed scoring, band prediction, and feedback to help students identify gaps and improve faster.',
    },
    {
      id: 3,
      icon: '/competition.svg',
      title: 'Result-Oriented Learning Path Practical tips, time-management techniques, and exam hacks that maximize scores in minimum time.',
    },
    {
      id: 4,
      icon: '/rate.svg',
      title: 'If you want, I can also make these *more marketing-oriented, **student-friendly, or *institution-focused',
    },
  ]

  return (
    <section 
      id="career-boost" 
      className="max-w-full mx-auto mt-8 scroll-mt-20"
    >
      <div className="glass-card p-8 md:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-[28px] md:text-[44px] font-bold text-white mb-4">
              Boost Your English and Ace TOEFL/IELTS
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mt-6">
              Exam-Aligned Preparation Content and practice tests are designed strictly as per TOEFL &
              IELTS standards, ensuring real exam familiarity and confidence.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center group cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Icon */}
                <div 
                  className="h-[100px] mb-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                >
                  <img 
                    src={feature.icon} 
                    alt={feature.title}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-white leading-relaxed w-full">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareerBoost
