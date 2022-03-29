import express from "express";
import { insertRecord, getUsers, deleteRecord, updateRecord } from '../controllers/userController.js';
import { body, check } from 'express-validator';

const router = express.Router();

router.get('/', getUsers);
router.post('/createUser', body('email').isEmail(), body('password').isLength({ min: 5 }), insertRecord);
router.delete('/', body('id').isLength({ min: 24 }), deleteRecord);
router.put('/', check('first_name').exists(), check('last_name').exists(), check('id').exists(), body('id').isLength({ min: 24 }) , updateRecord);




export default router;