const Vote=require('../models/vote')
const Story=require("../models/story")

exports.addVote=async (req,res)=>{
    const {storyId,userId,value}=req.body
    const filter={storyId:storyId,userId:userId}
    const update={value:value} 
    const alreadyVoted= await Vote.countDocuments(filter)
    //check if user and story exist
    if(alreadyVoted){
        try{
            return res.status(400).json({error:'alreadyVoted'})
        //     const vote=await Vote.findOneAndUpdate(filter,update)
        //         if(req.body.value=='0'){
        //             const story=await Story.findOneAndUpdate({_id:req.body.storyId},{$inc:{downVote:1}}) 
        //         }else{
        //             console.log('in add vote casting upvote')
        //             const story=await Story.findOneAndUpdate({_id:req.body.storyId},{$inc:{upVote:1}})
        //         }
        //         res.status(200).json({msg:"Updated"})
           
        }catch{
            res.status(400).json({err:"Unable to add vote"})
        }
    }else{
        try{
            const vote=await Vote.create({...req.body})
                if(req.body.value=='0'){
                    const story=await Story.findOneAndUpdate({_id:req.body.storyId},{$inc:{downVote:1}})
                }else{
                    const story=await Story.findOneAndUpdate({_id:req.body.storyId},{$inc:{upVote:1}})
                }
                res.status(200).json({msg:"Added"})
            
            }catch{    
                res.status(400).json({err:"Unable to add vote"})
        }
    }
    
}

exports.deleteVote=async (req,res)=>{
    const {storyId,userId}=req.body
    const filter={storyId:storyId,userId:userId}
    const alreadyVoted= await Vote.countDocuments(filter)
    //check if user and story exist
    if(!alreadyVoted){
        res.status(400).json({err:"No Vote Exist"})
    }else{
        
            Vote.findOneAndDelete(filter,(err,vote)=>{
                if(err){

                    res.status(400).json({err:"Unable to add vote"})
                }else{
                    res.status(200).json({msg:"Deleted"})

                }
            })  
        
    }

}

exports.changeVote=(req,res)=>{
    const {storyId,userId,value}=req.body
    const filter={storyId:storyId,userId:userId}
    const update={value:value}
    

    //try some error handling
}

exports.countVotesStory=(storyId)=>{
    const upVote=Vote.countDocuments({storyId:storyId,value:'1'})
    const downVote=Vote.countDocuments({storyId:storyId,value:'0'})
    return {upVote,downVote}
}

exports.userVoteStoryStatus=(storyId,userId)=>{
    const vote= Vote.findOne({storyId:storyId,userId:userId})
    return vote
}  