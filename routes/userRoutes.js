import express from "express";
import { insertRecord, getUsers, deleteRecord } from '../controllers/userController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', getUsers);
router.post('/createUser', body('email').isEmail(), body('password').isLength({ min: 5 }), insertRecord);
router.delete('/', body('id').isLength({ min: 24 }), deleteRecord);



export default router;