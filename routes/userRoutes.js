import express from "express";
import { insertRecord, getUsers } from '../controllers/userController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', getUsers);
router.post('/createUser', body('email').isEmail(), body('password').isLength({ min: 5 }), insertRecord);



export default router;