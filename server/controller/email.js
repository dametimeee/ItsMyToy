import nodemailer from "nodemailer";

const sendEmail = async (authNum) => {
  const num = authNum;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MY_EMAIL, // replace with your email
      pass: process.env.MY_EMAIL_PASSWORD, // replace with your password
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: process.env.MY_EMAIL, // replace with your email
    to: "as01100@naver.com", // replace with recipient email
    subject: "인증번호",
    text: `${num}`,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default sendEmail;
