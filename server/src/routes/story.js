const express = require("express");
const router = express.Router();
const { requireSignin, isAuth } = require("../controllers/auth");
const {userById}=require('../controllers/user')
const {upload}=require('../helpers/postphotoHandler')
const { create, 
        storyById,
        readSingle,
        storyByCreator,
        allStories,
        // deletestory,
        // updatestory,
        // list,
        // listRelated, 
        // listCategories,
        // listBySearch,
        // storyPhoto,
} = require("../controllers/story");

/*
router.get("/storys",list)
router.get("/storys/related/:storyId",listRelated)
router.get("/storys/categories", listCategories)
router.post("/storys/by/search", listBySearch)
router.get("/story/photo/:storyId", storyPhoto)

*/
//Params for making available in req body
router.param("userId",userById)
router.param("storyId",storyById)
//Get Story by ID
router.get("/story/:storyId/:userId",requireSignin,readSingle)
//Create new story
router.post("/story/create/:userId", requireSignin,upload.single('content'),isAuth, create); 
//Edit Story
// router.put("/story/:storyId/:userId", requireSignin,isAuth,updatestory)
//Delete Story
// router.delete("/story/:storyId/:userId", requireSignin,isAuth,deletestory)
//Get Stories for timeline most recent with pagination
router.get("/story",requireSignin,allStories)
//Get Stories for User timelines with pagination
router.get("/story/:userId",requireSignin,storyByCreator)
//Get Stories for User Engagement page
//Vote a Story
//Comment a Story
//lederboard



module.exports=router
