require('dotenv').config()

const pool = require('./database/db.js');

const express = require('express')
const cors = require('cors')

const port = process.env.PORT;

const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

require('./database/db.js')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
const router = require('./routes/Router.js');

app.use(router)

pool.connect((err, client, release) => {
	if (err) {
		return console.error('Error acquiring client', err.stack);
	}
	client.query('SELECT NOW()', (err, result) => {
		release();
		if (err) {
			return console.error('Error executing query', err.stack);
		}
		console.log(result.rows);
	});
});

app.listen(port, () => {
	console.log(`App rodando na porta ${port}`)
})