const Joi = require('joi');//Joi is a class here,that's why uppercase
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    date: {
        type: Date, default: Date.now
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.generateToken = function() {
    const token = jwt.sign({_id: this._id,isAdmin: this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}
//now this will give us a class
const User = mongoose.model('User', userSchema);

function validateUser(user){
    //package for input validation - joi
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().required().email(),
        pass: Joi.string().required()
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;