const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const {ObjectId}=Schema;

const storySchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    message:{
        type:String,
    },
    content:{
        type:String,
    },
    styling:{},
    tags:[String],
    upVote:{
        type:Number,
        default:0
    },
    downVote:{
        type:Number,
        default:0
    }


},{timestamps:true});

module.exports=mongoose.models.Story|| mongoose.model("Story",storySchema)