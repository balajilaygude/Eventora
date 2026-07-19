const brevo = require("@getbrevo/brevo");
const dotenv = require("dotenv");

dotenv.config();

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

// ================= OTP Email =================

async function sendOtpEmail(email, otp, type) {

  console.log(process.env.BREVO_API_KEY)
  console.log(process.env.EMAIL_USER)
  const title =
    type === "account_verification"
      ? "Verify your Eventora Account"
      : "Event Booking Verification";

  const msg =
    type === "account_verification"
      ? "Please use the following OTP to verify your Eventora account."
      : "Please use the following OTP to confirm your booking.";

  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = title;

  sendSmtpEmail.htmlContent = `
    <div style="width:300px;padding:20px;border:1px solid #ddd;border-radius:8px">
      <h2>${title}</h2>
      <p>${msg}</p>
      <h1>${otp}</h1>
    </div>
  `;

  sendSmtpEmail.sender = {
    name: "Eventora",
    email: process.env.EMAIL_USER,
  };

  sendSmtpEmail.to = [
    {
      email: email,
    },
  ];

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("OTP Email Sent");
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// ================= Booking Email =================

async function sendBookingEmail(userEmail, userName, eventTitle) {
  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = `Booking Confirmed : ${eventTitle}`;

  sendSmtpEmail.htmlContent = `
    <h2>Hi ${userName}</h2>

    <p>Your booking for <b>${eventTitle}</b> is confirmed.</p>

    <p>Thanks for choosing Eventora ❤️</p>
  `;

  sendSmtpEmail.sender = {
    name: "Eventora",
    email: process.env.EMAIL_USER,
  };

  sendSmtpEmail.to = [
    {
      email: userEmail,
    },
  ];

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Booking Email Sent");
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  sendOtpEmail,
  sendBookingEmail,
};


// =====================================================
// =====================================================
// NODEMAILER IT WORK ON LOCALHOST NOT ON RENDER


// const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
// dotenv.config();

// //old
// // const transporter = nodemailer.createTransport({
// //   host: "smtp.gmail.com",
// //     port: 587,
// //   secure: false,
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },
// // });


// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   connectionTimeout: 10000,
//   greetingTimeout: 10000,
//   socketTimeout: 10000,
// });

// async function sendOtpEmail(email, otp, type) {

//   console.log(email ," ",otp," ",type)
//   try {
//     console.log("Email in")
//     const title =
//     type === "account_verification"
//     ? "Verify your Eventora Account :"
//     : "Event Booking Verification";
//     const msg =
//     type === "account_verification"
//     ? "Please use Following OTP to verify your Eventora Account"
//     : "Please use Following OTP to confirm your Event Booking";
    
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: title,
//       html: `
//       <div style="width:250px;padding:20px;border:1px solid #ddd;border-radius:8px;text-align:center;font-family:Arial,sans-serif;">
//       <h2 style="margin:0 0 10px;">${title}</h2>
//       <p style="margin:8px 0;">
//       ${msg}
//       </p>
//       <p style="margin:8px 0;font-size:24px;font-weight:bold;letter-spacing:4px;">
//       ${otp}
//       </p>
//       </div>
//       `,
//     };
// try {
//     console.log("Before verify");

//     await transporter.verify();

//     console.log("SMTP Connected");

//     await transporter.sendMail(mailOptions);

//     console.log("Mail sent");
// }
// catch(err){
//     console.log(err);
// }
//     console.log(`Email.js Otp for ${email} for ${otp}`);
//   } catch (error) {
//     console.error(`Error sending otp email ${email} for ${otp}`, error);
//   }
// }

// async function sendBookingEmail(userEmail, userName, eventTitle) {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: userEmail,
//       subject: `Booking Confirmed : ${eventTitle}`,
//       html: `
//           <h2 style="margin:0 0 10px;">Hi ${userName}</h2>

//           <p style="margin:8px 0;font-size:24px;font-weight:bold;letter-spacing:4px;">
//             Your Booking for event <b>${eventTitle}</b> is Confirmed.
//           </p>   
//                     <p style="margin:8px 0;">
//            Thanks For choosing Eventora
//           </p>   
//           `,
//     };
// try {
//     console.log("Before verify");

//     await transporter.verify();

//     console.log("SMTP Connected");

//     await transporter.sendMail(mailOptions);

//     console.log("Mail sent");
// }
// catch(err){
//     console.log(err);
// }
//     console.log(`Email sent Succesfully ${userEmail}`);
//   } catch (error) {
//     console.error("Error Sending email : ", error)
//   }
// }

// module.exports={sendOtpEmail ,sendBookingEmail}