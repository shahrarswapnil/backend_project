const Joi = require('joi');//Joi is a class here,that's why uppercase
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        uppercase: true,
        required: true
    },
    date: {
        type: Date, default: Date.now
    },
    description: {
        type: String,
        minlength: 10,
        maxlength: 100
    }
})


//now this will give us a class
const Genre = mongoose.model('Genre', genreSchema);

function validateGenreName(genre){
    //package for input validation - joi
    const schema = {
        name: Joi.string().min(5).required(),
        description: Joi.string()
    }

    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenreName;
exports.genreSchema = genreSchema;