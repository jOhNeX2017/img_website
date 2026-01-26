const CareerBoost = () => {
  const features = [
    {
      id: 1,
      icon: '/heart.svg',
      title: 'Enjoy coding like never before',
    },
    {
      id: 2,
      icon: '/goal.svg',
      title: 'Reach out to new clients',
    },
    {
      id: 3,
      icon: '/competition.svg',
      title: 'Stand out against the competition',
    },
    {
      id: 4,
      icon: '/rate.svg',
      title: 'Increase your pay rate',
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
              Capture career opportunities, study abroad, and upgrade your skills
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
                <h3 className="text-lg sm:text-xl font-semibold text-white leading-relaxed max-w-[200px]">
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
