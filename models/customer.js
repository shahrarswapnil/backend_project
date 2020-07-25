const Joi = require('joi');//Joi is a class here,that's why uppercase
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');


//now this will give us a class
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    phone: {
        type: Number,
        minlength: 7,
        maxlength: 11,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date, default: Date.now
    },
}));

function validateCustomer(customer){
    //package for input validation - joi
    const schema = {
        name: Joi.string().min(5).required(),
        phone: Joi.number().required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;