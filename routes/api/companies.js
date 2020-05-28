const express = require("express");
const router = express.Router();
const ErrorResponse = require("../../utils/errorResponse");
const {protect, authorize, collegeVerified} = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const {ERROR_DUPLI_KEY, ERROR_INVALID_INPUT, ERROR_SERVER_ERROR, ERROR_UNAUTHORIZED} = require("../../utils/errorTypes");
const Company = require("../../models/Company");

// ROUTE /api/maps


//@desc   get a company by id
//@route  GET /company/:cid
//@access private
router.get("/:cid", [protect, collegeVerified], async (req, res, next) =>{
       
       try{
            const company = await Company.findById(req.params.cid).populate("members",["name","role"]).lean(true);

            if(!company)
                return next(new ErrorResponse("Invalid Company Id", 400, ERROR_INVALID_INPUT));

            const uniqueMembers = company.members.filter((val, index, self) => {
                return self.indexOf(val) === index;
            });
            company.members = [];

            for(let i=0; i<uniqueMembers.length; i++){

                const prof = await Profile.findOne({user: uniqueMembers[i]._id});
                if(prof){
                    
                    company.members.push(
                        {
                            ...uniqueMembers[i],

                            experience: prof.experiences.find(exp => 
                                exp.company.toString() === company._id.toString()
                            ),
                            profile: prof,
                            
                        }
                    );
                }
            };
            console.log(company);
            return res.status(200).json({success: true, company})
              
       }catch(err){
              return next(err);
       }
});





module.exports = router;