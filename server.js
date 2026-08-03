require('dotenv').config();
const { SigGen } = require("./Utils/psurl.js");
const express = require('express');
const cors = require('cors');
const addFileRouter = require('./routers/api/addFileRouter.js');

const app = express();

//Make the connection link
require('../config/dbConnection.js')

app.use(express.json())

//enable cors
app.use(cors({origin:'http://localhost:3500'}));

//generate the pre signed url
app.get("/api/sign",(req,res)=>{

    const output = SigGen();
    res.json(output)
})

//add new user
app.use("/api/addFile",addFileRouter);

app.listen(8000,()=>{
    console.log("Server Running on Port 8000");
    
});