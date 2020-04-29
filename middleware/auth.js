const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const {ERROR_DUPLI_KEY, ERROR_INVALID_INPUT, ERROR_SERVER_ERROR, ERROR_UNAUTHORIZED, ERROR_VALIDATION} = require("../utils/errorTypes");

//Protect routes

exports.protect = async   (req, res, next) =>{
    let token;
    if(req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")){

        token = req.headers.authorization.split(" ")[1];

    }
    // else if(req.cookies.token){
    //     token == req.cookies.token;
    // }
    // Make sure token exists
    if(!token)
        return next(new ErrorResponse("Not authorized to access",401,ERROR_UNAUTHORIZED));
    try{
        //verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        req.user = decoded;
        
        if( !user || !user.email_verified)
            return next(new ErrorResponse("Email not verified",401,ERROR_UNAUTHORIZED));

        next();
    }catch(err){
        return next(err);
    }
}

exports.collegeVerified = (req, res, next)=>{
    if(req.user.college_verified === false)
        return next(new ErrorResponse("College Details not verified",401,ERROR_UNAUTHORIZED));
    next();
}

exports.authorize = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorResponse(`User role ${req.user.role} not authorized to acces route`,
                403,
                ERROR_UNAUTHORIZED
            ));
        }
        next();
    }
};
