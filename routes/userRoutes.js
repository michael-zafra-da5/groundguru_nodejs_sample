import express from "express";
import { insertRecord, getUsers, deleteRecord, updateRecord, getUser } from '../controllers/userController.js';
import { body, check } from 'express-validator';
import { protect } from "../middlewares/authMiddelware.js";

const router = express.Router();

router.get('/getList', protect, getUsers);
router.post('/createUser', body('email').isEmail(), body('password').isLength({ min: 5 }), insertRecord);
router.delete('/', protect, body('id').isLength({ min: 24 }), deleteRecord);
router.put('/', protect, check('first_name').exists(), check('last_name').exists(), check('id').exists(), body('id').isLength({ min: 24 }) , updateRecord);
router.post('/', protect, getUser);




export default router;