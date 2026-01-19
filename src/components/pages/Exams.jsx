import { useContent } from '../../context/ContentContext'

const LessonsSection = () => {
  const { exams } = useContent()
  
  return (
    <section id="exams" className="max-w-full mx-auto mt-12 scroll-mt-24">
      <div className="glass-card p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          <span className="bg-theme-gradient-text">
            {exams?.title || 'Exams'}
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-6">
          {exams?.description || 'Explore our comprehensive learning modules designed to help you master new skills.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(exams?.modules || [
            { id: 1, title: 'Getting Started', description: 'Learn the fundamentals and build a strong foundation.' },
            { id: 2, title: 'Advanced Topics', description: 'Dive deeper into complex concepts and techniques.' }
          ]).map((module) => (
            <div key={module.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-white font-semibold mb-2">{module.title}</h3>
              <p className="text-gray-400 text-sm">{module.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LessonsSection
