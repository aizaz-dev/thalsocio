const express=require('express');
const {userById,read,update,updatePic}=require('../Controllers/user')
const {requireSignin,isAuth} =require('../Controllers/auth');
const {upload}=require("../helpers/filehandler")
const router=express.Router();

//testing
router.get('/secret/:userId',requireSignin,isAuth,(req,res)=>{
   res.json({
      user:req.profile
   })

});
router.get("/user/:userId",requireSignin,isAuth,read);
router.put("/user/profilePic/:userId",requireSignin,isAuth,upload.single('pic'),updatePic)
router.put("/user/:userId",requireSignin,isAuth,update);
router.param("userId",userById);

module.exports=router; 