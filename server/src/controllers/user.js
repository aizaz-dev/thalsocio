const User = require("../Models/user");
const Story = require("../Models/story"); 
const mongoose=require('mongoose')
exports.userById = async (req, res, next, id) => {
if(id=="undefined"){
  return res.status(400).json({error:"Invalid user id"}) 
}
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      res.status(400).json({ error: "User not found" });
    } else {
      req.profile = user;
    }
    next();
  });
};
 
exports.read = async (req, res) => {
  const userIdForSearch=mongoose.Types.ObjectId(req.params.userId)
  const User=await Story.aggregate([
    {$match:{userId:userIdForSearch}},
    {$group:{
      _id:'$userId',
      count:{$count:{}},
      upVote:{$sum:'$upVote'},
      downVote:{$sum:'$downVote'}
    }},
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "User",
      },
    },
    {
      $unwind: "$User",
    },
    {
      $addFields:{
        userName: "$User.name",
        userPic: "$User.pic",
        user_name:"$user.user_name"
      }
    },
    {$project:{
      _id:1,
      count:1,
      upVote:1,
      downVote:1,
      userName:1,
      userPic:1
    }}
  ])
console.log(User)
  return res.status(200).json(User);

};



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

exports.leaderboard=async(req,res)=>{
  const topPerformer=await Story.aggregate([
    {$group:{
      _id:'$userId',
      count:{$count:{}},
      upVote:{$sum:'$upVote'},
      downVote:{$sum:'$downVote'}
    }},
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "User",
      },
    },
    {
      $unwind: "$User",
    },
    {
      $addFields:{
        userName: "$User.name",
        userPic: "$User.pic",
      }
    },
    {$project:{
      _id:1,
      count:1,
      upVote:1,
      downVote:1,
      userName:1,
      userPic:1
    }},{
      $sort:{upVote:-1}
    }
  ])
  res.status(200).json(topPerformer)
}