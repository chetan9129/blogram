const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const { generateToken } = require("../helpers/tokens");
const User = require("../models/user");
const bcrypt = require("bcrypt");

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
      password,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    const emailVerification = generateToken({ id: user._id.toString() }, "30m");
    console.log(emailVerification);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
    // console.log(error);
  }
};
