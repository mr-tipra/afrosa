const express = require("express");
const router = express.Router();
const ErrorResponse = require("../../utils/errorResponse");
const {protect, authorize,collegeVerified} = require("../../middleware/auth");
const {check, validationResult} = require("express-validator");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const {ERROR_DUPLI_KEY, ERROR_INVALID_INPUT, ERROR_SERVER_ERROR, ERROR_UNAUTHORIZED} = require("../../utils/errorTypes");

// ROUTE /api/posts


//@route  POST api/posts
//@desc   create a post
//@acesss Private
router.post("/", [protect, collegeVerified,[
    check("text","Text is required").not().isEmpty()
]],async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return next(new ErrorResponse(errors.array(), 400, ERROR_INVALID_INPUT));

    try{
        
        const {
            text,
            tags
        } = req.body;
    
        const newPost = new Post({
            user: req.user.id,
            text,
            tags
        }); 

        const post = await newPost.save();
        return res.status(200).json({success:true,post});
    }catch(err){
            return next(err);
    }
});


//@route  GET api/posts
//@desc   Get all posts
//@acesss Private

router.get("/", [protect, collegeVerified], async (req, res,next) => {
    try{
        if(req.query.tags){
            req.query["$and"] = req.query.tags.split(/[\s,]/).filter(tag=>tag!="").map(t=> (
                { tags: { "$regex":t, "$options":"i"} }));
            delete req.query.tags;
        }
         

        if(req.query.id){
            req.query._id = req.query.id;
            delete req.query.id;
        }

        //by name
        if(req.query.name){
            req.query.name = {"$regex":req.query.name,"$options":"i"}
        }

        const lim = parseInt(req.query.limit) || 50;

        ["limit"].forEach(q => delete req.query[q]);
        
        const posts = await Post.find(req.query).sort({date:-1}).limit(lim);
        return res.status(200).json({success:true, posts});

    }catch(err){
        return next(err);
    }
});

//@route  GET api/posts/:id
//@desc   Get a post by id
//@acesss Private

router.get("/:id", [protect, collegeVerified], async (req, res,next) => {
    try{    
        const post = await Post.findById(req.params.id);
        if(!post)
            return next(new ErrorResponse("No post found", 400, ERROR_INVALID_INPUT));
        post.comments.forEach(async comment => {
            const profile = await Profile.findOne({user: comment.user});
            if(profile){
                comment.avatar = profile.display_picture;
            }
        });
        post.save();
        return res.status(200).json({success:true, post});

    }catch(err){
        return next(err);
    }
});


//@route  GET api/posts/:uid
//@desc   Get posts by user id
//@acesss Private
router.get("/:uid", [protect,collegeVerified], async (req, res, next) => {
    try{

        const posts = await Post.find({user:req.params.uid}).sort({date:-1});
        if(posts.length === 0) 
            return next(new ErrorResponse("No posts found",400,ERROR_INVALID_INPUT));
        return res.status(200).json({success:true, posts})

    }catch(err){
        return next(err);
    }
});


//@route  DELET api/posts/:id
//@desc   delete post by id
//@acesss Private
router.delete("/:id", [protect,collegeVerified], async (req, res,next) => {
    try{

        const post = await Post.findById(req.params.id);
        if(!post)
            return next(new ErrorResponse("No posts found",400,ERROR_INVALID_INPUT));

        if(post.user.toString() !== req.user.id)
            return next(new ErrorResponse("Not authorized for deletion",400,ERROR_UNAUTHORIZED));

        await post.remove();
        return res.status(200).json({success:true, post});

    }catch(err){
        if(err.kind === "ObjectId") return next(new ErrorResponse("No posts found", 400, ERROR_INVALID_INPUT))
        return next(err);
    }
});

//@route  POST api/posts/comments/:id
//@desc   add a comment to a post
//@acesss Private
router.post("/comments/:id", [protect, collegeVerified,[
    check("text","Text is required").not().isEmpty()
]],async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return next(new ErrorResponse(errors.array(), 400, ERROR_INVALID_INPUT));

    try{
        const post = await Post.findById(req.params.id);
        const profile = await Profile.findOne({user:req.user.id})
        .populate("user",["name"]);
   

        if(!post)
            return next(new ErrorResponse("No post found", 400, ERROR_INVALID_INPUT));
            
        const {
            text
        } = req.body;
        const newComment = {
            user: req.user.id,
            text,
            name: profile.user.name,
            avatar:profile.display_picture
        }; 
        post.comments.unshift(newComment);
        await post.save();
    
        return res.status(200).json({success:true, comments:post.comments});
    }catch(err){
        
            return next(err);
    }
});


// @route DELETE api/posts/comment/:pid/:cid
// @desc delete a comment in a post
// @access private
router.delete("/comments/:pid/:cid", [protect,collegeVerified], async (req, res, next) => {

    try{
        const post = await Post.findById(req.params.pid);
        if(!post)
            return next(new ErrorResponse("No post found",404,ERROR_INVALID_INPUT)) ;
        
        const removeIndex = post.comments.map(comment => comment.id.toString()).indexOf(req.params.cid);
        if(removeIndex == -1)
            return next(new ErrorResponse("No Comment found",404,ERROR_INVALID_INPUT)) ;

        //check user posted the comment
        if(post.comments[removeIndex].user.toString() !== req.user.id)
            return next(new ErrorResponse("Not authorized",401,ERROR_UNAUTHORIZED)) ;

        post.comments.splice(removeIndex, 1);
        await post.save();
        return res.status(200).json({success:true, comments:post.comments});

    }catch(err){
        return next(err);
    }
});

module.exports = router;