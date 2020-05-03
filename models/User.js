const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendemail");
const ErrorResponse = require("../utils/errorResponse");

const UserSchema = new mongoose.Schema({ 

    name:{
        type:String, 
        required:[true, "Please add a name"]
    },
    email:{
        type:String,
        required:[true, "Please add an email"],
        unique:true
    },
    password:{
        type:String, 
        required:[true,"Please enter password"],
        minlength:6,
        select: false
    },
    reset_password_token:String,
    reset_password_expire:Date,
    role:{
        type:String,
        enum:["student","alumnus", "admin", "alumni_relations","student_relations"],
        required:true
    },
    created_at: {type:Date, default:Date.now},
    email_verified:{type:Boolean, default:false},
    college_verified:{type:Boolean, default: false},
    enroll_no:{
        type:String,
        unique:true,
        required: [true,"Please enter enrollment number"]
    },
    blocklist: [{type:mongoose.Schema.Types.ObjectId, ref:"user"}]
});

//encrypt pass with brcypt
UserSchema.pre("save",async function(next){
    if(!this.isModified("password"))
        next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);    
});

//sign jwt and return
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id, role:this.role, email_verified:this.email_verified,college_verified:this.college_verified}, process.env.JWT_SECRET,{
       expiresIn:process.env.JWT_EXPIRE 
    });
}

//match password with token
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

UserSchema.methods.sendVerificationMail = async function(req, res){
    
    
    try{
        //send verifiction mail
        const token = await jwt.sign({id: this.id}, process.env.JWT_SECRET,{
            expiresIn:600
        });

        //create verification url
        const resetURL = `${req.protocol}://${req.get("host")}/verifyemail/${token}`;

        //email verification link
        const message = "<div style='padding:2rem'>" + 
        "<h2 style='text-align:center'>Welcome To Afrosa</h2>" +
        `<p> Thank you for signing up. You are now part of the culture/community/group where we bridge the gap between students and  alumni. <a href=${resetURL} >Click here to verify your email now! </a> </p>` +
        '<p>Second verfication will be done shortly by our administrators</p>' +
        '<br/>' +
        '<p>Regards,</p>'+
        '<p>Afrosa</p>'+
        "</div>";
    
        await sendMail({
            email:this.email,
            html: message,
            subject:"Email verification"
            
        });
    }catch(err){
        console.log(err);
        throw new ErrorResponse("Email not sent", 500, "ServerError");;
    }
}

//Gen and hash password token
UserSchema.methods.getResetPasswordToken = function(){
    //Gen token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //Hash token and set to reset_password_token field
    this.reset_password_token = crypto.createHash("sha256").update(resetToken).digest("hex");

    //set expire
    this.reset_password_expire = Date.now()+10*60*1000;
    
    return resetToken;

}

module.exports = User = mongoose.model("user", UserSchema);
