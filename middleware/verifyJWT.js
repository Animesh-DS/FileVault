const jwt = require('jsonwebtoken');
const verifyJWT = (req,res,next) => {
    const auth_header = req.headers['Authorization']||req.headers['authorization'];
    if(!auth_header || !auth_header.startsWith('Bearer ')) return res.sendStatus(401);
    
    //auth_head has the token as "Bearer Token" so split it into 2 parts and get the token
    const token = auth_header.split(' ')[1];

    jwt.verify(token,process.env.ACESS_TOKEN_SECRET,(err,decoded)=>{
        if(err) return res.sendStatus(403); //invalid token
        req.username = decoded.username;
        next()
    })
}

module.exports = verifyJWT;