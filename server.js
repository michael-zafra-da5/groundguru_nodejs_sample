import connectDB from './models/db.js';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

var app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', function (request, response) {
    response.send('Hello Node JS');
});

var server=app.listen(3001, function() {});