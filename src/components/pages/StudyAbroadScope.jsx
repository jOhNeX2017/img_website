const StudyAbroadScope = () => {
  return (
    <section id="study" className="max-w-full mx-auto mt-16 scroll-mt-24">
      <div className="glass-card p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          <span className="bg-theme-gradient-text">
            Study Abroad Scope
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-6">
          Explore global education opportunities and expand your horizons.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="text-white font-semibold">Weekly Contest</h3>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-white font-semibold">Speed Rounds</h3>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-white font-semibold">Skill Tests</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudyAbroadScope
