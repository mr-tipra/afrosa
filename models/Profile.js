const mongoose = require("mongoose");



const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    user_role:{type:String, enum:["student", "alumnus","admin","student_relations","alumni_relations"]},
    website:String,
    addr: {
        addr_line:String,
        city:String,
        state:String,
        pincode:String,
        country:String,
    },
    branch:{type:String, required: true},
    batch:{type:String, required: true},
    bio: {type: String},
    qualifications: [
        {
            qualification:{type:String,required: true},
            institute:String,
            desc:String,
            from:{type:Date, required: true},
            to:Date
        }
    ],
    social:{
        youtube:{type:String},
        twitter:{type:String},
        facebook:{type:String},
        linkedin:{type:String},
        instagram:{type:String}
    },
    date:{type:Date, default:Date.now},
    display_picture:{type:String, default: process.env.DEFAULT_PHOTO},
    
    
    experiences: [
        {
            title:{type:String, required: true},
            company: {type:mongoose.Schema.Types.ObjectId, ref:"company"},
            company_name:{type:String},
            from:{type:Date, required:true},
            to:Date,
            desc:String
        }
    ]
    
});



const Profile = mongoose.model("profile",ProfileSchema);

module.exports = Profile;
