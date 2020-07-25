const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(app){
    mongoose.connect('mongodb://localhost/vidly-movies')
    .then(() => console.log(
        winston.info('Connected to database!!')
    ));

}

module.exports.getCustomerSync = function(id){
    return {id: id, points: 11};

}