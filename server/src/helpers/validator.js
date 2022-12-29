const {check,validationResult}=require('express-validator')

exports.userSignupValidation=async (req,res,next)=>{
    await check('name')
        .notEmpty()
        .withMessage('Name is required.')
        .run(req)

    await check('email')
        .isEmail()
        .withMessage("Email is not valid.")
        .run(req);

    await check('password')
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({min:6})
        .withMessage('Password must be minimum 6 chars.')
        .matches(/\d/)
        .withMessage('Password must contain a number.')
        .run(req);

    const result=validationResult(req);
    const errors=result.errors;
    console.log(errors,typeof(errors))
    if(errors.length>0){
        const firstError=errors.map(error=>error.msg)
        return res.status(402).json({error:firstError})
    }
    next();
} 