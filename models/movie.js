const Joi = require('joi');//Joi is a class here,that's why uppercase
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');


//now this will give us a class
const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    genre:{
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        minlength: 1,
        maxlength: 255,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        minlength: 1,
        maxlength: 255,
        required: true
    },
    date: {
        type: Date, default: Date.now
    },
}));

function validateMovie(movie){
    //package for input validation - joi
    const schema = {
        title: Joi.string().min(5).required(),
        numberInStock: Joi.number().max(255).required(),
        dailyRentalRate: Joi.number().max(255).required(),
        genreId: Joi.objectId().required()
    }

    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;