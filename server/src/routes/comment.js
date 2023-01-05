const express=require('express');
const {userById}=require('../Controllers/user')
const {addComment,readComment}=require('../Controllers/comment')
const {requireSignin,isAuth} =require('../Controllers/auth');
const router=express.Router();

router.post("/comment",requireSignin,addComment)
router.get("/comment/:storyId",requireSignin,readComment)

module.exports=router; 