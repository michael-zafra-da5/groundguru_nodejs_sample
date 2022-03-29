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
        // const user = await User.findOne({ email }, { password: 0, first_name: 0, last_name: 0, _v: 0});
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

//@desc Login
//@route POST api/user/:id
const updatePassword = expressAsyncHandler(async(request, response) => {
    const { id, password, new_password, confirm_password } = request.body;

    const error = validationResult(request);
    if(!error.isEmpty()) {
        return response.status(400).json({
            error: error.array()
        });
    }

    if(new_password != confirm_password) {
        return response.status(400).json({
            status: 'fail',
            message: 'Password Mismatch.'
        });
    }

    var doc_id = new mongoose.Types.ObjectId(id);
    const user = await User.findById(doc_id);

    if(user && (await user.matchPassword(password))) {
        await User.updateOne({ _id:doc_id }, {password: confirm_password})
        .then(function() {
            response.status(200).json({
                status: 'success',
                message: 'User Successfully Updated.'
            });
        })
        .catch(function(error) {
            response.status(400).json({
                error: 'User not found ' + error
            });
        });
    } else {
        return response.status(400).json({
            error: 'Invalid email or password'
        });
    }
    
});

export { login, updatePassword };