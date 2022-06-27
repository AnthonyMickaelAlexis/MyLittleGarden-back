const nodemailer = require('nodemailer');
// eslint-disable-next-line import/no-unresolved
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'alexis.anthony.bx@gmail.com',
    pass: process.env.GMAIL_PASSWD,
  },
}));

const mailOptions = {
  from: 'alexis.anthony.bx@gmail.com',
  to: 'alexis.anthony.bx@gmail.com',
  subject: 'Sending Email using Node.js[nodemailer]',
  text: 'That was easy!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Email sent: ${info.response}`);
  }
});

module.exports = nodemailer;
