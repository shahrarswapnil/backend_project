const winston = require('winston');
//require('express-async-errors');
require('winston-mongodb');

module.exports = function(){
    
//catching exceptions during the process
// process.on('uncaughtException', (ex) => {
//     console.log('there is an uncaught exception');
//     winston.error(ex.message, ex);
// })

//this will terminate the process
winston.handleExceptions(
    new winston.transports.Console({colorize: true, prettyPrint: true}),
    new winston.transports.File({filename: 'uncaughtExceptions.log'}));

//catching promise rejections during the process
// process.on('unhandledRejection', (ex) => {
//     console.log('there is an unhandled rejection');
//     winston.error(ex.message, ex);
// })

process.on('unhandledRejection', (ex) => {
    throw ex;
})

winston.add(winston.transports.File,{filename: 'logfile.log'});
winston.add(winston.transports.MongoDB,{
    db:'mongodb://localhost/vidly-movies',
    level:'error'
});


//but we want to log our exceptions in a diff file and using a diff approach


//to check exception during process
//throw new Error('mara khao');
//to check promise rejection during process
// const p = Promise.reject(new Error ('something failed miserably'));
// p.then(()=>{
//     console.log('promise rejected');
// })
}