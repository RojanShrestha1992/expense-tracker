const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//jwt generate

const generateToken = (res, id) => {
  const token =  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
   res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
  return token;
};

//register user

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  //validate user field
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  //check if user exists
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });
  if (user) {
   generateToken(res, user._id);
   
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

//login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //find user
  const user = await User.findOne({ email });
  // compare password
  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(res, user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
};


module.exports = {registerUser, loginUser}
