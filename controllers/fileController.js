const pool = require('../config/dbConnection.js')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const addFile = async (req,res)=>{
    const {imgURL} = req.body;
    if(!imgURL) return res.status(400).json({message:"Didn't receive data from frontend"})

    const auth_header = req.headers['Authorization']||req.headers['authorization'];
    if(!auth_header || !auth_header.startsWith('Bearer ')) return res.sendStatus(401);

    const token = auth_header.split(' ')[1];
    
    let uuid;
    
    try {
        const decoded = jwt.verify(token,process.env.ACESS_TOKEN_SECRET)
        uuid = decoded.id;
    } catch (err) {
        console.log(err);
        return res.status(403).json({message:"jwt verify failed!"});
    }
        

    try {
        const query = 'INSERT INTO "FileList" ("url","uuid") VALUES ($1,$2)';
        const result = await pool.query(query, [imgURL,uuid])
        return res.status(200).json({message:"url added to db"});
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message:"url insertion in db failed"})
    }
    
}

module.exports = {addFile};