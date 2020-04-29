class ErrorResponse extends Error{
    constructor(message, statusCode, kind){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.kind = kind;
    }
}

module.exports = ErrorResponse;