import { useContent } from '../../context/ContentContext'
import { useState } from 'react'

const ExamsSection = () => {
  const { exams } = useContent()
  const [activeTab, setActiveTab] = useState('academic')
  
  const ieltsModules = [
    {
      id: "listening",
      title: 'Listening',
      duration: '30 mins + 10 mins',
      questions: '40 Questions',
      description: 'Four recorded monologues and conversations with increasing difficulty.',
      details: ['Section 1: Everyday social context', 'Section 2: Social monologue', 'Section 3: Educational/Training context', 'Section 4: Academic subject monologue'],
      icon: '�',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: "reading",
      title: 'Reading',
      duration: '60 mins',
      questions: '40 Questions',
      description: 'Three long texts which range from the descriptive and factual to the discursive and analytical.',
      details: ['Academic: Journals, books, research', 'General: Notices, ads, handbooks', 'Tests reading for gist & main ideas', 'Skills: Scanning and logical argument'],
      icon: '📖',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: "writing",
      title: 'Writing',
      duration: '60 mins',
      questions: '2 Tasks',
      description: 'Formal and descriptive writing tasks designed to assess proficiency levels.',
      details: ['Task 1: Report/Letter (150 words)', 'Task 2: Essay (250 words)', 'Assesses response and grammar', 'Tests coherence and cohesion'],
      icon: '✍️',
      color: 'from-orange-500/20 to-red-500/20'
    },
    {
      id: "speaking",
      title: 'Speaking',
      duration: '11–14 mins',
      questions: '3 Parts',
      description: 'Face-to-face interview with an examiner to assess communication skills.',
      details: ['Part 1: Introduction & familiar topics', 'Part 2: Long turn (Cue card)', 'Part 3: Two-way discussion', 'Assesses fluency and pronunciation'],
      icon: '🗣️',
      color: 'from-emerald-500/20 to-teal-500/20'
    }
  ]

  const bandScores = [
    { band: '9', skill: 'Expert', desc: 'Full command, accurate, fluent.' },
    { band: '8', skill: 'Very Good', desc: 'Fully operational command with rare inaccuracies.' },
    { band: '7', skill: 'Good', desc: 'Operational command, handles complex language well.' },
    { band: '6', skill: 'Competent', desc: 'Effective command despite some inaccuracies.' },
    { band: '5', skill: 'Modest', desc: 'Partial command, copies with overall meaning.' }
  ]
  
  return (
    <section id="exams" className="max-w-full mx-auto mt-8 scroll-mt-20">
      <div className="glass-card p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[28px] md:text-[54px] font-bold text-white mb-6 leading-tight">
            Professional <span className="text-[var(--color-primary)]">IELTS / TOEFL</span> Preparation
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Master the most recognized English proficiency test. Whether you're pursuing higher education 
            or global career opportunities, our structured approach ensures you hit your target band score.
          </p>
        </div>

        {/* Academic vs General Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 p-1 rounded-2xl border border-white/10 flex gap-2">
            <button 
              onClick={() => setActiveTab('academic')}
              className={`tab-button px-8 py-3 rounded-xl transition-all duration-300 font-semibold ${activeTab === 'academic' ? 'active' : ''}`}
            >
              Academic
            </button>
            <button 
              onClick={() => setActiveTab('general')}
              className={`tab-button px-8 py-3 rounded-xl transition-all duration-300 font-semibold ${activeTab === 'general' ? 'active' : ''}`}
            >
              General Training
            </button>
          </div>
        </div>

        {/* Comparison Context */}
        <div className="mb-12 text-center animate-fadeIn">
          {activeTab === 'academic' ? (
            <p className="text-purple-300 bg-purple-500/10 inline-block px-6 py-2 rounded-full border border-purple-500/20">
              Ideal for <span className="font-bold">University Admission</span> and Professional Registration.
            </p>
          ) : (
            <p className="text-emerald-300 bg-emerald-500/10 inline-block px-6 py-2 rounded-full border border-emerald-500/20">
              Ideal for <span className="font-bold">Migration</span>, Work Experience, or Secondary Education.
            </p>
          )}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {ieltsModules.map((module, index) => (
            <div 
              key={module.id} 
              className={`p-8 rounded-3xl bg-gradient-to-br ${module.color} border border-white/10 hover:border-white/20 transition-all duration-500 group relative overflow-hidden`}
              style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-5xl group-hover:scale-110 transition-transform duration-500">{module.icon}</div>
                <div className="text-right">
                  <div className="text-white font-bold text-xl">{module.title}</div>
                  <div className="text-purple-400 text-sm font-medium">{module.duration}</div>
                </div>
              </div>
              
              <p className="text-gray-200 mb-6 font-medium">{module.description}</p>
              
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider text-gray-100 font-bold mb-2">Key Areas</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {module.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Band Scores Guide */}
        <div className="mt-20">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">IELTS Band Score Guide</h3>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {bandScores.map((score, index) => (
              <div 
                key={score.band}
                className="glass-card p-6 border border-white/5 hover:border-purple-500/30 transition-all"
                style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
              >
                <div className="text-4xl font-bold text-purple-400 mb-2">Band {score.band}</div>
                <div className="text-white font-semibold mb-2">{score.skill}</div>
                <p className="text-gray-100 text-xs leading-relaxed">{score.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExamsSection
