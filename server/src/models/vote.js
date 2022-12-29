const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const {ObjectId}=Schema;

const voteSchema=new Schema({
    memoryId:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    value:{
        type:String,
        enum:['0','1']
    }, 

},{timestamps:true});

module.exports=mongoose.model("Vote",voteSchema)