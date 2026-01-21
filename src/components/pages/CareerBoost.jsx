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
      className="max-w-full mx-auto mt-12 scroll-mt-24 relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Boost your creative
            <br />
            developer career
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mt-6">
            It's time to upgrade your front-end skills
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
                className="mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              >
                <img src={feature.icon} alt={feature.title}
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
    </section>
  )
}

export default CareerBoost
