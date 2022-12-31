const express=require('express');
const {signUp,signIn,signOut,requireSignin} =require('../controllers/auth');
const {userSignupValidation}=require('../helpers/validator');
const {profilePicUpload,upload}=require('../helpers/filehandler')
const router=express.Router();

//Signup routes
router.post('/signup',upload.single('pic'),userSignupValidation,signUp)

//login route
router.post('/signin',signIn)

//sign out route
router.get('/signout',signOut);


module.exports=router;