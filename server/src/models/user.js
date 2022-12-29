const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const Schema=mongoose.Schema;
const userSchema=new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxLength:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:32
    },
    hashed_password:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        trim:true,
    },
    salt:String,
    pic:{
        type:String,
    }


},{timestamps:true});

userSchema.statics.signup=async function({name,email,password}){
    const salt=await bcrypt.genSalt(10);
    console.log("salt :",salt);
    const hash=await bcrypt.hash(password,salt);
    console.log("pwd",hash)
    const user=await this.create({name,email,salt:salt,hashed_password:hash})
    console.log("user created")
    return user;
}
userSchema.statics.signin=async function(user,password){
    console.log(user.hashed_password,password)
    const match = await bcrypt.compare(password, user.hashed_password)
    console.log(match)
    return(match)
}

module.exports=mongoose.model('User',userSchema)