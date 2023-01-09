//Require Modules
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const { errorHandler } = require("../helpers/errorHandler");
const path=require('path')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

exports.signUp = async (req, res) => {
  const { email, user_name } = req.body;
  console.log("req.body", req.body);

  const email_exist=await User.find({ "email":email })
  //console.log(email_exist)
   if (email_exist.length) {
     console.log(email,"Already exists")
     return res
       .status(400)
       .json({ error: "Email already exist. Please Sigin" });
   }
  const username_exist=await User.find({ "user_name":user_name })
  //console.log(username_exist)
   if (username_exist.length) {
     console.log(username_exist,"Already exists")
     return res
       .status(400)
       .json({ error: "User Name already in use. Please choose a uniue username" });
   }
   const path = req.file?req.file.path.replace(/\\/g, '/') : "";
   //const path=req.body.piclink

  try {
    const user = await User.signup({...req.body,pic:path}); 
    user.salt = undefined;
    user.hashed_password = undefined;
    //const token = createToken(user._id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err)
    //res.status(400).json({ error: err });
    res.status(400).json({ error: errorHandler(err) });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }

  User.findOne({ email }, async (err, user) => { 
    if (!user || err) {
      return res
        .status(400)
        .json({ error: "User does not exist. Please Signup" });
    }
    const match = await User.signin(user, password);
    if (!match) {
      console.log("in false");
      return res.status(401).json({ error: "Email and password do not match" });
    } else {
      console.log("in true");

      // create a token
      const token = createToken(user._id);
      //set cookie for session
      res.cookie("t", token, { expire: new Date() + 9999 });
      //destructure user
      const { _id, name, email, bio, pic } = user;
      return res
        .status(200)
        .json({ token, user: { _id, name, email, bio, pic } });
    }
  });
};

exports.signOut = async (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout Successful" });
};

exports.requireSignin =  expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log(req.profile._id, "---", req.auth._id);
  if (!user) {
    return res.status(403).json({ error: "Access Denied" });
  }
  console.log("User Authenticated");
  next();
};
