const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const { generateToken } = require("../helpers/tokens");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../helpers/mailer");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).send({
        message: "Invalid Email Address",
      });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).send({
        message: "Email Already Exists",
      });
    }
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).send({
        message: "First Name must be between 3 and 30 characters",
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).send({
        message: "Last Name must be between 3 and 30 characters",
      });
    }
    if (!validateLength(password, 6, 30)) {
      return res.status(400).send({
        message: "Password must be between 6 and 30 characters",
      });
    }
    const CryptedPassword = await bcrypt.hash(password, 12);
    // console.log(CryptedPassword);
    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);
    // return;
    const user = await new User({
      first_name,
      last_name,
      email,
      password: CryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    const emailVerification = generateToken({ id: user._id.toString() }, "30m");
    // console.log(emailVerification);
    // const url = `{process.env.BASE_URL}/acticate/${emailVerification}`;
    const url = `${process.env.BASE_URL}/activate/${emailVerification}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verifired: user.verifired,
      message: "Registered Successfully! Please Activate your Email!!",
      // email: user.email,
      // bYear: user.bYear,
      // bMonth: user.bMonth,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    // console.log(error);
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN);
    const check = await User.findById(user.id);
    if (check.verified == true) {
      return res.status(400).json({ message: "Account Already Verified" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account Activated Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email doesn't exist" });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verifired: user.verifired,
      message: "Login Successfully",
      // email: user.email,
      // bYear: user.bYear,
      // bMonth: user.bMonth,
    });
  } catch (error) {
    res.status({ message: error.message });
  }
};
