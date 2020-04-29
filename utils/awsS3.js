const aws = require("aws-sdk");


aws.config.update({region:process.env.AWS_S3_REGION});
const s3 = new aws.S3({apiVersion:'2006-03-01'});

module.exports = s3;



