/**
 * Google Apps Script for Form Submission Handler
 * 
 * This script receives form submissions from your React website,
 * sends email notifications, and can integrate with WhatsApp.
 * 
 * Setup Instructions:
 * 1. Create a new Google Apps Script project at script.google.com
 * 2. Copy this entire code
 * 3. Update the CONFIG object below with your details
 * 4. Deploy as Web App (Deploy > New Deployment > Web App)
 * 5. Set access to "Anyone" and copy the Web App URL
 * 6. Paste the URL in your .env.local file as VITE_FORM_SCRIPT_URL
 */

// ==================== CONFIGURATION ====================

const CONFIG = {
  // Your email address to receive notifications
  EMAIL_TO: 'your-email@example.com',
  
  // Email subject prefix
  EMAIL_SUBJECT_PREFIX: '[IMG Website]',

  // Security token (set the same token in your website env)
  // Use a long random string, e.g. 32+ characters
  SECRET_TOKEN: '',
  
  // Telegram Bot Token - Get from @BotFather on Telegram (FREE & UNLIMITED)
  // Instructions: https://core.telegram.org/bots#6-botfather
  TELEGRAM_BOT_TOKEN: '',
  
  // Your Telegram Chat ID - Get from @userinfobot on Telegram
  // Just send /start to @userinfobot and it will show your ID
  TELEGRAM_CHAT_ID: '',
  
  // Make.com Webhook URL (for WhatsApp via Make automation)
  // Free tier: 1000 operations/month
  // Leave empty if not using Make.com
  MAKE_WEBHOOK_URL: '',
  
  // Google Sheet ID (optional - to store submissions in a spreadsheet)
  // Leave empty if you don't want to use Google Sheets
  SHEET_ID: ''
}

// ==================== MAIN HANDLER ====================

/**
 * Handle POST requests from the website
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents)

    // Validate token when configured
    if (CONFIG.SECRET_TOKEN && data.token !== CONFIG.SECRET_TOKEN) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON)
    }

    // Remove token before processing
    delete data.token
    
    // Log submission
    Logger.log('New form submission received: ' + data.type)
    
    // Send email notification
    sendEmailNotification(data)
    
    // Send Telegram notification (if configured)
    if (CONFIG.TELEGRAM_BOT_TOKEN && CONFIG.TELEGRAM_CHAT_ID) {
      sendTelegramNotification(data)
    }
    
    // Send to Make.com webhook (for WhatsApp or other integrations)
    if (CONFIG.MAKE_WEBHOOK_URL) {
      sendToMakeWebhook(data)
    }
    
    // Save to Google Sheet (if configured)
    if (CONFIG.SHEET_ID) {
      saveToSheet(data)
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)
      
  } catch (error) {
    Logger.log('Error processing form: ' + error.toString())
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('Form submission endpoint is active. Use POST to submit forms.')
    .setMimeType(ContentService.MimeType.TEXT)
}

// ==================== EMAIL NOTIFICATION ====================

/**
 * Send email notification
 */
function sendEmailNotification(data) {
  const subject = `${CONFIG.EMAIL_SUBJECT_PREFIX} ${data.type}`
  const body = formatEmailBody(data)
  
  GmailApp.sendEmail(CONFIG.EMAIL_TO, subject, body, {
    htmlBody: body
  })
  
  Logger.log('Email sent successfully to: ' + CONFIG.EMAIL_TO)
}

/**
 * Format email body with HTML
 */
function formatEmailBody(data) {
  let html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: white; padding: 20px; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
          .field { margin: 15px 0; padding: 10px; background: white; border-radius: 5px; }
          .label { font-weight: bold; color: #667eea; display: block; margin-bottom: 5px; }
          .value { color: #333; }
          .footer { margin-top: 20px; padding: 15px; background: #e9ecef; 
                    border-radius: 5px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;"> ${data.type}</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;">
              ${data.timestamp}
            </p>
          </div>
          <div class="content">
  `
  
  // Add all fields
  for (const [key, value] of Object.entries(data.fields)) {
    html += `
      <div class="field">
        <span class="label">${key}:</span>
        <span class="value">${value}</span>
      </div>
    `
  }
  
  html += `
            <div class="footer">
              <p style="margin: 0;">
                This form was submitted from <strong>Imoveglobal Partnership Registration</strong><br>
                Please respond to the applicant within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
  
  return html
}

// ==================== TELEGRAM NOTIFICATION ====================

/**
 * Send Telegram notification (FREE & UNLIMITED)
 * Setup: https://core.telegram.org/bots#6-botfather
 */
function sendTelegramNotification(data) {
  try {
    const message = formatTelegramMessage(data)
    
    const payload = {
      chat_id: CONFIG.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    }
    
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    }
    
    const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`
    const response = UrlFetchApp.fetch(url, options)
    
    Logger.log('Telegram notification sent successfully')
    
  } catch (error) {
    Logger.log('Telegram notification failed: ' + error.toString())
    // Don't throw error - email is more important
  }
}

/**
 * Format Telegram message
 */
function formatTelegramMessage(data) {
  let message;

  if (data.type == "Institute Registration") {
    message = "🏫"
  } else{
    message = "🎓"
  }

  message = message + ` *${data.type}*\n\n`
  
  // Add key fields
  const keyFields = ['Name', 'Email', 'Contact', 'Institute', 'City', 'State', 'Reason for Partnership', 'Mode of Communication', 'Preferred Time', 'Additional Notes']
  
  for (const key of keyFields) {
    if (data.fields[key]) {
      message += `*${key}:* ${data.fields[key]}\n`
    }
  }
  
  message += `\n_${data.timestamp}_`
  message += `\n\n📧 Check your email for full details.`
  
  return message
}

// ==================== MAKE.COM WEBHOOK (FOR WHATSAPP) ====================

/**
 * Send data to Make.com webhook
 * You can then connect WhatsApp, SMS, or any other service in Make.com
 * Free tier: 1000 operations/month
 */
function sendToMakeWebhook(data) {
  try {
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(data)
    }
    
    const response = UrlFetchApp.fetch(CONFIG.MAKE_WEBHOOK_URL, options)
    Logger.log('Make.com webhook triggered successfully')
    
  } catch (error) {
    Logger.log('Make.com webhook failed: ' + error.toString())
    // Don't throw error - email is more important
  }
}

// ==================== GOOGLE SHEETS INTEGRATION ====================

/**
 * Save submission to Google Sheet
 */
function saveToSheet(data) {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.SHEET_ID).getActiveSheet()
    
    // Prepare row data
    const row = [
      new Date(),
      data.type,
      ...Object.values(data.fields)
    ]
    
    // Add headers if this is the first entry
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Type',
        ...Object.keys(data.fields)
      ]
      sheet.appendRow(headers)
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length)
      headerRange.setFontWeight('bold')
      headerRange.setBackground('#667eea')
      headerRange.setFontColor('#ffffff')
    }
    
    // Append the data
    sheet.appendRow(row)
    Logger.log('Data saved to Google Sheet')
    
  } catch (error) {
    Logger.log('Failed to save to sheet: ' + error.toString())
    // Don't throw error - email is more important
  }
}

// ==================== TESTING FUNCTIONS ====================

/**
 * Test function - Run this to test email sending
 */
function testEmailNotification() {
  const testData = {
    type: 'Test Institute Registration',
    timestamp: new Date().toString(),
    fields: {
      'Name': 'Test User',
      'Email': 'test@example.com',
      'Contact': '+91 9876543210',
      'City': 'Mumbai',
      'State': 'Maharashtra',
      'Institute': 'Test Institute',
      'Designation': 'Professor',
      'Reason for Partnership': 'Testing the form submission system',
      'Mode of Communication': 'Email',
      'Preferred Time': '2:00 PM - 4:00 PM',
      'Student Count': '50-100 students',
      'Additional Notes': 'This is a test submission'
    }
  }
  
  sendEmailNotification(testData)
  Logger.log('Test email sent!')
}

/**
 * Test function - Run this to test Telegram notification
 */
function testTelegramNotification() {
  const testData = {
    type: 'Test Form Submission',
    timestamp: new Date().toString(),
    fields: {
      'Name': 'Test User',
      'Email': 'test@example.com',
      'Contact': '+91 9876543210',
      'Institute': 'Test Institute',
      'City': 'Mumbai',
      'State': 'Maharashtra'
    }
  }
  
  sendTelegramNotification(testData)
  Logger.log('Test Telegram message sent!')
}

/**
 * Test function - Run this to test Make.com webhook
 */
function testMakeWebhook() {
  const testData = {
    type: 'Test Form Submission',
    timestamp: new Date().toString(),
    fields: {
      'Name': 'Test User',
      'Email': 'test@example.com',
      'Contact': '+91 9876543210',
      'Institute': 'Test Institute'
    }
  }
  
  sendToMakeWebhook(testData)
  Logger.log('Test webhook sent!')
}
