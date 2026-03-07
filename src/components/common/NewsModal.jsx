import { useEffect } from 'react'

const NewsModal = ({ isOpen, onClose, item }) => {
    // Close modal on Escape key press
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden' // Prevent background scrolling
        }
        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen || !item) return null

    // Format description: replace /n with actual line breaks
    const formatDescription = (text) => {
        if (!text) return ''
        return text.split('/n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
                {paragraph}
            </p>
        ))
    }

    const getImageUrl = (item) =>{
        if (item.description_image) return item.description_image
        if (item.image) return item.image
        return null;
    }

    // Category colors matching the main component
    const categoryColors = {
        BLOG: 'from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-300',
        NEWS: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/30 text-emerald-300',
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
        >
            {/* Modal Content */}
            <div
                className="relative w-full h-full overflow-y-auto bg-[#0a1420] animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="fixed top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group backdrop-blur-md"
                    aria-label="Close modal"
                >
                    <svg
                        className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Modal Body */}
                <div className="max-w-4xl mx-auto px-6 py-16 md:px-12 md:py-24">
                    {/* Category Badge */}
                    <div className="mb-6">
                        <span
                            className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r border text-xs font-bold uppercase tracking-wider ${
                                categoryColors[item.category] || 'from-white/10 to-white/5 border-white/20 text-white'
                            }`}
                        >
                            {item.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {item.title}
                    </h1>

                    {/* Date */}
                    <p className="text-gray-400 text-lg mb-8">{item.date}</p>

                    {/* Featured Image */}
                    {(getImageUrl(item)) && (
                        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                            <img
                                src={getImageUrl(item)}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1420] via-transparent to-transparent" />
                        </div>
                    )}

                    {/* Description Content */}
                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="text-gray-300 leading-relaxed text-base md:text-lg">
                            {formatDescription(item.description)}
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <button
                            onClick={onClose}
                            className="btn-gradient px-8 py-3 text-sm font-bold uppercase tracking-widest inline-flex items-center gap-2 group"
                        >
                            <svg
                                className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Back to All Posts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsModal
