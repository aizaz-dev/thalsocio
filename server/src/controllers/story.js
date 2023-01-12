const mongoose = require("mongoose");
const Story = require("../models/story");
const { errorHandler } = require("../helpers/errorHandler");
const { countVotesStory, userVoteStoryStatus } = require("./vote");
const { userCount } = require("./user");

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

const fetchStory=async (filter={},sort={_id:1},limit=50,loggedinUserId)=>{
  console.log(loggedinUserId)
   const story = await Story.aggregate([
    { $match: filter },
    {$sort:sort},
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

exports.readSingle = async (req, res) => {
  let storyidToSearch = mongoose.Types.ObjectId(req.params.storyId);

  const filter={ _id: storyidToSearch }
  const story=await fetchStory(filter)
  return res.json(story);
};

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
    res.status(400).json({ error: errorHandler(err) });
  }
};


exports.allStories = async (req, res) => {
    const {page,sortby}=req.query
    const filter={}
    const sort=sortObject(sortby)
    const limit=50;
    const loggedInUserId=mongoose.Types.ObjectId(req.params.loggedInUserId)
    console.log(req.params)
    const stories=await fetchStory(filter,sort,limit,loggedInUserId)
    return res.json(stories);
};
exports.storyByCreator = async (req, res) => {
  let useridToSearch = mongoose.Types.ObjectId(req.params.userId);
  const {page,sortby}=req.query
  const filter={userId: useridToSearch}
  const limit=50;
  const sort=sortObject(sortby) 
  const stories=await fetchStory(filter,sort,limit)
  return res.json(stories);
};

exports.deleteStory=async (req,res)=>{
  let storyidToDelete = mongoose.Types.ObjectId(req.params.storyId);
  try{
    const response=await Story.deleteOne({_id:storyidToDelete})
    return res.status(200).json({msg:"story deleted successfuly."})
  }catch(err){
    console.log(err)
    return res.status(400).json({
      error:err
  })
  }
}

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
/*


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
