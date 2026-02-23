import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const publications = [
    {
        id: 1,
        category: 'PUBLICATION',
        title: 'Human in the Loop: Human-centered AI accelerates discovery of knowledge from digital-based large-scale educational assessments',
        excerpt:
            'Discover how integrating human expertise with AI-driven analysis is transforming large-scale educational assessments worldwide.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
        date: 'February 2026',
        readTime: '6 min read',
        tag: 'AI & Education',
    },
    {
        id: 2,
        category: 'PUBLICATION',
        title: 'The Decoding Threshold: Measuring the Roots of Older Students\' Reading Difficulties: New Evidence',
        excerpt:
            'New longitudinal evidence sheds light on the foundational decoding skills that predict reading difficulties in secondary school students.',
        image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80',
        date: 'January 2026',
        readTime: '8 min read',
        tag: 'Reading Research',
    },
    {
        id: 3,
        category: 'PUBLICATION',
        title: 'Charting the Future of Assessments',
        excerpt:
            'A forward-looking analysis of how assessment frameworks must evolve to meet the demands of a rapidly globalising education landscape.',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
        date: 'December 2025',
        readTime: '5 min read',
        tag: 'Future of Testing',
    },
    {
        id: 4,
        category: 'BLOG',
        title: 'Why English Proficiency Matters More Than Ever for Global Mobility',
        excerpt:
            'Exploring the critical role English proficiency plays in unlocking study abroad opportunities, scholarships, and long-term career growth.',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
        date: 'November 2025',
        readTime: '4 min read',
        tag: 'Global Mobility',
    },
    {
        id: 5,
        category: 'NEWS',
        title: 'Imoveglobal Partners with 50+ Institutions Across 12 Countries',
        excerpt:
            'Our growing international network now spans 12 countries, enabling more students to access globally recognised English assessments.',
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
        date: 'October 2025',
        readTime: '3 min read',
        tag: 'Partnerships',
    },
    {
        id: 6,
        category: 'RESEARCH',
        title: 'Measuring Cross-Cultural Communication Competency in Test Design',
        excerpt:
            'How modern test design is adapting to measure culturally neutral communication skills that prepare students for international environments.',
        image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&q=80',
        date: 'September 2025',
        readTime: '7 min read',
        tag: 'Test Design',
    },
]

const categories = ['ALL', 'PUBLICATION', 'BLOG', 'NEWS', 'RESEARCH']

const categoryColors = {
    PUBLICATION: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30 text-blue-300',
    BLOG: 'from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-300',
    NEWS: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/30 text-emerald-300',
    RESEARCH: 'from-amber-500/20 to-orange-500/20 border-amber-400/30 text-amber-300',
}

const Commitments = () => {
    const navigate = useNavigate()
    const [activeCategory, setActiveCategory] = useState('ALL')

    const filtered =
        activeCategory === 'ALL'
            ? publications
            : publications.filter((p) => p.category === activeCategory)

    return (
        <section id="insights" className="max-w-full mx-auto mt-8 scroll-mt-20">
            <div className="glass-card p-8 md:p-12">

                {/* ── Header ── */}
                <div className="text-center mb-12">
                    <h1 className="text-[28px] md:text-[44px] font-bold text-white leading-tight mb-4">
                        Our{' '}
                        <span className="bg-theme-gradient-text">Commitments</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-4xl mx-auto">
                        We believe every child deserves access to quality English education. A portion of our revenue is dedicated to supporting students from underprivileged backgrounds through subsidized testing, scholarships, and skill-development programs.
                    </p>
                </div>

                {/* ── Category Filter Tabs ── */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex bg-[rgba(255,255,255,0.05)] rounded-full p-1">
                        {categories?.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveCategory(filter)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === filter
                                    ? 'btn-gradient'
                                    : 'text-gray-10 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Publication Cards Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filtered.map((item, index) => (
                        <div
                            key={item.id}
                            className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 group hover:shadow-2xl benefit-card-hover animate-premiumFadeInUp"
                            style={{
                                backdropFilter: 'blur(20px)',
                                background: 'rgba(255,255,255,0.04)',
                                animationDelay: `${index * 0.1}s`,
                            }}
                        >
                            {/* Thumbnail */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1420] via-[#0a1420]/40 to-transparent" />
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                {/* Meta */}
                                <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                                    <span
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r border text-xs font-bold uppercase tracking-wider ${categoryColors[item.category] || 'from-white/10 to-white/5 border-white/20 text-white'
                                            }`}
                                    >
                                        {item.category}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {item.date}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                                    {item.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
                                    {item.excerpt}
                                </p>

                                {/* Divider */}
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

                                {/* Learn More */}
                                <button
                                    onClick={() => navigate('/registration')}
                                    className="flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/btn"
                                    style={{ color: 'var(--color-accent)' }}
                                >
                                    <span>Learn More</span>
                                    <svg
                                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Bottom CTA ── */}
                <div className="mt-12 text-center">
                    <p className="text-gray-400 text-base mb-6">
                        All this shall be{' '}
                        <span className="font-semibold text-white">coming soon</span> — stay
                        tuned for more research and insights from Imoveglobal.
                    </p>
                    <button
                        onClick={() => navigate('/registration')}
                        className="btn-gradient px-8 py-3 text-sm font-bold uppercase tracking-widest"
                    >
                        Get Notified
                    </button>
                </div>

            </div>
        </section>
    )
}

export default Commitments
