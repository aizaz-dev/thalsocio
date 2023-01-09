const User = require("../Models/user");
const multer = require("multer");

exports.userById = async (req, res, next, id) => {
if(!id){
  res.status(400).json({error:"Invalid user id"}) 
}
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      res.status(400).json({ error: "User not found" });
    } else {
      req.profile = user;
      //console.log("Storing in req profile ",req.profile)
    }
    next();
  });
};
 
exports.read = (req, res) => {
try{
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.status(200).json(req.profile);
}catch(err){
  
}


};

const storage = multer.memoryStorage();
let upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    //if (mimeTypes.includes(file.mimetype)) {
    return cb(null, true);
    //}
    //cb('File type not allowed', false);
  },
}).any();

exports.update = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      // An error occurred when uploading to server story
      return res.status(502).json(err);
    }
    User.findOneAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true },
      (err, user) => {
        if (err) {
          res.status(400).json({ error: "Cannot update user" });
        } else {
          user.hashed_password = undefined;
          user.salt = undefined;
          res.json(user);
        }
      }
    );
  });
};

exports.updatePic = (req, res) => {
  
  const path = req.file?req.file.path.replace(/\\/g, '/') : "";
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: { pic: path } },
    { new: true },
    (err, user) => {
      if (err) {
        res.status(400).json({ error: "Cannot update profile pic" });
      } else {
        user.hashed_password = undefined;
        user.salt = undefined;
        console.log("profile pic updted")
        res.json(user);
      }
    }
  );
};

exports.userCount=()=>{
  return User.countDocuments({})
}