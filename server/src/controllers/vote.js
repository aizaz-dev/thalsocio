const Vote=require('../models/vote')
const Story=require("../models/story")

exports.addVote=async (req,res)=>{
    console.log(req.body)
    const {storyId,userId,value}=req.body
    const filter={storyId:storyId,userId:userId}
    const update={value:value}
    const alreadyVoted= await Vote.countDocuments(filter)
    //check if user and story exist
    if(alreadyVoted){
        try{
            Vote.findOneAndUpdate(filter,update).then(()=>{
                if(req.body.value=='0'){
                    Story.findOneAndUpdate({_id:req.body.storyId},{$inc:{downVote:1}})
                }else{
                    Story.findOneAndUpdate({_id:req.body.storyId},{$inc:{upVote:1}})
                }
                res.status(200).send({msg:"Updated"})
            })
        }catch{
            res.status(400),send({err:"Unable to add vote"})
        }
    }else{
        try{
            Vote.create({...req.body}).then(()=>{
                if(req.body.value=='0'){
                    Story.findOneAndUpdate({_id:req.body.storyId},{$inc:{downVote:1}})
                }else{
                    Story.findOneAndUpdate({_id:req.body.storyId},{$inc:{upVote:1}})
                }
                res.status(200).send({msg:"Added"})
            })
            }catch{    
                res.status(400),send({err:"Unable to add vote"})
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
                    res.status(200).send({msg:"Deleted"})

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