require('dotenv').config();

const con = new Client({
    host:process.env.POSTGRESQL_HOST,
    user:process.env.POSTGRESQL_USER,
    port:"5432",
    password:process.env.POSTGRESQL_PASSWORD,
    database:"UserList",
    max:20
})

try {
    con.connect().then(()=> console.log("Connected to Databse"))
} catch (err) {
    console.log("Connection Failed");
    console.log("Error Code: ",err.code);
}



app.listen(8000,()=>{
    console.log("Server Running on Port 8000");
    
});