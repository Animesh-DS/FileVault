require('dotenv').config();
const {Pool} = require('pg');

//Make the connection link
const pool = new Pool({
    host:process.env.POSTGRESQL_HOST,
    user:process.env.POSTGRESQL_USER,
    port:"5432",
    password:process.env.POSTGRESQL_PASSWORD,
    database:"UserList",
    max:20,
    connectionTimeoutMillis:0,
    idleTimeoutMillis:0
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


app.listen(8000,()=>{
    console.log("Server Running on Port 8000");
    
});