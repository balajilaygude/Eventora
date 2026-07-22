
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();


const transporter = nodemailer.createTransport({
service:"gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,

});
async function verifyTransporter() {
  try {
    console.log("Verifying SMTP connection...");

    await transporter.verify();

    console.log("✅ SMTP Connected Successfully");
  } catch (err) {
    console.error("❌ SMTP Verification Failed");
    console.error(err);
  }
}

async function sendOtpEmail(email, otp, type) {

  console.log(email ," ",otp," ",type)
  try {
    console.log("Email in")
    const title =
    type === "account_verification"
    ? "Verify your Eventora Account :"
    : "Event Booking Verification";
    const msg =
    type === "account_verification"
    ? "Please use Following OTP to verify your Eventora Account"
    : "Please use Following OTP to confirm your Event Booking";
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: title,
      html: `
      <div style="width:250px;padding:20px;border:1px solid #ddd;border-radius:8px;text-align:center;font-family:Arial,sans-serif;">
      <h2 style="margin:0 0 10px;">${title}</h2>
      <p style="margin:8px 0;">
      ${msg}
      </p>
      <p style="margin:8px 0;font-size:24px;font-weight:bold;letter-spacing:4px;">
      ${otp}
      </p>
      </div>
      `,
    };
    await verifyTransporter();
    await transporter.sendMail(mailOptions);
    console.log(`Email.js Otp for ${email} for ${otp}`);
  } catch (error) {
    console.error(`Error sending otp email ${email} for ${otp}`, error);
  }
}
 sendOtpEmail("swatilaygude9103@gmail.com",123456,"account_verification")