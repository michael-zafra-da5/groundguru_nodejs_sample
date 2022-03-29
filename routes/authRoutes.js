import express from "express";
import { login } from '../controllers/authController.js';
import { body, check } from 'express-validator';

const router = express.Router();

router.post('/login', check('email').exists(), check('password').exists(), body('password').isLength({ min: 5 }) , login);

export default router;