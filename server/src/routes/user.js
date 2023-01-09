const express=require('express');
const {userById,read,update,updatePic,leaderboard}=require('../Controllers/user')
const {requireSignin,isAuth} =require('../Controllers/auth');
const {upload}=require("../helpers/filehandler")
const User=require("../models/user")
const router=express.Router();

//testing
router.get('/users',async(req,res)=>{
      const users=await User.aggregate([
         {$project:{
            _id:1
         }}
      ])
      res.status(200).json(users)
})
router.get('/secret/:userId',requireSignin,isAuth,(req,res)=>{
   res.json({
      user:req.profile
   })

});
router.get("/user/leaderboard",requireSignin,leaderboard)
router.get("/user/:userId",requireSignin,isAuth,read);
router.put("/user/profilePic/:userId",requireSignin,isAuth,upload.single('pic'),updatePic)
router.put("/user/:userId",requireSignin,isAuth,update);
router.param("userId",userById);

module.exports=router;   