const express = require("express");
const router = express.Router();
const { requireSignin, isAuth } = require("../controllers/auth");
const {userById,validateLoggedInUserId}=require('../controllers/user')
const {upload}=require('../helpers/postphotoHandler')
const { validateStoryId,
        create, 
        readSingle,
        storyByCreator,
        allStories,
        deleteStory,
        updateStory,
} = require("../controllers/story");

//Params for making available in req body
router.param("userId",userById)
//router.param("loggedInUserId",validateLoggedInUserId)
// router.param("storyId",validateStoryId)
//Get Story by ID
router.get("/story/:storyId/:loggedInUserId",requireSignin(),readSingle)
//Get Stories for timeline most recent with pagination
router.get("/story/:loggedInUserId",requireSignin(),allStories)
//Get Stories for User timelines with pagination
router.get("/story/u/:userId/:loggedInUserId",requireSignin(),storyByCreator)
//Get Stories for User Engagement page
//Create new story
router.post("/story/create/:userId", requireSignin(),upload.single('content'),isAuth, create); 
//Edit Story 
router.patch("/story/:storyId", requireSignin(),upload.single('content'),updateStory)
//Delete Story
 router.delete("/story/:storyId/:userId", requireSignin(),isAuth,deleteStory)


module.exports=router
