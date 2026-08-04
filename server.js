require('dotenv').config();
const { SigGen } = require("./Utils/psurl.js");
const express = require('express');
const cors = require('cors');
const addFileRouter = require('./routers/api/addFileRouter.js');
const cookieParser = require('cookie-parser');
const authRouter = requier('./routers/api/authRouter.js');
const refeshTokenRouter = require('./routers/api/refreshTokenRouter.js');

require('../config/dbConnection.js') //Make the connection link

const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({origin:'http://localhost:3500'})); //enable cors
app.use("/api/addFile",addFileRouter); //add new user
app.use("/api/login",authRouter); //user login authentication
app.use("/api/refeshToken",refeshTokenRouter) //refresh the access token using refresh token

//generate the pre signed url
app.get("/api/sign",(req,res)=>{

    const output = SigGen();
    res.json(output)
})

app.listen(8000,()=>{
    console.log("Server Running on Port 8000");
    
});