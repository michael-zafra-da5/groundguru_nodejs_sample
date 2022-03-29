import connectDB from './models/db.js';
import express from 'express';
import userRoutes from './routes/userRoutes.js'

var app = express();
connectDB();

app.use(express.json());
app.use('/api/user', userRoutes);

app.get('/', function (request, response) {
    response.send('Hello Node JS');
});

var server=app.listen(3000, function() {});