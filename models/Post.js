const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Profile = require("./Profile");
const ErrorResponse = require("../utils/errorResponse");

const PostSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    text:{type:String, required: true},
    name:{type:String},
    avatar:{type:String},
    tags:[{type:String}],
    comments: [
        {
            user: {type: Schema.Types.ObjectId, ref:"user"},
            text: {type:String, required: true},
            name:{type:String},
            avatar:{type:String},
            date:{type:Date, default:Date.now}
        }
    ],
    date:{type:Date, default:Date.now}
});

PostSchema.pre("save", async function(next){

    try{
        const profile = await Profile.findOne({user:this.user}).populate("user",
        ["name"]);
        if(!profile)
            return next(new ErrorResponse("No Profile exists. Can't post"), 400);
        this.name = profile.user.name;
        this.avatar = profile.display_picture;
    }catch(err){
        return next(err);
    }
    next();
});




module.exports = Post = mongoose.model("post", PostSchema);
