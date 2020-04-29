const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    formatted_addr:{type:String,required: true},
    name:{type:String},
    city:String,
    state:String,
    country:String,
    pincode:String,
    //stats
    students:{type:Number, default:0},
    alumni:{type:Number, default:0},

    newest:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    geoData:{
        type:{type:String, enum:["Point"], default:"Point",required: true},
        coordinates:{type:[Number], required: true }
    }
});


CompanySchema.index({geoData:'2dsphere'});

module.exports = Company = mongoose.model("company",CompanySchema,"companies");