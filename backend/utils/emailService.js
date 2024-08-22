const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use any SMTP service provider
  auth: {
    user: 'your-email@gmail.com', // Your email
    pass: 'your-email-password' // Your email password or app-specific password
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;
