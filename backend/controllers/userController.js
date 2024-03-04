const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken')
// Register new user
// route /api/users
// access Public            //for private routes we need to authenticate
const registerUser = asyncHandler(async (req, res) => {
  //to receive values from UI
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    //sends the details to errorMiddleware function
    res.status(400);
    throw new Error("Please include all fields");
  }

  //Find if user already exists by checking obtained email from UI to the email in the database
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  //status check on created user
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// login user
// route /api/users/login
// access Public

const loginUser = asyncHandler(async (req, res) => {
  //to receive values from UI
  const { email, password } = req.body;

  //get the user from database using email
  const user = await User.findOne({ email: email });

  // check user and password match
  if (user && (await bcrypt.compare(password, user.password))) 
  {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } 
  else {
    res.status(401);
    throw new Error("Unauthorized email and password");
  }
});

// Get current user
// @route=  /api/users/login
// @access= Public
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.User._id,
    email: req.User.email,
    name: req.User.name
  }
    res.status(200).json(user)
  });
//Generate token 
const generateToken = (id) =>{

    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports = { registerUser, loginUser, getMe };
