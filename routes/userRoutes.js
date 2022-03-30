import express from "express";
import { insertRecord, getUsers, deleteRecord, updateRecord, getUser } from '../controllers/userController.js';
import { body, check } from 'express-validator';
import { protect } from "../middlewares/authMiddelware.js";

const router = express.Router();

router.get('/getList', protect, getUsers);
router.post('/createUser', body('email').isEmail(), body('password').isLength({ min: 5 }), insertRecord);
router.delete('/', body('id').isLength({ min: 24 }), deleteRecord);
router.put('/', check('first_name').exists(), check('last_name').exists(), check('id').exists(), body('id').isLength({ min: 24 }) , updateRecord);
router.post('/', check('id').exists(), body('id').isLength({ min: 24 }), getUser);




export default router;