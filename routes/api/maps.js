const express = require("express");
const router = express.Router();
const ErrorResponse = require("../../utils/errorResponse");
const {protect, authorize, collegeVerified} = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const {ERROR_DUPLI_KEY, ERROR_INVALID_INPUT, ERROR_SERVER_ERROR, ERROR_UNAUTHORIZED} = require("../../utils/errorTypes");
const Company = require("../../models/Company");

// ROUTE /api/maps


//@desc   get all company locations, alumni
//@route  GET /api/maps/companies
//@access private
router.get("/companies", [protect, collegeVerified], async (req, res, next) =>{
       
       try{
            const companies = await Company.find().populate("newest",["name"]);
            
            return res.status(200).json({success: true, companies})
              
       }catch(err){
              return next(err);
       }
});



module.exports = router;