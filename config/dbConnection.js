require('dotenv').config();
const {Pool} = require('pg');

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

module.exports = pool;