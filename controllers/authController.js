import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import expressAsyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';

//@desc Login
//@route POST api/user/:id
const login = expressAsyncHandler(async(request, response) => {
    const { email, password } = request.body;

    const error = validationResult(request);
    if(!error.isEmpty()) {
        return response.status(400).json({
            error: error.array()
        });
    }

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        response.status(200).json({
            status: 'success',
            data: user
        });
    } else {
        return response.status(400).json({
            error: 'Invalid email or password'
        });
    }
    
});

export { login };