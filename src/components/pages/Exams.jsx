const LessonsSection = () => {
  return (
    <section id="exams" className="max-w-full mx-auto mt-12 scroll-mt-24">
      <div className="glass-card p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          <span className="bg-theme-gradient-text">
            Exams
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-6">
          Explore our comprehensive learning modules designed to help you master new skills.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-white font-semibold mb-2">Getting Started</h3>
            <p className="text-gray-400 text-sm">Learn the fundamentals and build a strong foundation.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-white font-semibold mb-2">Advanced Topics</h3>
            <p className="text-gray-400 text-sm">Dive deeper into complex concepts and techniques.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LessonsSection
