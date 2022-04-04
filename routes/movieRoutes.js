import express from "express";
import { getMovies, createMovie } from '../controllers/movieController.js';
import { check } from 'express-validator';
import { protect } from "../middlewares/authMiddelware.js";

const router = express.Router();

router.get('/', protect, getMovies);
router.post('/create', protect, check('name').exists(), check('description').exists(), check('image').exists(), createMovie);

export default router;