/**
 * Form Submission Service
 * Handles form submissions to Google Apps Script
 */

// This will be replaced with your actual Google Apps Script Web App URL
const SCRIPT_URL = import.meta.env.VITE_FORM_SCRIPT_URL || 'YOUR_GOOGLE_SCRIPT_URL_HERE'
const SUBMISSION_TOKEN = import.meta.env.VITE_FORM_SUBMISSION_TOKEN || 'YOUR_FORM_TOKEN_HERE'

/**
 * Format form data for email
 */
const formatFormData = (data, userType) => {
  const timestamp = new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long'
  })

  if (userType === 'institute') {
    return {
      type: 'Institute Registration',
      timestamp,
      fields: {
        'Name': data.name,
        'Email': data.email,
        'Contact': data.contact,
        'City': data.city,
        'State': data.state,
        'Institute': data.institute,
        'Designation': data.designation,
        'Reason for Partnership': data.reason,
        'Mode of Communication': data.communicationMode,
        'Preferred Time': data.preferredTime,
        'Student Count': data.studentCount || 'N/A',
        'Additional Notes': data.notes || 'None'
      }
    }
  } else {
    return {
      type: 'Individual Registration',
      timestamp,
      fields: {
        'Name': data.name,
        'Email': data.email,
        'Contact': data.contact,
        'City': data.city,
        'State': data.state,
        'Institute': data.institute,
        'Education Level': data.education,
        'Reason for Partnership': data.reason,
        'Mode of Communication': data.communicationMode,
        'Preferred Time': data.preferredTime,
        'Additional Notes': data.notes || 'None'
      }
    }
  }
}

/**
 * Submit form data to Google Apps Script
 */
export const submitForm = async (formData, userType) => {
  try {
    const formattedData = formatFormData(formData, userType)
    
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Important for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formattedData,
        token: SUBMISSION_TOKEN
      })
    })

    // Note: With 'no-cors' mode, we can't read the response
    // But if no error is thrown, the submission was successful
    return {
      success: true,
      message: 'Form submitted successfully!'
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return {
      success: false,
      message: 'Failed to submit form. Please try again or contact support.',
      error: error.message
    }
  }
}

/**
 * Validate script URL is configured
 */
export const isConfigured = () => {
  const hasUrl = SCRIPT_URL && SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_URL_HERE'
  const hasToken = SUBMISSION_TOKEN && SUBMISSION_TOKEN !== 'YOUR_FORM_TOKEN_HERE'

  return hasUrl && hasToken
}
