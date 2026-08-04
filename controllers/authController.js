const jwt = require('jsonwebtoken');
const { Query } = require('pg');
require('dotenv').config();
const bcrypt = require('bcrypt');
const {pool} = require('../config/dbConnection.js');

const AuthUser = async (req,res) => {
    const {username,password} = req.body;

    if(!username||!password) return res.status(400).json({message:"Username and Password are required"});

    try {
        
        //load hashedpwd from database
        const query = 'Select * from "UserList" where "username" = $1';
        const result = await pool.query(query,[username]);

        if(result.rowCount === 0){
            return res.status(404).json({message:"User not found in database"});
        }

        const userData = result.rows[0];
        const hashedpwd = userData.password;

        //verifying user provided password and database password
        const isMatch = await bcrypt.compare(password,hashedpwd);

        if(!isMatch) return res.status(401).json({message:"Incorrect Password"});

        //create the JWT
        const accessToken = jwt.sign(
            {
                "username": userData.username,
                "id": userData.uuid
            },
            process.env.ACESS_TOKEN_SECRET,
            {expiresIn:'60s'}
        );
        
        const refreshToken = jwt.sign(
            {
                "username": userData.username,
                "id": userData.uuid
            },
            process.env.REFREST_TOKEN_SECRET,
            {expiresIn:'1d'}
        );

        //store jwt in http only cookie
        res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:24*60*60*1000});
        res.json({accessToken});

    } catch (err) {
        console.log(err);
        return res.status(500).json({message:"Authentication Error"})
    }
}

module.exports = {AuthUser}