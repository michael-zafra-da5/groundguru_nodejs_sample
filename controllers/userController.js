import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.model.js';
import expressAsyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

var router = express.Router();

//@desc get all user data
//@route GET api/user
const getUsers = expressAsyncHandler(async(request, response) => {
    const users = await User.find({}, { password: 0 });
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
    const { id } = request.body;
    if(id == undefined) {
        return response.status(400).json({
            error: 'Missing parameter data'
        });
    }

    const error = validationResult(request);
    if(!error.isEmpty()) {
        return response.status(400).json({
            error: error.array()
        });
    }

    var doc_id = new mongoose.Types.ObjectId(id);
    const user = await User.findById(doc_id);

    if(user) {
        await User.deleteOne({ _id:doc_id })
        .then(function() {
            response.status(200).json({
                status: 'success',
                message: 'User Successfully Deleted.'
            });
        })
        .catch(function(error) {
            response.status(400).json({
                error: 'User not found ' + error
            });
        });
    } else {
        return response.status(400).json({
            error: 'User not found'
        });
    }
    
});

//@desc update record 
//@route PUT api/user/:id
const updateRecord = expressAsyncHandler(async(request, response) => {
    let token = request.header('authorization');
    const { first_name, last_name } = request.body;

    const error = validationResult(request);
    if(!error.isEmpty()) {
        return response.status(400).json({
            error: error.array()
        });
    }

    try {
        token = request.header('authorization').split(' ')[1];
        const decoded = jwt.verify(token, "gR0unD@GuWu");
    
        var doc_id = new mongoose.Types.ObjectId(decoded.id);
        const user = await User.findById(doc_id);
    
        if(user) {
            await User.updateOne({ _id:doc_id }, {first_name: first_name, last_name: last_name})
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
                error: 'User not found'
            });
        }
    } catch (error) {
        return response.status(400).json({
            error: 'User not found'
        });
    }
    
});

//@desc get user record
//@route GET api/user/:id
const getUser = expressAsyncHandler(async(request, response) => {
    let token = request.header('authorization');

    try {
        token = request.header('authorization').split(' ')[1];
        const decoded = jwt.verify(token, "gR0unD@GuWu");

        var doc_id = new mongoose.Types.ObjectId(decoded.id);
        const user = await User.findById(doc_id, { password: 0 });
    
        if(user) {
            response.status(200).json({
                status: 'success',
                data: user
            });
        } else {
            return response.status(400).json({
                error: 'User not found'
            });
        }
    } catch (error) {
        return response.status(400).json({
            error: 'User not found'
        });
    }
    
});

export { insertRecord, getUsers, deleteRecord, updateRecord, getUser };

