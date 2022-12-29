const express=require('express');
const {signUp,signIn,signOut,requireSignin} =require('../controllers/auth');
const {userSignupValidation}=require('../helpers/validator');
const router=express.Router();

//Signup routes
router.post('/signup',userSignupValidation,signUp)

//login route
router.post('/signin',signIn)

//sign out route
router.get('/signout',signOut);

//test route
router.get('/test',requireSignin,(req,res)=>{
    res.send("Hellow Hellow testing");
});

module.exports=router;