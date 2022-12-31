const User=require('../Model/user')

exports.userById=async(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            res.status(400).json({error:"User not found"})
        }else{
            req.profile=user;
           //console.log("Storing in req profile ",req.profile)
        }
        next();
    })

}

exports.read=(req,res)=>{
    //console.log("getting from req profile ",req.profile)

    req.profile.hashed_password=undefined;
    req.profile.salt=undefined;
    return res.status(200).json(req.profile);
}

exports.update=(req,res)=>{

 User.findOneAndUpdate(
    {_id:req.profile._id},
    {$set:req.body},
    {new:true},
    (err,user)=>{
    if(err){
        res.status(400).json({error:'Cannot update user'});
    }else{
        user.hashed_password=undefined;
        user.salt=undefined;
        res.json(user);
    }
 })
}