import express from 'express';
import {postUser , signIn , google, signOut} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',postUser);
router.post('/signin',signIn);
router.post('/google',google);
router.get('/signOut',signOut);
export default router;