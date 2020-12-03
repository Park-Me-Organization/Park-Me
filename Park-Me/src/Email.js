const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'csc4350004@gmail.com',
    pass: 'SE_4350004'
  }
});

const mailOptions = {
  from: 'Reservations@Park-Me.com',
  to: 'csc4350004@gmail.com',
  subject: 'Your confirmation reservation',
  text: 'Here is your confirmation reservation'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});