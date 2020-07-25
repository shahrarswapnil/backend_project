const { number } = require("joi");
const db = require('./startup/db');

module.exports.absolute = function (num){
    return (num < 0)? -num:num;
}

module.exports.greet = function (name){
    return 'Welcome '+name;
}

module.exports.lists = function (){
    return ['aata','moyda','shuji'];
}

module.exports.getProduct = function (id){
    return {id : id,price : 10};
}

module.exports.regUser = function (userName){
    if(!userName) throw new Error('user not regged!!');
    return {id : new Date().getTime(),userName : userName};
}

module.exports.fizzbuzz = function (input){
    if(typeof input !== 'number'){
        throw new Error('type not a number!!');
    }
    if(input % 5 === 0 && input % 3 === 0){
        return 'FizzBuzz';
    }
    if(input % 5 === 0){
        return 'Buzz';
    }
    if(input % 3 === 0){
        return 'Fizz';
    }
    else{
        return input;
    }
}

module.exports.applyDiscount = function (order){
    const customer = db.getCustomerSync(order.customerId);
    if(customer.points > 10){
        order.totalPrice *= 0.9;
    }
}
