import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import expressAsyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';

var router = express.Router();

//@desc get all user data
//@route GET api/user
const getUsers = expressAsyncHandler(async(request, response) => {
    const users = await User.find();
    response.status(200).json({
        status: 'success',
        data: users
    });
});

//@desc insert new user data
//@route POST api/user/createUser
const insertRecord = expressAsyncHandler(async(request, response) => {
    // Express Validation
    const error = validationResult(request);
    if(!error.isEmpty()) {
        return response.status(400).json({
            error: error.array()
        });
    }

    const { first_name, last_name, email, password } = request.body;

    // Manual validation
    if(first_name == undefined || last_name == undefined) {
        return response.status(400).json({
            error: 'Missing parameter data'
        });
    }

    const user = await User.findOne({ email }); //unique email
    // const user = await User.findById(_id); //unique id or multiple user with same email
    
    if(user) {
        //Throw Fail response
        // response.status(400);
        // throw new Error('User already exist');

        //JSON fail response
        return response.status(400).json({
            error: 'User already exist'
        });
    }

    const newUser = await User.create({ first_name, last_name, email, password });

    if(newUser) {
        response.status(201).json({
            first_name: first_name, 
            last_name: last_name, 
            email: email, 
            status: 'success',
            message: 'User Successfully Created.'
        });
    } else {
        return response.status(400).json({
            error: 'User already exist'
        });
    }

});

//@desc delete record 
//@route DELETE api/user/:id
const deleteRecord = expressAsyncHandler(async(request, response) => {
    const { email } = request.body;
    if(email == undefined) {
        return response.status(400).json({
            error: 'Missing parameter data'
        });
    }
    const user = await User.find({ email });

    if(user) {
        const deleted = await User.deleteOne({ email });
        if(deleted) {
            response.status(204).json({
                status: 'success',
                message: 'User Successfully Deleted.'
            });
        } else {
            return response.status(400).json({
                error: 'User not found'
            });
        }
    } else {
        return response.status(400).json({
            error: 'User not found'
        });
    }
    
});

export { insertRecord, getUsers, deleteRecord };

