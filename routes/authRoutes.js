import express from "express";
import { login, updatePassword } from '../controllers/authController.js';
import { body, check } from 'express-validator';

const router = express.Router();

router.post('/login', check('email').exists(), check('password').exists(), body('password').isLength({ min: 5 }) , login);
router.post('/updatePassword', check('id').exists(), check('password').exists(), body('new_password').isLength({ min: 5 }), body('confirm_password').isLength({ min: 5 }), updatePassword);

export default router;