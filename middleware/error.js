const winston = require('winston');

module.exports = function(err, req,res,next){
    //internal server error
    //winston.log('error',err.message);
    console.log('erooooooooooor file ee ashchi');
    winston.error(err.message,err);

    //error
    //warn
    //info
    //verbose
    //debug
    //silly
    res.status(500).send('Something failed');
    //next();
}