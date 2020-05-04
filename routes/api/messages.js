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
        const toId = user._id;
        
        //check blocklist
        const currUser = await User.findById(req.user.id);
        const fromBlocklist = currUser.blocklist || [];
        const toBlocklist = user.blocklist || [];

        if(fromBlocklist && (fromBlocklist.findIndex(u => u.toString()===to.toString()) !== -1))
            return next(new ErrorResponse("blocked_user", 401, ERROR_INVALID_INPUT));

        if(toBlocklist && (toBlocklist.findIndex(u => u.toString()===from.toString()) !== -1))
            return next(new ErrorResponse("blocked_user", 401, ERROR_INVALID_INPUT));
        

        const msg = await Message.create({
            from, to:toId, subject, body
        });
        user.newMessage = true;
        user.save(err => {

        });

        return res.status(200).json({success:true, msg});
    }catch(err){
        console.log(err);
        return next(err);
    }
});

//@desc   add thread msg to a msg
//@route  POST api/messages/:mid
//@access private
router.post("/:mid", [protect, collegeVerified,
    check("body").exists().trim()
],async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return next(new ErrorResponse(errors.array(),400, ERROR_INVALID_INPUT));

    const{
        body
    } = req.body;
    const sender = req.user.id;

    try{
        const msg = await Message.findById(req.params.mid).populate('from',["name"]).populate('to',["name"]);
        if(!msg || (msg.from._id.toString() !== sender && msg.to._id.toString() !== sender))
            return next(new ErrorResponse("Invalid destination address", 400,ERROR_INVALID_INPUT));

        let to;
        if(sender.toString() === msg.from._id.toString())
            to = msg.to._id;
        else to = msg.from._id;

        //check blocklist
        const from = req.user.id;
        const currUser = await User.findById(req.user.id);
        const fromBlocklist = currUser.blocklist || [];
        
        if(fromBlocklist && (fromBlocklist.findIndex(u => u.toString()===to.toString()) !== -1))
        return next(new ErrorResponse("blocked_user", 401, ERROR_INVALID_INPUT));
        
        const toUser = await User.findById(to);
        const toBlocklist = toUser.blocklist || [];
        if(toBlocklist && (toBlocklist.findIndex(u => u.toString()===from.toString()) !== -1))
            return next(new ErrorResponse("blocked_user", 401, ERROR_INVALID_INPUT));
        

        msg.thread.push({
            sender, body
        });
        await msg.save();
        toUser.newMessage = true;
        toUser.save(err => {

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
        const msgs = await Message.find({
            $or:[ {to:req.user.id}, {from:req.user.id}]
        })
        .populate("from",["name"])
        .populate("to",["name"])
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
        if(msg.from.toString() !== req.user.id)
            return next(new ErrorResponse("Not authorized for deletion", 401, ERROR_UNAUTHORIZED));
        
        //delete
        await msg.remove();
        return res.status(200).json({success:true});
    }catch(err){
        return next(err);
    }
});

router.put("/block/:uid", [protect, collegeVerified], async (req, res, next) => {

    try{
        const user = await User.findById(req.user.id);
        //check user exist
        const blockUser = await User.findById(req.params.uid);
        if(!blockUser)
            return next(new ErrorResponse("Invalid User Id", 400, ERROR_INVALID_INPUT));
        //add to block list
        user.blocklist.push(blockUser._id);
        await user.save();
        return res.status(200).json({success: true, blocklist:user.blocklist});
    }catch(err){
        return next(err);
    }
});

router.delete("/block/:uid", [protect, collegeVerified], async (req, res, next) => {

    try{
        const user = await User.findById(req.user.id);
        //check user exist

        //add to block list
        user.blocklist = user.blocklist.filter(u => u.toString() !== req.params.uid);
        await user.save();
        return res.status(200).json({success: true, blocklist:user.blocklist});
    }catch(err){
        return next(err);
    }
});

module.exports = router;