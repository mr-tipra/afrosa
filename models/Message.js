const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    subject:String,
    body:{type:String, required: true},
    date:{type:Date, default:Date.now},
    thread:[{
        body:{type:String, required: true},
        sender: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required: true
        },
        date:{type:Date, default:Date.now}
    }]
});


module.exports = Message = mongoose.model("message", MessageSchema);