const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();//express Object
const {User, validate} = require('../models/user');
const _ = require('lodash');


router.post('/',async (req,res)=>{
    const { error } = validate(req.body);//object distractor
    //input validation
    if(error){
        //bad request 
        res.status(400).send(error.details[0].message);
        return;
    }
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).send('User already registered');
    }
    
    user = new User(_.pick(req.body,['name','email','pass']));
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user.pass,salt);
    user.pass = hashedPass;
    await user.save();

    const token = user.generateToken();
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
});//url + callback function


module.exports = router;