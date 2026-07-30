require('dotenv').config();
const {Pool} = require('pg');
const { SigGen } = require("./Utils/psurl.js");
const express = require('express');
const cors = require('cors');

const app = express();

//Make the connection link
const pool = new Pool({
    host:process.env.POSTGRESQL_HOST,
    user:process.env.POSTGRESQL_USER,
    port:"5432",
    password:process.env.POSTGRESQL_PASSWORD,
    database:"FileVault",
    max:20,
    connectionTimeoutMillis:5000,
    idleTimeoutMillis:30000
})

//Connect to DB
pool.connect((err, client, release) => {
  if (err) {
    console.error('Failed to connect to the database:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database successfully.');
    release();
  }
});

app.use(express.json())

app.use(cors({origin:'http://localhost:3500'}));

app.get("/api/sign",(req,res)=>{

    const output = SigGen();
    res.json(output)
})

app.post("/api/add",(req,res)=>{

    const {imgURL} = req.body;
    if(!imgURL) return res.status(400).json({message:"Didn't receive data from frontend"})

    const query = 'INSERT INTO "Files" ("URL") VALUES ($1)';

    pool.query(query, [imgURL], (err, result) => {
        if(err){ 
            res.status(500).send(err);
        }
        else{
            console.log(result);
            res.status(200).json({message:"Task Added"});
        }
    })
})

app.listen(8000,()=>{
    console.log("Server Running on Port 8000");
    
});