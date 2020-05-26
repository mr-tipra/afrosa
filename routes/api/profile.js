const express = require("express");
const router = express.Router();
const ErrorResponse = require("../../utils/errorResponse");
const {protect, authorize, collegeVerified} = require("../../middleware/auth");
const{check,validationResult} = require("express-validator");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Company = require("../../models/Company");

const path = require("path");
const fs = require("fs");

const s3 = require("../../utils/awsS3");

const {ERROR_DUPLI_KEY, ERROR_INVALID_INPUT, ERROR_SERVER_ERROR, ERROR_UNAUTHORIZED} = require("../../utils/errorTypes");

// ROUTE /api/profile

const populateQuery = ["name","email","role","enroll_no"];

//@route  POST api/profile
//@desc  create/update the user's profile
//@acesss Private
router.post("/", [protect, [
       check("branch", "Please enter branch").exists(),
       check("batch", "Please enter batch year").exists()
     
   ]],async (req, res,next) => {
       const errors = validationResult(req);
       if(!errors.isEmpty()){
              console.log(errors.array());
           return next(new ErrorResponse(errors.array(),401,ERROR_INVALID_INPUT));
       }
       
       const{
           branch,
           addr,
           website,
           bio,
           youtube, twitter, facebook,linkedin, instagram,
           batch,
           //for alumnus
           experience
       } = req.body;
   
       //build profile object
       const profileFields = {};
       profileFields.user = req.user.id;
       profileFields.branch = branch;
       profileFields.batch = batch;
       if(website) profileFields.website = website;
       if(bio) profileFields.bio = bio;
       if(addr) profileFields.addr = addr;
       

       profileFields.social = {};
       if(youtube) profileFields.social.youtube = youtube;
       if(twitter) profileFields.social.twitter = twitter;
       if(facebook) profileFields.social.facebook = facebook;
       if(linkedin) profileFields.social.linkedin = linkedin;
       if(instagram) profileFields.social.instagram = instagram;
       
       //assign role
       profileFields.user_role = req.user.role;
       try{
              let profile = await Profile.findOne({user: req.user.id});
              if(profile){
                     //profile exists, update
                     profile = await Profile.findOneAndUpdate({user: req.user.id}, 
                            {$set: profileFields},
                            {new: true});
                     await profile.save();
                     return res.status(201).json({success:true, profile});
              }
                     
          //create profile
           profile = new Profile(profileFields);
           if(Object.keys(experience).length > 0)
              profile.experiences.push(experience);


           await profile.save();
           return res.status(201).json({success:true, profile});

       }catch(err){
           next(err);
       }
   });


//@desc   get user profile
//@route  GET api/profile/me
//@access private
router.get("/me",protect,async (req, res, next) =>{
       
       try{
              const profile = await Profile.findOne({user:req.user.id}).populate("user", populateQuery)
              .populate("experiences.company");

              if(!profile)
                     return next(new ErrorResponse("Profile not found",401,ERROR_INVALID_INPUT));
                     
              //get comp names
              return res.status(200).json({success:true, profile});
       }catch(err){
              return next(err);
       }
});

//@route  GET api/profile
//@desc  get all profiles
//@acesss Private
router.get("/", [protect,collegeVerified], async (req, res,next) => {

       try{
              const qUser = {};
              if(req.query.name)
                     qUser.name = req.query.name.toLowerCase();       
              

              const count = Number.parseInt(req.query.count) || 2;
              const page = Number.parseInt(req.query.page) || 0;

              const removeFields = ["name", "page", "count"];
              removeFields.map(f => delete req.query[f]);
              let profiles = await Profile.find(req.query ).populate("user", populateQuery);
              profiles = profiles.filter(p => p.user.name.toLowerCase().startsWith(qUser.name?qUser.name:""));
              profiles = profiles.slice(page*count, page*count + count);
              
              return res.status(200).json({success:true, profiles});
       }catch(err){
           return next(err);
       }
});


//@route  GET api/profile/:id
//@desc  get profile by user's id
//@acesss Private
router.get("/:uid", [protect,collegeVerified], async (req, res,next) => {

       try{
              let profile = await Profile.findOne({user:req.params.uid}).populate("user",
           populateQuery).populate("experiences.company");
           if(!profile)
              return next(new ErrorResponse("No profile found", 400, ERROR_INVALID_INPUT));
           return res.status(200).json({success:true, profile});
       }catch(err){
           return next(err);
       }
});

//@route  PUT api/profile/experience
//@desc   add experience to user
//@acesss Private
router.put("/experiences", [protect,[
       check("title","Please enter valid title").exists(),
       check("company_name","Please enter Company Name").exists(),
       check("from", "Please enter beginning date").exists(),
       check("addr", "Please enter address").exists()

]], async(req, res, next) => {
       try{      
              const errors = validationResult(req);
              if(!errors.isEmpty())
                  return next(new ErrorResponse(errors.array(),401,ERROR_INVALID_INPUT));
              
              let profile = await Profile.findOne({user:req.user.id});
              
              const {
                     title,
                     addr,
                     from,
                     to,
                     desc,
                     company_name
              } = req.body;

              const newExp = {
                     title,
                     from,
                     to,
                     desc,
                     company_name
              };
              //find the company

              //get long/lat
              if(!addr.geoData)
                     return next(new ErrorResponse("No GeoData Present",404, ERROR_INVALID_INPUT));
      
              
              //calulate radius using radians
              //Divide distance by radius of earth
              //earth radius = 6378 km
              const radius = 1/6378; //search within 1 kms
              const companies = await Company.find({
                     geoData: { '$geoWithin': {'$centerSphere': [addr.geoData.coordinates, radius]}}
              });

              if(companies.length === 0){
                     //new company
                     const company = new Company({
                            formatted_addr: addr.addr_line,
                            name: addr.addr_line.split(",")[0],
                            geoData:addr.geoData,
                            students:profile.user_role==="student"?1:0,
                            alumni:profile.user_role==="alumnus"?1:0,
                            newest: req.user.id
                     });
                     await company.save();
                     newExp.company = company._id;
              }
              else{
                     //old company
                     if(profile.user_role === "student")
                            companies[0].students++;
                     else
                            companies[0].alumni++;
                     companies[0].newest = req.user._id;
                     await Company.findByIdAndUpdate(companies[0]._id, {"$set":companies[0]});
                     newExp.company = companies[0]._id;
              }

              profile.experiences.unshift(newExp);
              await profile.save();
              return res.status(200).json({success:true,profile});
              
       }catch(err){
              return next(err);
       }
});


//@route  DELETE api/profile/experiences/:id
//@desc   deletes experience
//@acesss private
router.delete("/experiences/:id", protect,async(req, res, next) => {
       try{                    
              let profile = await Profile.findOne({user:req.user.id}).populate("experiences.company");
              
              
              const index = profile.experiences.map(exp=>exp.id).indexOf(req.params.id);
              //find the associated company
               Company.findById(profile.experiences[index].company, (err, company) => {
                     if(err) return;
                     
                     //found company
                     if(profile.user_role === "student")
                            company.students--;
                     else if(profile.user_role === "alumnus")
                            company.alumni--;
                     
                     if(company.students<=0 && company.alumni<=0){
                        
                            Company.deleteOne({_id:company._id}, err => {
                                   if(err) console.log(err);
                            });
                     }
                     else{
                            company.save();
                     }
              });
          
              profile.experiences.splice(index, 1);
              await profile.save();
              return res.status(200).json({success:true,profile});
       }catch(err){
              return next(err);
       }
});


//@route  PUT api/profile/qualifications
//@desc   add qualification to user
//@acesss Private
router.put("/qualifications", [protect,[
       check("qualification", "Enter qualifcation").exists(),
       check("from","Please enter date").exists()
]], async(req, res, next) => {
       try{      
              const errors = validationResult(req);
              if(!errors.isEmpty())
                  return next(new ErrorResponse(errors.array(),401,ERROR_INVALID_INPUT));
              
              let profile = await Profile.findOne({user:req.user.id});
              
              const {
                    qualification,
                    institute,
                    desc,
                    from,
                    to
              } = req.body;

              const newQual = {
                     qualification,
                     institute,
                     from,
                     to,
                     desc
              };
              profile.qualifications.unshift(newQual);
              await profile.save();
              return res.status(200).json({success:true,profile});
              
       }catch(err){
              return next(err);
       }
});


//@route  DELETE api/profile/qualifications/:id
//@desc   deletes qualification
//@acesss private
router.delete("/qualifications/:id", protect,async(req, res, next) => {
       try{                    
              let profile = await Profile.findOne({user:req.user.id}).populate("experiences.company");
              
              
              const index = profile.qualifications.map(exp=>exp.id).indexOf(req.params.id);
              profile.qualifications.splice(index, 1);
              await profile.save();
              return res.status(200).json({success:true,profile});
       }catch(err){
              return next(err);
       }
});




// @route PUT api/profile/me/photo
// @desc upload display picture
// @access private
router.put("/photo", protect, async (req, res, next)=>{

       try
       {
              const profile = await Profile.findOne({user:req.user.id});
              if(!req.files)
                     return next(new ErrorResponse("No photo uploaded", 400, ERROR_INVALID_INPUT));

              
              const file = req.files.photo;

              //Make sure image is a photo
              if(!file.mimetype.startsWith("image"))
                     return next(new ErrorResponse("Not an image", 400));
                     
              //check file size
              const maxSize = parseInt(process.env.MAX_FILE_UPLOAD);
              if(file.size > maxSize)
                     return next(new ErrorResponse(`Max file size allowed is ${maxSize/1000000}MB`, 400));

              
              //create custom filename
              file.name = `photo_${profile.id}_${file.name}`;
              //check if already exists
              
              const bucket = "afrosauecu";
              // Configure the file stream and obtain the upload parameters
              const fileStream = fs.createReadStream(file.tempFilePath);
              const uploadParams = {Bucket:bucket, Key:''};

              uploadParams.Body = fileStream;
              uploadParams.Key = "profile_pictures/" + path.basename(file.name);

              const oldImage = profile.display_picture.split("/")[profile.display_picture.split("/").length-1];
              

              
              fileStream.on("open", () => {
                     
                     //upload new file
                     s3.upload (uploadParams, async function (err, data) {
                            if (err) {
                                   return next(new ErrorResponse("File Not uploaded", 500, ERROR_SERVER_ERROR));
                            } else{

                                   //check if old exists, if yes delete
                                   s3.deleteObject({Bucket:bucket,Key:oldImage}, (err, data) => {
                                          if(err){
                                                 //unable to delete
                                          }
                                   });

                                   await Profile.findOneAndUpdate({user:req.user.id},{display_picture: data.Location});
                                   //also update all relevant posts and comments
                                   Post.updateMany({user: req.user.id}, {avatar: data.Location}, (err, res) => {
                                          if(err) console.log(err);
                                   });
                            
                                   return res.status(200).json({success: true, file:data.Location})
                            }
                     });
              });

             
              
       }catch(err){
           return next(err);
       }
});





module.exports = router;