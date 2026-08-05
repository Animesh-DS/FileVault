const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/dbConnection.js');

const saltRounds=10;

const AddUser = async (req,res) => {
    const {name, password} = req.body;
    
    if(!name||!password) return res.status(400).json({message:"Username and Password are required"});    

    let hashpwd;
    let currID;
    try{
        //generate the hashed pwd and uuid
        const salt = await bcrypt.genSalt(saltRounds);
        hashpwd = await bcrypt.hash(password,salt);
        currID = uuidv4();
        
        
    }
    catch(err){
        console.log("Error in pasword hashing",err.message);
        return res.status(500).json({message:"Hashing pwd failed"})
    }

    try {
        //add to database table "UserList"
        const query = 'Insert into "UserList" ("uuid","username","password") Values($1,$2,$3) ON CONFLICT ("username")  DO NOTHING;';
        const queryResult = await pool.query(query,[currID,name,hashpwd]);

        //duplicary check
        if(queryResult.rowCount === 0){
            return res.status(409).json({message:"User already exits"});
        }

        return res.status(200).json({message:"new user added successfully"});
    } catch (error) {
        console.log("Adding new user to db failed",error.message)
    }
    
}

module.exports = {AddUser}