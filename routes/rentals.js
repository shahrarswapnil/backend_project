const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();//express Object
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const {Rental, validate} = require('../models/rental');
const mongoose = require('mongoose');
const Fawn = require('fawn');


Fawn.init(mongoose);


router.get('/',async (req,res)=>{
    const result = await Rental.find().sort('fee');
    res.send(result);
});//url + callback function


//applying for courses array

router.get('/:id',async (req,res)=>{
    const rental = await Rental.findById(req.params.id);
    if(!rental){return res.status(404).send('not found');}
    res.send(rental);
});//url + callback function


router.post('/',auth ,async (req,res)=>{
    const { error } = validate(req.body);//object distractor
    //input validation
    if(error){
        //bad request 
        res.status(400).send(error.details[0].message);
        return;
    }

    const movie = await Movie.findById(req.body.movieId);
    if(!movie){
        res.status(400).send(`the movie doesn't exist`);
        return;
    }

    const customer = await Customer.findById(req.body.customerId);
    if(!customer){
        res.status(400).send(`the customer doesn't exist`);
        return;
    }

    if(movie.numberInStock === 0){
        res.status(400).send(`the movie isn't there in stock`);
        return;
    }

    const dateOut = new Date(req.body.dateOut);
    const dateIn = new Date();
    const days = (dateOut.getTime() - dateIn.getTime()) / (3600*1000*24);

    console.log('days ',days);
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        dateOut: dateOut,
        fee: days*movie.dailyRentalRate
    });

    try{
        new Fawn.Task()
            .update('movies',{_id: movie._id},{
                $inc: {numberInStock: -1}
            })
            .save('rentals',rental)
            .run();
    }catch(err){
        res.status(500).send("something failed");
    }
    res.send(rental);
});//url + callback function

router.put('/:id',async (req,res)=>{
    
    const { error } = validate(req.body);//object distractor
    //input validation
    if(error){
        //bad request 
        res.status(400).send(error.details[0].message);
        return;
    }

    const movie = await Movie.findById(req.body.movieId);
    if(!movie){
        res.status(400).send(`the movie doesn't exist`);
        return;
    }

    const customer = await Customer.findById(req.body.customerId);
    if(!customer){
        res.status(400).send(`the customer doesn't exist`);
        return;
    }

    if(movie.numberInStock === 0){
        res.status(400).send(`the movie isn't there in stock`);
        return;
    }

    const tempRental = await Rental.findById(req.params.id);
    if(!tempRental){
        res.status(400).send(`the rental doesn't exist`);
        return;
    }


    const dateOut = new Date(req.body.dateOut);
    const dateIn = new Date(tempRental.dateIn);
    const days = (dateOut.getTime() - dateIn.getTime()) / (3600*1000*24);
    console.log('days ',days);

    const rental = await Rental.findByIdAndUpdate(req.params.id,{
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        dateOut: dateOut,
        fee: days*movie.dailyRentalRate
    },
    {
        new:  true
    });

    try{
        if(!(tempRental.movie._id === req.body.movieId)){
            const tempMovie = await Movie.findById(tempRental.movie._id);
            new Fawn.Task()
                .update('movies',{_id: movie._id},{
                    $inc: {numberInStock: -1}
                })
                .update('movies',{_id: tempMovie._id},{
                    $inc: {numberInStock: 1}
                })
                .save('rentals',rental)
                .run();
        }
    }catch(err){
        res.status(500).send("something failed");
    }


    if(!rental)return res.status(404).send('not found');
    

    res.send(rental);

});


router.delete('/:id',async (req,res)=>{
    const tempRental = await Rental.findById(req.params.id);
    const movieId = tempRental.movie._id;
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if(!rental) return res.status(404).send('not found');
    const tempMovie = await Movie.findById(movieId);
    if(!tempMovie) return res.status(404).send('something failed');
    tempMovie.numberInStock++;
    tempMovie.save();
    
    res.send(rental);

});


module.exports = router;