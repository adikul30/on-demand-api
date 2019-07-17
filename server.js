const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dotenv = require('dotenv');
dotenv.config();
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Require Notes routes
require('./app/routes/note.routes.js')(app);

// Configuring the database
// const dbConfig = require('./config/database.config.js');

let db;
let dbClient;

MongoClient.connect(process.env.atlas_url, { useNewUrlParser: true }, function(err, client) {
	if(client) {
		console.log("Successfully connected to the database");
		db = client.db("test");
		app.locals.db = db;
		dbClient = client
		const port = process.env.PORT || 5000

		// listen for requests
		app.listen(port, () => {
		    console.log(`REST API is running on port ${port}`);
		});
	}
	if (err){
		console.log("connection error")
    	console.log(err)
	}
});

process.on('SIGINT', () => {
  dbClient.close();
  process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to on-demand-api. Get your custom API endpoints in a flash. "});
});