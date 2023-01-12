const express=require('express');
const {addVote}=require('../Controllers/vote')
const {requireSignin,isAuth} =require('../Controllers/auth');
const router=express.Router();


router.put("/vote",requireSignin,addVote)


module.exports=router; 