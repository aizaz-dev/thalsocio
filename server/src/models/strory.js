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


},{timestamps:true});

module.exports=mongoose.model("Story",storySchema)