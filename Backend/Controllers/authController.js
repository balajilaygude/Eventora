const userModel = require("../Models/user");
const bcrypt = require("bcrypt");
const { sendOtpEmail } = require("../Utils/email");
const otpModel = require("../Models/opt");
const { generateToken } = require("../Middleware/jwtFuntions");

async function registerUser(req, res) {
  const { name, email, password } = req.body;
  console.log(req.body)
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      error: "User Aready Exists ..",
    });
  }
  console.log(userExists)
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  console.log(hashPassword)
  try {
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      role: "user",
      isVerify: false,
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`OPT for ${email} : ${otp}`);
    await otpModel.create({ email, otp, action: "account_verification" });
    await sendOtpEmail(email, otp, "account_verification");
    res.status(201).json({
      message: "User Registed Successfully Plase check you email to verify",
      email: user.email,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({error});
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  console.log(email, password)
  const userCheck = await userModel.findOne({ email });
  if (!userCheck) {
    return res.status(400).json({
      message: "User Not found Plase sign up",
    })
  }
  const matchPassword = await bcrypt.compare(password, userCheck.password);
  if (!matchPassword) {
    return res.status(400).json({
      message: "Invalid Credentials",
    })
  }

  if (!userCheck.isVerify && userCheck.role === "user") {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await otpModel.deleteMany({ email, otp, action: "account_verification" });
    await otpModel.create({ email, otp, action: "account_verification" });
    await sendOtpEmail(email, otp, "account_verification");
    return res.status(400).json({
      needsVerification: true,
      error: "Account not verified a new otp sent to your email",
    })
  }

  res.status(200).json({
    message: "Login successfully",
    _id: userCheck._id,
    name: userCheck.name,
    email: userCheck.email,
    role: userCheck.role,
    token: generateToken(userCheck._id, userCheck.role),
  })
}

async function verifyOPT(req, res) {
  const { email, otp } = req.body;

  const otpRecord = await otpModel.findOne({
    email,
    otp,
    action: "account_verification",
  });
  if (!otpRecord) {
    return res.status(400).json({
      erroe: "Invalid or Expired Otp",
    });
  }
  const userCheck=await userModel.findOneAndUpdate({ email }, { isVerify: true });
  await otpModel.deleteMany({ email, action: "account_verification" });
  res.status(200).json({
    message: "Account verify succesfuly You can log in",
    _id: userCheck._id,
    name: userCheck.name,
    email: userCheck.email,
    role: userCheck.role,
    token: generateToken(userCheck._id, userCheck.role),
  });
}

module.exports = { registerUser, loginUser, verifyOPT };
