const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();//express Object
const {Customer, validate} = require('../models/customer');


router.get('/',async (req,res)=>{
    const result = await Customer.find().sort('name');
    res.send(result);
});//url + callback function


//applying for courses array

router.get('/:id',async (req,res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer){return res.status(404).send('not found');}
    res.send(customer);
});//url + callback function


router.post('/', auth, async (req,res)=>{
    const { error } = validate(req.body);//object distractor
    //input validation
    if(error){
        //bad request 
        res.status(400).send(error.details[0].message);
        return;
    }

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    res.send(customer);
});//url + callback function

router.put('/:id',async (req,res)=>{
    
    const { error } = validate(req.body);//object distractor
    //input validation
    if(error){
        //bad request 
        res.status(400).send(error.details[0].message);
        return;
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    },
    {
        new:  true
    });

    if(!customer)return res.status(404).send('not found');
    

    res.send(customer);

});


router.delete('/:id',async (req,res)=>{
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if(!customer) return res.status(404).send('not found');

    res.send(customer);

});


module.exports = router;