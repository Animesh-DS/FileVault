require('dotenv').config();
const { SigGen } = require("./Utils/psurl.js");
const express = require('express');
const cors = require('cors');
const addFileRouter = require('./routers/api/addFileRouter.js');

const app = express();

//Make the connection link
require('../config/dbConnection.js')

app.use(express.json())

app.use(cors({origin:'http://localhost:3500'}));

app.get("/api/sign",(req,res)=>{

    const output = SigGen();
    res.json(output)
})

app.use("/api/addFile",addFileRouter);

app.listen(8000,()=>{
    console.log("Server Running on Port 8000");
    
});