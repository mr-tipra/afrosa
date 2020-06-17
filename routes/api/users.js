const express = require("express");
const router = express.Router();
const ErrorResponse = require("../../utils/errorResponse");
const {protect, authorize} = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Comapany = require("../../models/Company");
const Message = require("../../models/Message");

const {ERROR_DUPLI_KEY, ERROR_INVALID_INPUT, ERROR_SERVER_ERROR, ERROR_UNAUTHORIZED} = require("../../utils/errorTypes");

// ROUTE /api/users
//ONLY FOR ADMIN


//@desc get stats
//@route GET /api/users/stats
//@access public
router.get("/stats", async (req, res, next) => {

       try{
              const students = await User.countDocuments({role:"student"});
              const alumni = await User.countDocuments({role:"alumnus"});
              const companies = await Comapany.countDocuments();
              return res.status(200).json({success: true, stats:{students,alumni, companies}});
       }catch(err){
              console.log(err);
              return next(new ErrorResponse("Can't fetch stats", 500, ERROR_SERVER_ERROR));
       }
});



//@desc   get all users
//@route  GET /api/users
//@access private
router.get("/", [protect, authorize('admin')], async (req, res, next) =>{
       
       try{
              if(req.query.enroll_no && req.query.enroll_no !== ""){
                     req.query.enroll_no = {
                            "$regex":req.query.enroll_no
                     }
              }
              else if(req.query.enroll_no === "")
                     delete req.query.enroll_no;

              const users = await User.find({
                     ...req.query,
                     '$or':[{role:'student'}, {role:'alumnus'}]
              });
              return res.status(200).json({success:true, users});
       }catch(err){
              return next(err);
       }
});


//@desc   get all students
//@route  GET /api/users/students
//@access private
router.get("/students", [protect, authorize('admin', 'student_relations','alumni_relations')], async (req, res, next) =>{
       try{
              if(req.query.enroll_no && req.query.enroll_no !== ""){
                     req.query.enroll_no = {
                            "$regex":req.query.enroll_no
                     }
              }
              else if(req.query.enroll_no === "")
                     delete req.query.enroll_no;
   
              const users = await User.find({...req.query, role:'student'});
              return res.status(200).json({success:true, users});
       }catch(err){
              return next(err);
       }
});


//@desc   get all alumni
//@route  GET /api/users/alumni
//@access private
router.get("/alumni", [protect, authorize('admin', 'student_relations','alumni_relations')], async (req, res, next) =>{
       try{
              if(req.query.enroll_no && req.query.enroll_no !== ""){
                     req.query.enroll_no = {
                            "$regex":req.query.enroll_no
                     }
              }
              else if(req.query.enroll_no === "")
                     delete req.query.enroll_no;

              const users = await User.find({...req.query, role:'alumnus'});
              return res.status(200).json({success:true, users});
       }catch(err){
              return next(err);
       }
});




//@desc   delete an user by roll no
//@route  DELETE /api/:eno
//@access private
router.delete("/:eno", [protect, authorize('admin',"alumni_relations","student_relations")], async (req, res, next) =>{
       
       try{
              const user = await User.findOne({enroll_no:req.params.eno});
              if(!user)
                     return next(new ErrorResponse("No user by given enroll number", 400, ERROR_INVALID_INPUT));
              //delete profile if exists
              const profile = await Profile.findOne({user:user.id});
              if(profile){
                     //delete companies
                     profile.experiences.map(async exp => {
                            const company = await Company.findById(exp.company);
                            if(company){
                                   //delete
                                   if(user.role === "student")
                                          company.students--;
                                   else if(user.role === "alumnus")
                                          company.alumni--;
                                          
                                   if(company.students<=0 && company.alumni <= 0)
                                          await company.delete();
                                   else{
                                          //update newest field
                                          if(company.members)
                                                 company.members = company.members.filter(mem => mem.toString() !== user._id.toString());

                                          await company.save();
                                   }
                            }
                     });
                     await profile.remove();
              }
              //delete All Message
              await Message.deleteMany({'$or': [{from:user._id}, {to:user._id}]});
              await user.remove();
              return res.status(200).json({success:true});
       }catch(err){
              return next(err);
       }
});



//@desc   get profile
//@route  GET /api/:eno
//@access private
router.get("/:eno", [protect, authorize('admin','student_relations','alumni_relations')], async (req, res, next) =>{
       
       try{
              const user = await User.findOne({enroll_no:req.params.eno});
              if(!user)
                     return next(new ErrorResponse("No user by given enroll number", 400, ERROR_INVALID_INPUT));
              //delete profile if exists
              const profile = await Profile.findOne({user:user.id});
              if(!profile)
                     return next(new ErrorResponse("Profile does not exists", 402, ERROR_INVALID_INPUT));
              
              return res.status(200).json({success:true, profile});
       }catch(err){
              return next(err);
       }
});




//@desc   verify college by enroll no
//@route  PUT /api/:eno
//@access private
router.put("/collegeverify/:eno", [protect, authorize('admin',"student_relations","alumni_relations")], async (req, res, next) =>{
       
       try{
              const user = await User.findOne({enroll_no:req.params.eno});
              if(!user)
                     return next(new ErrorResponse("No user by given enroll number", 400, ERROR_INVALID_INPUT));
              user.college_verified = true;
              await user.save();
              return res.status(200).json({success:true});
       }catch(err){
              return next(err);
       }
});


//@desc verify email by uid
//@route PUT /api/emailverify/:uid
//@access admin
router.put("/emailverify/:eno", [protect, authorize('admin',"student_relations","alumni_relations")], async (req, res, next) =>{
       
       try{
              const user = await User.findOne({enroll_no:req.params.eno});
              if(!user)
                     return next(new ErrorResponse("No user by given enroll number", 400, ERROR_INVALID_INPUT));
              user.email_verified = true;
              await user.save();
              return res.status(200).json({success:true});
       }catch(err){
              return next(err);
       }
});


//@desc   verify college by enroll no
//@route  PUT /api/emailverify/all
//@access private
router.put("/emailverify/all", [protect, authorize('admin')], async (req, res, next) =>{
       
       try{
              const user = await User.find({email_verified:false});
              if(!user)
                     return next(new ErrorResponse("No user by given enroll number", 400, ERROR_INVALID_INPUT));
              if(user.length > 0){
                     user.forEach(u => {
                            u.email_verified = true;
                            u.save();
                     });
              }
              
              return res.status(200).json({success:true});
       }catch(err){
              return next(err);
       }
});



module.exports = router;