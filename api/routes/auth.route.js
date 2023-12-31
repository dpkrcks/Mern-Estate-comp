import express from 'express';
import {postUser , signIn} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',postUser);
router.post('/signin',signIn);

export default router;