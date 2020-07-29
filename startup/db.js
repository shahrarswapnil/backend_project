const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function(app){
    mongoose.connect(config.get('db'))
    .then(() => console.log(
        winston.info('Connected to database!!')
    ));

}

module.exports.getCustomerSync = function(id){
    return {id: id, points: 11};

}