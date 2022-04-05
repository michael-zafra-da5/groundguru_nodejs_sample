import express from "express";
import { insertRecord, getUsers, deleteRecord, updateRecord, getUser, uploadProfile } from '../controllers/userController.js';
import { body, check } from 'express-validator';
import { protect } from "../middlewares/authMiddelware.js";
import multer from 'multer';

const router = express.Router();
const upload = multer({})

router.get('/getList', protect, getUsers);
router.post('/createUser', body('email').isEmail(), body('password').isLength({ min: 5 }), insertRecord);
router.delete('/', protect, body('id').isLength({ min: 24 }), deleteRecord);
router.put('/', protect, check('first_name').exists(), check('last_name').exists() , updateRecord);
router.post('/', protect, getUser);
router.post('/uploadProfile', protect, upload.single('file'), uploadProfile);




export default router;