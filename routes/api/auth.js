const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const ErrorResponse = require("../../utils/errorResponse");
const User = require("../../models/User");
const Post = require("../../models/Post");
const jwt = require("jsonwebtoken");
const {protect} =  require("../../middleware/auth");
const sendMail = require("../../utils/sendemail");
const crypto = require("crypto");
const {ERROR_DUPLI_KEY, ERROR_INVALID_INPUT, ERROR_SERVER_ERROR, ERROR_UNAUTHORIZED} = require("../../utils/errorTypes");


// @desc   Register User
// @route  POST api/auth/register
// @access public
router.post("/register",[
    check("email","Enter valid email").isEmail().not().isEmpty().trim(),
    check("name", "Enter name").exists().not().isEmpty().trim(),
    check("password","Min password length 6").isLength({min:6}).trim(),
    check("role","Enter valid role").isIn(["student","alumnus"]).trim(),
    check("enroll_no","Enter valid enroll number").exists().trim()
],  async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return next(new ErrorResponse(errors.array(), 400, ERROR_INVALID_INPUT));
  
    
    
    const {name, password, email, role, enroll_no} = req.body;

    try{
        const user = new User({
            name, 
            password,
            email,
            role,
            enroll_no
        });
        const errors = user.validateSync();
        if(errors){
            return next(new ErrorResponse(errors.array(), 400, ERROR_INVALID_INPUT));
        }
        const p1 = await user.save();
        const p2 = await user.sendVerificationMail(req, res,next);
        return res.status(200).json({success:true, msg:"User Registered. Not verified"});


    }catch(err) {return next(err);}
  
});

//@desc route for email verification
//@route PUT api/auth/verifyemail/:jwt
//@access public
router.put("/verifyemail/:token", async (req, res, next) =>{

    try{
        //get hashed token
        const payload = jwt.verify(req.params.token,process.env.JWT_SECRET);

        const user = await User.findById(payload.id);

        if(!user)
            return next(new ErrorResponse("Invalid token",400, ERROR_INVALID_INPUT));

        user.email_verified = true;
        await user.save();
        return res.status(200).json({success:true, msg:"Email verified"});
    }catch(err){
        next(err);
    }
});

//@desc login user
//@route POST api/auth/login
//@access public
router.post("/login",[
    check("enroll_no","Enter valid Enrollment No.").not().isEmpty().trim(),
    check("password","Min password length 6").exists()
    
],  async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return next(new ErrorResponse(errors.array(), 400, ERROR_INVALID_INPUT));
    
    
    const {password, enroll_no} = req.body;
    console.log(req.body);
    try{
        //check user
        const user = await User.findOne({enroll_no}).select("+password");
        if(!user)
             return next(new ErrorResponse("Invalid credentials", 401, ERROR_INVALID_INPUT));
             
        //check pass matches
        const isMatch = await user.matchPassword(password);

        if(!isMatch)
            return next(new ErrorResponse("Invalid credentials", 401, ERROR_INVALID_INPUT));
        
            
        //check if email verified
        if(user.email_verified === false)
            return next(new ErrorResponse("Email not verified", 401, "unverified"));

        return sendTokenResponse(user, 200, res);
        
        
        
    }catch(err) {return next(err);}
  
});



//@desc get current logged in user
//@route GET api/auth/me
//@access private
router.get("/me",  protect, async (req, res, next) => {

    try{
        const user = await User.findById(req.user.id);
        return res.status(200).json({success: true, user});
    }catch(err){
        return next(new ErrorResponse("User does not exist", 400, ERROR_INVALID_INPUT));
    }
});

//@desc update user details
//@route PUT api/auth/updatedetails
//@access private
router.put("/updatedetails",  [protect,
   
], async (req, res, next) => {
    const fieldsToUpdate = {
    };
    if(req.body.name)
        fieldsToUpdate.name = req.body.name;
    if(req.body.email){
        fieldsToUpdate.email = req.body.email;
        fieldsToUpdate.email_verified = false        
    }
    
    try{
        //update user
        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new:true,
            runValidators:true
        });

        //update all the posts made by the user
        if(fieldsToUpdate.name)
            await Post.findOneAndUpdate({user:user.id},{name:user.name});
        //email verification required
        if(fieldsToUpdate.email)
            await user.sendVerificationMail(req);
        
        return res.status(200).json({success: true, user});
    }catch(err){
        return next(new ErrorResponse("Unable to update", 500, ERROR_SERVER_ERROR));
    }
});


//@desc update user password
//@route PUT api/auth/updatepassword
//@access private
router.put("/updatepassword",  [protect,
    check("old_password", "Old password required").exists(),
    check("new_password", "New password required").exists()
], async (req, res, next) => {
   
    try{
        const errors = validationResult(req)     ;
        if(!errors.isEmpty())
            return next(new ErrorResponse(errors.array(), 400, ERROR_INVALID_INPUT));
            
        const user = await User.findById(req.user.id).select("+password");

        //check old password
        if(!(await user.matchPassword(req.body.old_password)))
            return next(new ErrorResponse("Incorrect password",401,ERROR_UNAUTHORIZED));
        user.password = req.body.new_password;
        await user.save();
        
        sendTokenResponse(user, 200, res);
    }catch(err){
        return next(err);
    }
});

//@desc forgot password
//@route GET api/auth/forgotpassword
//@access public
router.post("/forgotpassword", async (req, res, next)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user)
        return next(new ErrorResponse("No account exists", 400, ERROR_INVALID_INPUT));
    
    //get reset token
    const resetToken = user.getResetPasswordToken();

    // console.log(resetToken);
    await user.save({validateBeforeSave:false});

    //create reset url
    const resetURL = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;

    //email verification link
    const message = "Click to reset password: " + `<a href=${resetURL}>Here</a>`;
    
    try{
        await sendMail({
            email:user.email,
            html: message,
            subject:"Password Reset"
            
        });
        return res.status(200).json({success:true, msg:"Email Sent"});
    }catch(err){
        console.log(err);
        user.reset_password_token = undefined;
        user.reset_password_expire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorResponse("Email not sent", 500, ERROR_SERVER_ERROR));;

    }
});

//@desc route for resetting pwd
//@route POST api/auth/resetpassword/:token
//@access public
router.put("/resetpassword/:token", async (req, res, next) =>{

    try{
        //get hashed token
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            reset_password_token: resetPasswordToken,
            reset_password_expire:{$gt:Date.now()}
        });

        if(!user)
            return next(new ErrorResponse("Invalid token",400, ERROR_INVALID_INPUT));
        //set new password
        user.password = req.body.password;
        user.reset_password_token = undefined;
        user.reset_password_expire = undefined;
        await user.save();
        return res.status(200).json({success:true, msg:"Password updated"});
    }catch(err){
        next(err);
    }
});


// HELPERS
//Get token from model, create cookie and send resp
const sendTokenResponse = (user, statusCode, res) =>{
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*24*3600*1000),
        httpOnly: true,
    };

    if(process.env.NODE_ENV === "production"){
        options.secure = true;
    }

    return res
        .status(statusCode)
        .cookie('token',token, options)
        .json({
            success: true,
            token
        });
};





module.exports = router;