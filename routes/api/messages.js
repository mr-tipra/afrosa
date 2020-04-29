const express = require("express");
const router = express.Router();
const ErrorResponse = require("../../utils/errorResponse");
const {protect, collegeVerified}  = require("../../middleware/auth");
const {check, validationResult} = require("express-validator");
const Message = require("../../models/Message");
const User = require("../../models/User");
const {ERROR_DUPLI_KEY, ERROR_INVALID_INPUT, ERROR_SERVER_ERROR, ERROR_UNAUTHORIZED} = require("../../utils/errorTypes");


// ROUTE /api/messages


//@desc   send message from curr user to another user
//@route  POST api/messages
//@access private
router.post("/", [protect, collegeVerified,
    check("to").exists(),
    check("body").exists().trim()
],async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return next(new ErrorResponse(errors.array(),400, ERROR_INVALID_INPUT));

    const{
        subject,body,to
    } = req.body;
    const from = req.user.id;

    try{
        const user = await User.findById(to);

        if(!user || from === user.id)
            return next(new ErrorResponse("Invalid destination address", 400,ERROR_INVALID_INPUT));
        const toId = user.id;
    
        const msg = await Message.create({
            from, to:toId, subject, body
        });
        return res.status(200).json({success:true, msg});
    }catch(err){
        console.log(err);
        return next(err);
    }
});


//@desc   get all messages for curr user
//@route  POST api/messages/me
//@access private
router.get("/me", [protect, collegeVerified],async (req, res, next) =>{

    try{
        const msgs = await Message.find({to:req.user.id})
        .select("-to")
        .populate("from",["name"])
        .sort({date:-1});

        return res.status(200).json({success:true, messages:msgs});
    }catch(err){
        return next(err);
    }
});

//@desc   delete a msg send by current user
//@route  POST api/messages/:mid
//@access private
router.delete("/:mid", [protect, collegeVerified,
],async (req, res, next) =>{

    try{
        const msg = await Message.findById(req.params.mid);
        if(!msg)
            return next(new ErrorResponse("Invalid Msg id",400, ERROR_INVALID_INPUT));
        //check if user send the msg
        console.log(msg.from, req.user.id);
        if(msg.from.toString() !== req.user.id)
            return next(new ErrorResponse("Not authorized for deletion", 401, ERROR_UNAUTHORIZED));
        
        //delete
        await msg.remove();
        return res.status(200).json({success:true});
    }catch(err){
        return next(err);
    }
});


module.exports = router;