const { Pool } = require('pg')
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const pool = new Pool({
	user: dbUser,
	host: 'localhost',
	database: 'pouppei',
	password: dbPassword,
	port: 5432,
});

module.exports = pool;
