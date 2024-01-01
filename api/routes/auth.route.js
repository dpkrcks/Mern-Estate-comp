import express from 'express';
import {postUser , signIn , google} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',postUser);
router.post('/signin',signIn);
router.post('/google',google);
export default router;