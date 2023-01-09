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

exports.storyById = async (req, res, next) => {
  next();

};

exports.readSingle = async (req, res) => {
  let storyidToSearch = mongoose.Types.ObjectId(req.params.storyId);
  let useridToSearch = mongoose.Types.ObjectId(req.params.userId);
  const story = await Story.aggregate([
    { $match: { _id: storyidToSearch } },
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
        let: { idd: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["storyId", "$$idd"],
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
    {
      $sort: { createdAt: -1 },
    },
  ]);
  return res.json(story);
};

exports.create = async (req, res) => {
  console.log(req.body);
  console.log(req.profile);
  const tags = req.body.tags ? req.body.tags.split("#") : ["noTag"];
  //const path=req.file?req.file.path.replace(/\\/g, '/'):""
  const path = req.body.piclink;
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
    const limit=50;
    console.log(req.query)
    const sort=sortObject(sortby)
    console.log(sort)

  const story = await Story.aggregate([
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
        let: { idd: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["storyId", "$$idd"],
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
  console.log(typeof(story))
  return res.json(story);
};
exports.storyByCreator = async (req, res) => {
  let useridToSearch = mongoose.Types.ObjectId(req.params.userId);
  const {page,sortby}=req.query
  const limit=50;
  const sort=sortObject(sortby) 
  console.log(sort)
  const story = await Story.aggregate([
    { $match: { userId: useridToSearch } },
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
        let: { idd: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["storyId", "$$idd"],
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
  return res.json(story);
};


/*
exports.updateStory=(req,res)=>{
    const form=new formidable.IncomingForm();
    form.keepExtensions=true
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.status(400).json({
                err:"Image could not be uploaded"
            })
        }

        //check for all fields
        const {name,description,price,category,quantity,shipping}=fields;
        if(!name || !description || !price || !category || !quantity ||!shipping){
           return res.status(400).json({error:"All fields are required"})
        }
        let story=req.story
        story=_.extend(story,fields)
        console.log(files)
        if(files.photo){// use photo or image as per sender
            //console.log(files)  //for debuggung with file names

            //check for size
            if(files.photo.size>1000000){
                return res.status(400).json({error:"Phot must be les than 1 Mb"})
            }
            story.photo.data=fs.readFileSync(files.photo.filepath)
            story.photo.contentType=files.photo.mimetype
        }

        story.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            res.status(200).json(result)
        })
    })
}

exports.deleteStory=async (req,res)=>{
    let story=req.story;
    story.remove()
        .then(()=>{
            return res.status(200).json({msg:"story deleted successfuly."})
        }).catch(err=>{
            return res.status(400).json({
                error:errorHandler(err)
            })
        })
}




/*
sell/arrival/top viewed
by sell=story?sortBy=sold=sold&order=desc&limit=4
br arrival=story?sortBy=createdAt&order=desc&limit=4
*/
/*
exports.list=(req,res)=>{
    let order=req.query.order ? req.query.order:'asc';
    let sortBy=req.query.sortBy ? req.query.sortBy:'_id';
    let limit=req.query.limit ? parseInt(req.query.limit):6;

    Story.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy,order]])
        .limit(limit)
        .exec((err,story)=>{
            if(err){
                return res.status(400).json({error:'story not found'})
            }else{
                res.status(200).send(story)
            }
        })
}

exports.listRelated=(req,res)=>{
    let limit=req.query.limit ? parseInt(req.query.limit):6;
    Story.find({_id:{$ne:req.story},category:req.story.category})
        .limit(limit)
        .populate('category','_id name')
        .exec((err,story)=>{
            if(err){
                return res.status(400).json({error:'story not found'})
            }else{
                res.status(200).send(story)
            }
        })
}

exports.listCategories=(req,res)=>{
    Story.distinct("category",{},(err,Categories)=>{
        if(err){
            return res.status(400).json({error:'Categories not found'})
        }else{
            res.status(200).send(Categories)
        }
    })
}

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

exports.storyPhoto=(req,res,next)=>{
    if(req.story.photo.data){
        res.set('Content-Type',req.story.photo.contentType)
        return res.send(req.story.photo.data)
    }
    else{
        console.log("no data found")
    }
    next();
}

*/
