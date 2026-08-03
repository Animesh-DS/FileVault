const pool = require('../config/dbConnection.js')

const addFile = (req,res)=>{
    const {imgURL} = req.body;
    if(!imgURL) return res.status(400).json({message:"Didn't receive data from frontend"})

    const query = 'INSERT INTO "FileList" ("URL") VALUES ($1)';

    pool.query(query, [imgURL], (err, result) => {
        if(err){ 
            res.status(500).send(err);
        }
        else{
            console.log(result);
            res.status(200).json({message:"Task Added"});
        }
    })
}

module.exports = {addFile};