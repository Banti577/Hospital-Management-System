const UserDB = require('../models/userModel');
const { createHmac, randomBytes } = require('crypto');
const { generateTokenForUser } = require('../services/authentication');

const nodemailer = require('nodemailer');
const otpStore = {}; // OR use MongoDB



async function handleUserSignUp(req, res) {
  const { FullName, email, password, role } = req.body;
  const emailExist = await UserDB.findOne({ email })
  if (emailExist) { return res.status(400).json({ message: "Email already registered" }); }


 await UserDB.create({
    FullName, 
    email, 
    password,
    role,
  });
     return res.status(200).json({ message: "OTP verified successfully" });
  } 
  
  

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await UserDB.findOne({ email });
  if (!user) {
     return res.status(400).json({ message: "User not found" });
  }
  const hashPassword = createHmac('sha256', user.salt)
    .update(password)
    .digest('hex');
    
  if (hashPassword !== user.password) {
     return res.status(400).json({ message: "Invalid password" });
  }
  const token = generateTokenForUser(user);
  //return res.cookie('token', token).redirect('/'); 
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour
    // maxAge: 60 * 1000, // 50 seconds for testing
    sameSite: 'lax',
  });


  return res.status(200).json({ message: "Login Success", user });
}


module.exports = {
  handleUserSignUp,
  handleUserLogin,
};