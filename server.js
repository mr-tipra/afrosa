
//load env
const dotenv = require("dotenv");


dotenv.config({path:"./config/config.env"});

const morgan = require("morgan");
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path  = require("path");

const app = express();
//middlewares

app.use(express.urlencoded({extended: true}));
if(process.env.NODE_ENV === "development")
    app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}));

//connect to DB
connectDB();



//routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/messages", require("./routes/api/messages"));
app.use("/api/maps", require("./routes/api/maps"));
app.use("/api/companies", require("./routes/api/companies"));
    
//set static folder
app.use(express.static(path.join(__dirname, "public")));

if(process.env.NODE_ENV === "production"){
    //set static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client","build","index.html"));
    });
}

//error handler
//404 routes
app.all("*", (req, res,next)=>{
    return res.status(404).json({error:"Invalid route"});
} );

app.use(require("./middleware/error"));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`SERVER RUNNING IN ${process.env.NODE_ENV} on port ${PORT}`));

//handle unhandled rejections
process.on("unhandledRejection",(err, promise) => {
    console.log(`Error:${err.message}`);
    server.close(()=>process.exit(1));
})