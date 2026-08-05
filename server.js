require('dotenv').config();
const { SigGen } = require("./Utils/psurl.js");
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('./config/dbConnection.js') //Make the connection link

const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({origin:'http://localhost:3500'})); //enable cors

app.use("/api/auth",require('./routers/api/authRouter.js')); //add new user and refresh access token
app.use("/api/files",require('./routers/api/fileRouter.js')); //upload files
app.use("/api/users",require('./routers/api/userRouter.js')); //register new user

//generate the pre signed url
app.get("/api/sign",(req,res)=>{

    const output = SigGen();
    res.json(output)
})

app.listen(8000,()=>{
    console.log("Server Running on Port 8000");
    
});