const express=require('express');
const {userById}=require('../Controllers/user')
const {addVote}=require('../Controllers/vote')
const {requireSignin,isAuth} =require('../Controllers/auth');
const router=express.Router();


router.put("/vote/:userId",requireSignin,addVote)


module.exports=router; 