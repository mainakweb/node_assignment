require('dotenv').config()

//use path module
const path = require('path');
//use express module
const express = require('express');
//use bodyParser middleware
const bodyParser = require('body-parser');

const name = process.env.APP_NAME;
const port = process.env.APP_PORT;

const app = express();

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

 //route for APIs
const router = require('./routes/router.js');
 app.use('/api',router);

//route for homepage
app.get('/',(req, res) => {return res.send(`<h1>welcome to ${name} API</h1>.`);});


//server listening
app.listen(port, () => {console.log(`Server is running at port ${port}`);});