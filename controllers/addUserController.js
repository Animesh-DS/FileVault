const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const saltRounds=10;

const AddUser = async (req,res) => {
    const {name, password} = req.body;
    
    if(!name||!password) return res.status(400).json({message:"Username and Password are required"});    

    try{
        //generate the hashed pwd and uuid
        const salt = await bcrypt.genSalt(saltRounds);
        const hashpwd = await bcrypt.hash(password,salt);
        const currID = uuidv4();
        
        //add to database table "UserList"
        const query = 'Insert into "UserList" ("uuid","username","password") Values($1,$2,$3) ON CONFLICT ("username")  DO NOTHING;';
        const queryResult = await pool.query(query,[currID,name,hashpwd]);

        //duplicary check
        if(queryResult.rowCount === 0){
            return res.status(409).json({message:"User already exits"});
        }

        return res.status(200).json({message:"new user added successfully"});
    }
    catch(err){
        console.log("Error in AddUser");
        return res.status(500).json({message:"Adding user failed"})
    }
    
}

module.exports = {AddUser}