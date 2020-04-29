const ErrorResponse = require("../utils/errorResponse");
const {ERROR_DUPLI_KEY, ERROR_INVALID_INPUT, ERROR_VALIDATION, ERROR_UNAUTHORIZED} = require("../utils/errorTypes");

const errorHandler = (err, req, res, next) => {
    //log to console for dev
    console.log(err.stack);
    let error = {...err};
    error.message = err.message;
 
    if(!error.kind)
        error.kind = "UnknownError";

    if(error.kind === ERROR_INVALID_INPUT){
        if(Array.isArray(error.message))
            error.message = error.message.map(err=>err.msg);
        
    }
    
    if(err.name === 'CastError'){
        const msg = `Resource not found with id ${err.value}`;
        error = new ErrorResponse(msg, 400);
        error.kind ="CastError"
    }

    if(err.code === 11000){
        //Mongoose dupli key
        const msg = {...err.keyValue}
        error = new ErrorResponse(msg, 400, ERROR_DUPLI_KEY);
    }

    if(err.name === "ValidationError"){
        const msg = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(msg, 400, ERROR_VALIDATION);
    }

   
    if(res.headersSent)
        return next(error);

    return res.status(error.statusCode || 500).json({
        success:false,
        status: error.statusCode || 500,
        msg: error.message || 'Server Error',
        kind: error.kind
    });
};

module.exports = errorHandler;