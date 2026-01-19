import { useState } from 'react'
import ForMyselfForm from '../forms/ForMyselfForm'
import ForInstituteForm from '../forms/ForInstituteForm'
import StepTwo from '../forms/StepTwo'

const Registration = () => {
  const [activeTab, setActiveTab] = useState('myself')
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})

  const handleNext = () => {
    setCurrentStep(2)
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentStep(1)
    setFormData({})
  }

  return (
    <section id="registration" className="max-w-2xl mx-auto mt-16 scroll-mt-24">
      {/* Title Section */}
      <div className="text-center mb-10 animate-fadeIn">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Collaborate with{' '}
          <span className="bg-theme-gradient-text">
            Imoveglobal
          </span>
        </h1>
        <p className="text-gray-400 text-lg">
          Join our partnership program and grow together
        </p>
      </div>

      {/* Form Card */}
      <div className="glass-card p-6 sm:p-8 md:p-10 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div style={{ color: currentStep === 1 ? 'var(--color-accent)' : '#6b7280' }} className="flex items-center gap-2">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep === 1 
                  ? 'text-white' 
                  : 'bg-gray-700 text-gray-400'
              }`}
              style={currentStep === 1 ? { background: 'var(--gradient-primary)' } : {}}
            >
              1
            </div>
            <span className="hidden sm:inline text-sm font-medium">Details</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-700">
            <div 
              className={`h-full transition-all duration-500 ${
                currentStep === 2 ? 'w-full' : 'w-0'
              }`}
              style={{ backgroundColor: 'var(--color-primary)' }}
            ></div>
          </div>
          <div style={{ color: currentStep === 2 ? 'var(--color-accent)' : '#6b7280' }} className="flex items-center gap-2">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep === 2 
                  ? 'text-white' 
                  : 'bg-gray-700 text-gray-400'
              }`}
              style={currentStep === 2 ? { background: 'var(--gradient-primary)' } : {}}
            >
              2
            </div>
            <span className="hidden sm:inline text-sm font-medium">Availability</span>
          </div>
        </div>

        {/* Tab Navigation - Only show on Step 1 */}
        {currentStep === 1 && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-[rgba(255,255,255,0.05)] rounded-full p-1">
              <button
                onClick={() => handleTabChange('myself')}
                className={`tab-button flex items-center gap-2 ${activeTab === 'myself' ? 'active' : ''}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                For myself
              </button>
              <button
                onClick={() => handleTabChange('institute')}
                className={`tab-button flex items-center gap-2 ${activeTab === 'institute' ? 'active' : ''}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                For my Institute
              </button>
            </div>
          </div>
        )}

        {/* Form Content */}
        {currentStep === 1 ? (
          activeTab === 'myself' ? (
            <ForMyselfForm 
              onNext={handleNext} 
              formData={formData} 
              setFormData={setFormData} 
            />
          ) : (
            <ForInstituteForm 
              onNext={handleNext} 
              formData={formData} 
              setFormData={setFormData} 
            />
          )
        ) : (
          <StepTwo 
            onBack={handleBack} 
            formData={formData} 
            setFormData={setFormData}
            userType={activeTab}
          />
        )}
      </div>

      {/* Footer Note */}
      <p className="text-center text-gray-500 text-sm mt-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        By registering, you agree to our partnership terms and conditions
      </p>
    </section>
  )
}

export default Registration