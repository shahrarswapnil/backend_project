const Joi = require('joi');//Joi is a class here,that's why uppercase
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

//now this will give us a class
const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
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
            }
        }),
        required: true
    },

    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                minlength: 5,
                maxlength: 50,
                required: true
            },
            dailyRentalRate: {
                type: Number,
                minlength: 1,
                maxlength: 255,
                required: true
            }
        }),
        required: true
    },
    dateIn: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateOut:{
        type: Date
    },
    fee: {
        type: Number,
        min: 0,
        required: true
    }
}));

function validateRental(rental){
    //package for input validation - joi
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
        dateOut: Joi.date().required()
    }

    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;