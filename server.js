import connectDB from './models/db.js';
import express from 'express';
import userRoutes from './routes/userRoutes.js'

// require("./models/db");
// var express = require('express');
var app = express();
connectDB();

// app.route('/New').get(function(request, response) {
//     response.send('Hello Node JS this is new route');
// });

app.use(express.json());
app.use('/api/user', userRoutes);

app.get('/', function (request, response) {
    response.send('Hello Node JS');
});

var server=app.listen(3000, function() {});