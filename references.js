const winston = require('winston');
const express = require('express');
const app = express();//express Object
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);
//need this to use request body :3

//const mongoose = require('mongoose');





//shifted this part in db.js
// mongoose.connect('mongodb://localhost/vidly-movies')
//     .then(() => console.log('connected to database'))
//     .catch(err => console.error(err.message));

const port = 3000||process.even.PORT;
app.listen(port, () => {winston.info(`Listening on port ${port}...`);}) 