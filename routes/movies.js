const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();//express Object
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const asyncMiddleware = require('../middleware/async');


router.get('/',auth,asyncMiddleware(async (req,res)=>{
    throw new Error('could not get movies');
    const result = await Movie.find().sort('title');
    res.send(result);    
    
}));//url + callback function


//applying for courses array

router.get('/:id',asyncMiddleware(async (req,res)=>{
    const movie = await Movie.findById(req.params.id);
    if(!movie){return res.status(404).send('not found');}
    res.send(movie);
}));//url + callback function


router.post('/',auth ,asyncMiddleware(async (req,res)=>{
    const { error } = validate(req.body);//object distractor
    //input validation
    if(error){
        //bad request 
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = await Genre.findById(req.body.genreId);
    if(!genre){
        res.status(400).send(`the genre doesn't exist`);
        return;
    }
    let movie = new Movie({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre._id,
            name: genre.name
        } 
    });
    movie = await movie.save();
    res.send(movie);
}));//url + callback function

router.put('/:id',asyncMiddleware(async (req,res)=>{
    
    const { error } = validate(req.body);//object distractor
    //input validation
    if(error){
        //bad request 
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = await Genre.findById(req.body.genreId);
    if(!genre){
        res.status(400).send(`the genre doesn't exist`);
        return;
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre._id,
            name: genre.name
        }
    },
        {
            new:  true
        });

    if(!movie)return res.status(404).send('not found');
    

    res.send(movie);

}));


router.delete('/:id',[auth, admin] ,asyncMiddleware(async (req,res)=>{
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if(!movie) return res.status(404).send('not found');

    res.send(movie);

}));


module.exports = router;