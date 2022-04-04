import mongoose from 'mongoose';
import Movie from '../models/movie.model.js';
import expressAsyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';

//@desc get all movie data
//@route GET api/movie
const getMovies = expressAsyncHandler(async(request, response) => {
    const users = await Movie.find({}, {  });
    response.status(200).json({
        status: 'success',
        data: users
    });
});

//@desc insert new user data
//@route POST api/movie/create
const createMovie = expressAsyncHandler(async(request, response) => {
    // Express Validation
    const error = validationResult(request);
    if(!error.isEmpty()) {
        return response.status(400).json({
            error: error.array()
        });
    }

    const { name, description, image } = request.body;

    const item = await Movie.create({ name, description, image });

    if(item) {
        response.status(201).json({
            name: name, 
            description: description, 
            image: image, 
            status: 'success',
            message: 'Successfully added to the database.'
        });
    } else {
        return response.status(400).json({
            error: 'Movie input error.'
        });
    }

});

export { getMovies, createMovie };