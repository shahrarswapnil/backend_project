const Joi = require('joi');//Joi is a class here,that's why uppercase
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();//express Object
const {User} = require('../models/user');


router.post('/',async (req,res)=>{
    const { error } = validate(req.body);//object distractor
    //input validation
    if(error){
        //bad request 
        res.status(400).send(error.details[0].message);
        return;
    }
    let user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send('Invalid credentials');
    }
    
    const validPass = await bcrypt.compare(req.body.pass,user.pass);
    if(!validPass){
        return res.status(400).send('Invalid credentials');
    }

    const token = user.generateToken();    
    res.header('x-auth-token',token).send(`logging in ${token}`);
});//url + callback function

function validate(req){
    //package for input validation - joi
    const schema = {
        email: Joi.string().required().email(),
        pass: Joi.string().required()
    }

    return Joi.validate(req, schema);
}


module.exports = router;