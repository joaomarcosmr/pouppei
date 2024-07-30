require('dotenv').config()

const pool = require('./database/db.js');

const express = require('express')
const cors = require('cors')

const port = process.env.PORT;

const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))

require('./database/db.js')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//routes
const router = require('./routes/Router.js');

app.use(router)

app.listen(port, () => {
	console.log(`App rodando na porta ${port}`)
})