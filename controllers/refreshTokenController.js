const jwt = require('jsonwebtoken');
require('dotenv').config();

const refreshToken = async (req,res) => {
    const cookie = req.cookies;
    if(!cookie?.jwt) return res.status(401);
    const cookie_token = cookie.jwt;
    try {
        const decoded = jwt.verify(cookie_token,process.env.REFREST_TOKEN_SECRET);

        const query = 'Select * from "UserList" where "username" = $1';
        const result = await pool.query(query,[username]);

        if(result.rowCount === 0){
            return res.status(404).json({message:"User not found in database"});
        }

        const userData = result.rows[0];

        const accessToken = jwt.sign(
            {
            "username": userData.username,
            "id": userData.uuid
            },
            process.env.ACESS_TOKEN_SECRET,
            {expiresIn:'60s'}
        );

        res.json({accessToken});
    } catch (err) {
        console.log("refresh token verification error");
        return res.status(500).json({message:"refreshing access token failed"})
    }
    

}