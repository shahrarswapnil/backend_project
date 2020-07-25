const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();//express Object
const {Genre, validate} = require('../models/genre');



router.get('/',async (req,res)=>{
    const result = await Genre.find().sort('name');
    res.send(result);
});//url + callback function


//applying for courses array

router.get('/:id',async (req,res)=>{
    const genre = await Genre.findById(req.params.id);
    if(!genre){return res.status(404).send('not found');}
    res.send(genre);
});//url + callback function


router.post('/',auth ,async (req,res)=>{
    const { error } = validate(req.body);//object distractor
    //input validation
    if(error){
        //bad request 
        res.status(400).send(error.details[0].message);
        return;
    }
    let genre = new Genre({name: req.body.name,description: req.body.description});
    genre = await genre.save();
    res.send(genre);
});//url + callback function

router.put('/:id',async (req,res)=>{
    
    const { error } = validate(req.body);//object distractor
    //input validation
    if(error){
        //bad request 
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        description: req.body.description
    },
        {
            new:  true
        });

    if(!genre)return res.status(404).send('not found');
    

    res.send(genre);

});


router.delete('/:id',async (req,res)=>{
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if(!genre) return res.status(404).send('not found');

    res.send(genre);

});


module.exports = router;