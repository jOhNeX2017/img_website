import { useState } from 'react'

const ForInstituteForm = ({ onNext, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const designations = [
    'Select Designation',
    'Principal',
    'Vice Principal',
    'Dean',
    'HOD',
    'Professor',
    'Associate Professor',
    'Assistant Professor',
    'Lecturer',
    'Training & Placement Officer',
    'Administrator',
    'Other'
  ]

  const indianStates = [
    'Select State',
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Other'
  ]

  return (
    <div className="animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Your Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Official Email *</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="official@institute.edu"
              className="input-field pr-12"
              required
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Contact Number *</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact || ''}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">City *</label>
          <input
            type="text"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            placeholder="Institute city"
            className="input-field"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">State *</label>
          <select
            name="state"
            value={formData.state || ''}
            onChange={handleChange}
            className="select-field"
            required
          >
            {indianStates.map((state) => (
              <option key={state} value={state === 'Select State' ? '' : state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Institute Name *</label>
          <input
            type="text"
            name="institute"
            value={formData.institute || ''}
            onChange={handleChange}
            placeholder="Official institute name"
            className="input-field"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Your Designation *</label>
          <select
            name="designation"
            value={formData.designation || ''}
            onChange={handleChange}
            className="select-field"
            required
          >
            {designations.map((designation) => (
              <option key={designation} value={designation === 'Select Designation' ? '' : designation}>
                {designation}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Reason for Partnership *</label>
          <input
            type="text"
            name="reason"
            value={formData.reason || ''}
            onChange={handleChange}
            placeholder="Why do you want to partner?"
            className="input-field"
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6 mb-6">
        <input
          type="checkbox"
          name="terms"
          id="instituteTerms"
          checked={formData.terms || false}
          onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.checked }))}
          className="custom-checkbox mt-1 shrink-0"
          required
        />
        <label htmlFor="instituteTerms" className="text-sm text-gray-400 cursor-pointer">
          I acknowledge and agree to the{' '}
          <a href="#" style={{ color: 'var(--color-accent)' }} className="hover:opacity-80 underline transition-opacity">
            General Conditions of Sale and Use
          </a>
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          type="button"
          className="flex-1 py-3 px-6 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300"
        >
          Submit Details
        </button>
        <button
          type="button"
          onClick={onNext}
          className="btn-gradient flex-1"
        >
          Next step
        </button>
      </div>
    </div>
  )
}

export default ForInstituteForm
