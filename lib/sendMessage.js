const { Resend } = require("resend")

const resend = new Resend(process.env.RESEND_API_KEY);


async function sendMessage(data) {
    const { email, message } = data;
    
    try {
      const response = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email, 
        subject: "anything",
        html:  `
        <div style="font-size: 18px; font-weight: bold;">
          ${message}
        </div>
      `, // Email body in HTML with large, bold text, 
      });
  
      console.log('Email sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }


module.exports = {sendMessage}