const mongoose = require("mongoose");
const Story = require("../models/story");
const { errorHandler } = require("../helpers/errorHandler");

// This method is user=d to generate sort object based on query prameters
const sortObject=(sortBy)=>{
  console.log(sortBy)
  switch(sortBy){
        case' time':
            return {createdAt:1};
            break;
        case ' upvote':
            return {upVote:1};
            break;
        case ' downvote':
            return {downVote:1};
            break;
        case'-time':
            return {createdAt:-1};
            break;
            case '-upvote':
              return {upVote:-1};
            break;
        case '-downvote':
            return {downVote:-1};
            break;
            default:
              return {_id:1}
            }
}
//This function has actual aggregation mongose uery to fetch data from database
const fetchStory=async (loggedinUserId,filter={},sort={_id:1},page=1)=>{

  const limit=50
  const skip=(page-1)*limit
   const story = await Story.aggregate([
    { $match: filter },
    {$sort:sort},
    {$skip:skip},
    {$limit:limit},
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "User",
      },
    },
    {
      $unwind: "$User",
    },
    {
      $lookup: {
        from: "votes",
        let: { sid: "$_id", uid:loggedinUserId},
        pipeline: [
          {
            $match: {
              $expr: {
                $and:[
                  { $eq: ["$storyId", "$$sid"]},
                  { $eq: ["$userId", "$$uid"]},

                ]
              },
            },
          },
        ],
        as: "Vote",
      },
    },
    {
      $unwind: {
        path: "$Vote",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $addFields: {
        userName: "$User.name",
        userPic: "$User.pic",
        userId: "$User._id",
        vote: "$Vote.value",
      },
    },
    {
      $project: {
        _id: 1,
        message: 1,
        content: 1,
        tags: 1,
        upVote: 1,
        downVote: 1,
        createdAt: 1,
        updatedAt: 1,
        userName: 1,
        userPic: 1,
        userId: 1,
        vote: { $ifNull: ["$vote", "-1"] },
      },
    },
    
  ]);
  return story
}
//This function is used to validate sorry Id
exports.validateStoryId=async (req,res)=>{
  if(req.params.storyId==undefined){
    res.status(400).json({error:"storyId undefined"})
  }
  try{
    const storyidToSearch = mongoose.Types.ObjectId(req.params.storyId);
    const count=await Story.countDocuments({_id:storyidToSearch})
    if(count){
      req.body.storyidToSearch=storyidToSearch
      next()
    }else{
      res.status(400).json({error:"story not found"})

    }
  }catch(err){
    res.status(400).json({error:"story id invalid"})
  }

}
//This function will return requested story by id
exports.readSingle = async (req, res) => {
  try{
    const storyidToSearch = mongoose.Types.ObjectId(req.params.storyId);
    const loggedInUserId=mongoose.Types.ObjectId(req.params.loggedInUserId);
    const filter={ _id: storyidToSearch }
    const story=await fetchStory(loggedInUserId,filter)
    return res.json(story);
  }catch(err){
    return res.status(400).json({error:err})
  }

};
//This function will fetch all stories
exports.allStories = async (req, res) => {
  try{
    const loggedInUserId=mongoose.Types.ObjectId(req.params.loggedInUserId);
    const {page,sortby}=req.query;
    const filter={};
    const sort=sortObject(sortby)
    console.log(req.params)
    const stories=await fetchStory(loggedInUserId,filter,sort,page);
    return res.json(stories);
  }catch(err){
    return res.status(400).json({error:err.message})
  }

};
//This function will fetch all stories by creator
exports.storyByCreator = async (req, res) => {
  try{
    let useridToSearch = mongoose.Types.ObjectId(req.params.userId);
    const loggedInUserId=mongoose.Types.ObjectId(req.params.loggedInUserId)
    const {page,sortby}=req.query
    const filter={userId: useridToSearch}
    const sort=sortObject(sortby) 
    const stories=await fetchStory(loggedInUserId,filter,sort,page)
    return res.json(stories);
  }catch(err){
    return res.status(400).json({error:err.message})
  }

};
//This fuction will create a new document in db
exports.create = async (req, res) => {
  console.log(req.body);
  const tags = req.body.tags ? req.body.tags.split("#") : ["noTag"];
  const path=req.file?req.file.path.replace(/\\/g, '/'):""
  //const path = req.body.piclink; // for faker 
  const userId = req.profile._id;
  try {
    const story = await Story.create({
      ...req.body,
      content: path,
      userId: userId,
      tags: tags,
    });
    res.status(200).json(story);
  } catch (err) {
    console.log(err);
    //res.status(400).json({ error: err });
    res.status(400).json({ error: errorHandler(err.message) });
  }
};
//This function will delete the story from db
exports.deleteStory=async (req,res)=>{
  try{
    let storyidToDelete = mongoose.Types.ObjectId(req.params.storyId);
    const response=await Story.deleteOne({_id:storyidToDelete})
    return res.status(200).json({msg:"story deleted successfuly."})
  }catch(err){
    return res.status(400).json({error:err})
  }
}
//This function will update the story
exports.updateStory = async (req, res) => {
  console.log(req.body);
  const tags = req.body.tags ? req.body.tags.split("#") : ["noTag"];
  const path=req.file?req.file.path.replace(/\\/g, '/'):""
  //const path = req.body.piclink; // for faker 
  const postId=req.params.storyId
  try {
    const story = await Story.findOneAndUpdate(
      {"_id":postId},
      {
        ...req.body,
      content: path,
      tags: tags,
    }, { returnOriginal: false });
    console.log(story)
    res.status(200).json(story);
  } catch (err) {
    console.log(err);
    //res.status(400).json({ error: err });
    res.status(400).json({ error: errorHandler(err) });
  }
};


/*
* list story by search
 * we will implement story search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the story to users based on what he wants
*/
/*
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Story.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "story not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};



*/
