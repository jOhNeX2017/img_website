const JobDetailsPopover = ({ isOpen, onClose }) => {
    if (!isOpen) return null

    return (
        <div
            className="absolute bottom-full left-0 mb-3 w-80 rounded-2xl border border-white/10 bg-gray-900/95 p-5 text-gray-300 text-sm shadow-2xl animate-fadeIn z-[200]"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Small arrow pointing down */}
            <div className="absolute left-4 -bottom-2 w-3 h-3 rotate-45 border-r border-b border-white/10 bg-gray-900" />
            <button
                type="button"
                aria-label="Close information"
                className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                onClick={onClose}
            >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h3 className="text-white text-sm font-semibold mb-2">
                Share Your Resume &amp; Job Details
            </h3>
            <p className="mb-2 text-xs">
                Please upload your resume and provide the following information to help us process your application:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-2 text-xs">
                <li><span className="font-semibold text-white">Job Title</span></li>
                <li><span className="font-semibold text-white">Qualification</span></li>
                <li><span className="font-semibold text-white">Location</span></li>
                <li><span className="font-semibold text-white">Detailed Responsibilities</span></li>
            </ul>
            <p className="text-xs">
                Once completed, please send the details along with your resume to{' '}
                <strong className="text-white">info@imoveglobal.org</strong>.
            </p>
        </div>
    )
}

export default JobDetailsPopover
