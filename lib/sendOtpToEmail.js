const { Resend } = require ("resend")

const resend = new Resend(process.env.RESEND_API_KEY);


async function sendOtpToEmail(emailData) {
    const { to, message, subject } = emailData;
  
    try {
      const response = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: to, 
        subject: subject, 
        html:  `
        <div style="font-size: 24px; font-weight: bold;">
          ${message}
        </div>
      `, // Email body in HTML with large, bold text, 
      });
      return response;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }


module.exports = {sendOtpToEmail}