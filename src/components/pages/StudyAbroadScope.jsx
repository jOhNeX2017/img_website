import { useContent } from '../../context/ContentContext'

const ExamsSection = () => {
  const { exams } = useContent()
  
  const benefits = [
    {
      id: 1,
      title: 'Career Prospects',
      description: '97% of study abroad students land a job within a year - nearly double the rate of those who stayed local.',
      icon: '🎓'
    },
    {
      id: 2,
      title: 'Higher Earnings',
      description: 'International students earn 17% more than peers who didn\'t study abroad, with 20-30% higher starting salaries.',
      icon: '💰'
    },
    {
      id: 3,
      title: 'Global Networking',
      description: 'Build professional networks worldwide and access global opportunities through alumni connections.',
      icon: '🌐'
    },
    {
      id: 4,
      title: 'Quality Education',
      description: 'Access top-ranked universities like Harvard, MIT, and Oxford with world-class resources and research facilities.',
      icon: '📚'
    },
    {
      id: 5,
      title: 'Financial Management',
      description: 'Develop budgeting skills and financial discipline while managing expenses independently abroad.',
      icon: '💳'
    },
    {
      id: 6,
      title: 'Language Mastery',
      description: 'Improve language skills by 40-50% within six months through daily immersion in academic and social settings.',
      icon: '🗣️'
    },
    {
      id: 7,
      title: 'Personal Growth',
      description: 'Build resilience, independence, and self-confidence by navigating challenges in a foreign environment.',
      icon: '🌱'
    },
    {
      id: 8,
      title: 'Cultural Diversity',
      description: 'Gain cross-cultural understanding and appreciation by experiencing different perspectives and traditions.',
      icon: '🌍'
    }
  ]
  
  return (
    <section id="exams" className="max-w-full mx-auto mt-12 scroll-mt-24">
      <div className="glass-card p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-[28px] md:text-[44px] font-bold text-white mb-3">
              Benefits of Studying Abroad
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Studying abroad offers Indian students unique career and personal growth opportunities. 
            Research shows international students can expect to earn <span className="font-semibold text-white">17% more</span> than 
            peers who didn't study abroad.
          </p>
        </div>

        {/* Did You Know Section */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Did You Know?</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
             <span style={{ color: 'var(--color-accent)' }}>•</span>
              <span>
                <span className="font-semibold text-white">97%</span> of study abroad students land a job{' '}
                <span className="font-semibold text-white">within a year</span> after graduation - nearly double 
                the rate of those who stayed local, at just <span className="font-semibold text-white">49%</span>!
              </span>
            </li>
            <li className="flex items-start">
              <span style={{ color: 'var(--color-accent)' }}>•</span>
              <span>
                Students who study abroad earn{' '}
                <span className="font-semibold text-white">on average 25% more</span> than their peers who don't, 
                with the income gap particularly notable in fields like sociology, computer science, and engineering.
              </span>
            </li>
          </ul>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.id} 
              className="glass-card p-6 rounded-2xl bg-white/5 border border-white/10 benefit-card-hover animate-premiumFadeInUp group"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="icon-container text-4xl mb-4 group-hover:scale-125 transition-transform duration-500 animate-floating inline-block">
                {benefit.icon}
              </div>
              <div className="relative z-10">
                <h3 className="text-white font-bold mb-3 text-xl group-hover:text-[var(--color-accent)] transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-300 text-base">
            Countries like <span className="font-semibold text-white">Canada</span> and{' '}
            <span className="font-semibold text-white">Australia</span> offer world-class education 
            and clear pathways to <span className="font-semibold text-white">Permanent Residency (PR)</span>, 
            helping you build long-term careers abroad.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ExamsSection
